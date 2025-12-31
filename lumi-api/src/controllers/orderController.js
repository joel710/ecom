import { prisma } from '../prismaClient.js';
import { z } from 'zod';

const orderItemSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
    items: z.array(orderItemSchema),
    guestId: z.string().optional(),
});

export const createOrder = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { items, guestId } = createOrderSchema.parse(req.body);

        if (!userId && !guestId) {
            return res.status(400).json({ error: 'User ID or Guest ID required' });
        }

        let total = 0;
        const orderItemsData = [];

        const result = await prisma.$transaction(async (tx) => {
            for (const item of items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });

                if (!product) {
                    throw new Error(`Product ${item.productId} not found`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${product.name}`);
                }

                await tx.product.update({
                    where: { id: product.id },
                    data: { stock: product.stock - item.quantity },
                });

                const price = product.price * item.quantity;
                total += price;

                orderItemsData.push({
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price,
                });
            }

            const order = await tx.order.create({
                data: {
                    userId: userId || null,
                    guestId: guestId || null,
                    total,
                    status: 'PENDING',
                    items: {
                        create: orderItemsData,
                    },
                },
                include: { user: true, items: { include: { product: true } } }
            });

            return order;
        });

        const whatsappMessage = generateWhatsAppMessage(result);
        res.status(201).json({ order: result, whatsappMessage });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        if (error.message.includes('Insufficient stock') || error.message.includes('not found')) {
            return res.status(400).json({ error: error.message });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

function generateWhatsAppMessage(order) {
    const clientName = order.user?.name || "Invité";
    let msg = `🚀 *Nouvelle Commande Lumi !*\n`;
    msg += `---------------------------\n`;
    msg += `Client : ${clientName}\n`;
    msg += `ID Commande : ${order.id.slice(0, 8)}\n\n`;
    msg += `Articles :\n`;
    order.items.forEach(item => {
        msg += `- ${item.quantity}x ${item.product.name} (${item.price} FCFA)\n`;
    });
    msg += `\n*Total : ${order.total} FCFA*\n`;
    msg += `---------------------------\n`;
    return msg;
}
