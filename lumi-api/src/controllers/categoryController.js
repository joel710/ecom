import { prisma } from '../prismaClient.js';

export const getCategories = async (req, res) => {
    try {
        // Publicly accessible for the shop, or restricted to admin for management
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });

        // Add product count for each category
        const categoriesWithCounts = await Promise.all(categories.map(async (cat) => {
            const count = await prisma.product.count({
                where: { category: cat.name }
            });
            return { ...cat, products: count };
        }));

        res.json(categoriesWithCounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createCategory = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const { name, icon } = req.body;
        const category = await prisma.category.create({
            data: { name, icon }
        });

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const { id } = req.params;
        await prisma.category.delete({
            where: { id }
        });

        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
