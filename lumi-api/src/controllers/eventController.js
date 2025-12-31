import { prisma } from '../prismaClient.js';
import { z } from 'zod';

const eventSchema = z.object({
    guestId: z.string(),
    type: z.string(),
    payload: z.record(z.any()).optional().nullable(),
    url: z.string().optional(),
});

export const createEvent = async (req, res) => {
    try {
        const data = eventSchema.parse(req.body);

        // TODO: KAFKA INTEGRATION POINT
        // In the future, send 'data' to a Kafka Producer here.

        const event = await prisma.event.create({
            data: {
                guestId: data.guestId,
                type: data.type,
                payload: data.payload ?? undefined,
                url: data.url,
                userAgent: req.headers['user-agent'],
                userId: req.user ? req.user.userId : null,
            },
        });

        res.status(201).json({ status: 'ok', id: event.id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error('Event tracking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
