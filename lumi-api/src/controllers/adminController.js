import { prisma } from '../prismaClient.js';

export const getStats = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        // 1. Revenue & Orders Summary
        const totalOrders = await prisma.order.count();
        const revenueStats = await prisma.order.aggregate({
            where: {
                status: { in: ['CONFIRMED', 'SHIPPED'] }
            },
            _sum: { total: true }
        });
        const totalRevenue = revenueStats._sum.total || 0;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // 2. New Customers (Last 30 days)
        const recentUsersCount = await prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }
        });

        // 3. Sales Evolution (Last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            return d;
        }).reverse();

        const dailySales = await Promise.all(last7Days.map(async (date) => {
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            const dayRevenue = await prisma.order.aggregate({
                where: {
                    status: { in: ['CONFIRMED', 'SHIPPED'] },
                    createdAt: {
                        gte: date,
                        lt: nextDay
                    }
                },
                _sum: { total: true }
            });

            const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
            return {
                name: dayNames[date.getDay()],
                total: dayRevenue._sum.total || 0
            };
        }));

        // 4. Order Status Distribution
        const statusGroups = await prisma.order.groupBy({
            by: ['status'],
            _count: { _all: true }
        });

        const statusLabels = {
            'PENDING': 'En attente',
            'CONFIRMED': 'Confirmée',
            'SHIPPED': 'Expédiée',
            'CANCELLED': 'Annulée'
        };

        const statusColors = {
            'PENDING': 'hsl(38, 92%, 50%)',
            'CONFIRMED': 'hsl(252, 100%, 67%)',
            'SHIPPED': 'hsl(142, 76%, 36%)',
            'CANCELLED': 'hsl(0, 84%, 60%)'
        };

        const orderStatusData = statusGroups.map(group => ({
            name: statusLabels[group.status] || group.status,
            value: group._count._all,
            color: statusColors[group.status] || 'hsl(var(--muted))'
        }));

        // 5. Recent Orders (Last 5)
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { name: true }
                }
            }
        });

        const recentOrdersData = recentOrders.map(order => ({
            id: order.id.substring(0, 8), // Short ID for display
            customer: order.user?.name || 'Client Anonyme',
            total: order.total,
            status: order.status,
            date: order.createdAt.toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        }));

        // 6. Top Products (By sales volume)
        const orderItems = await prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
                price: true
            },
            orderBy: {
                _sum: {
                    quantity: 'desc'
                }
            },
            take: 5
        });

        const topProductsData = await Promise.all(orderItems.map(async (item) => {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
                select: { name: true }
            });

            return {
                id: item.productId,
                name: product?.name || 'Produit inconnu',
                sales: item._sum.quantity,
                revenue: (item._sum.quantity || 0) * (item._sum.price || 0) / (item._sum.quantity || 1) // Approximation if price varied
            };
        }));

        res.json({
            revenue: totalRevenue,
            orders: totalOrders,
            averageOrder: averageOrderValue,
            newCustomers: recentUsersCount,
            salesData: dailySales,
            orderStatusData,
            recentOrders: recentOrdersData,
            topProducts: topProductsData
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
