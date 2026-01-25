import { prisma } from '../prismaClient.js';

export const getStats = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const totalOrders = await prisma.order.count();
        const confirmedOrders = await prisma.order.findMany({
            where: { status: 'CONFIRMED' },
            select: { total: true }
        });
        const shippedOrders = await prisma.order.findMany({
            where: { status: 'SHIPPED' },
            select: { total: true }
        });

        const totalRevenue = [...confirmedOrders, ...shippedOrders].reduce((acc, order) => acc + order.total, 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        const recentUsersCount = await prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }
        });

        // Simple mock for chart data for now, could be improved with real aggregations
        const salesData = [
            { name: 'Jan', total: 4000 },
            { name: 'Feb', total: 3000 },
            { name: 'Mar', total: 2000 },
            { name: 'Apr', total: 2780 },
            { name: 'May', total: 1890 },
            { name: 'Jun', total: 2390 },
        ];

        res.json({
            revenue: totalRevenue,
            orders: totalOrders,
            averageOrder: averageOrderValue,
            newCustomers: recentUsersCount,
            salesData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { name: true, phone: true }
                },
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true,
                _count: {
                    select: { orders: true }
                }
            }
        });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
