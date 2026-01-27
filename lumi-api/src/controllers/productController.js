import { prisma } from '../prismaClient.js';
import { z } from 'zod';

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().int(),
    category: z.string(),
    stock: z.number().int(),
    imageUrl: z.string().url(),
});

export const getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        const where = {};

        if (category) where.category = category;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        const products = await prisma.product.findMany({ where });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createProduct = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const data = productSchema.parse(req.body);

        // Synchronize category: Ensure it exists in the Category table
        await prisma.category.upsert({
            where: { name: data.category },
            update: {}, // No update needed if it exists
            create: {
                name: data.category,
                icon: '📦' // Default icon for on-the-fly categories
            }
        });

        const product = await prisma.product.create({ data });
        res.status(201).json(product);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const { id } = req.params;
        const data = productSchema.partial().parse(req.body);

        // Synchronize category if it's being updated
        if (data.category) {
            await prisma.category.upsert({
                where: { name: data.category },
                update: {},
                create: {
                    name: data.category,
                    icon: '📦'
                }
            });
        }

        const product = await prisma.product.update({
            where: { id },
            data,
        });
        res.json(product);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const { id } = req.params;
        await prisma.product.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
