import { prisma } from '../prismaClient.js';

export const getConfig = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        let config = await prisma.storeConfig.findUnique({
            where: { id: 'default' }
        });

        if (!config) {
            // Create default config if it doesn't exist
            config = await prisma.storeConfig.create({
                data: { id: 'default' }
            });
        }

        res.json(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateConfig = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        const config = await prisma.storeConfig.upsert({
            where: { id: 'default' },
            update: req.body,
            create: {
                id: 'default',
                ...req.body
            }
        });

        res.json(config);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
