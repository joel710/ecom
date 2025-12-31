import { prisma } from '../prismaClient.js';
import { z } from 'zod';
import { producer } from '../config/kafka.js';

const eventSchema = z.object({
    guestId: z.string(),
    type: z.string(),
    payload: z.record(z.any()).optional().nullable(),
    url: z.string().optional(),
});

export const createEvent = async (req, res) => {
    try {
        const data = eventSchema.parse(req.body);
        const userId = req.user ? req.user.userId : null;

        // Persist to DB
        const event = await prisma.event.create({
            data: {
                guestId: data.guestId,
                type: data.type,
                payload: data.payload ?? undefined,
                url: data.url,
                userAgent: req.headers['user-agent'],
                userId: userId,
            },
        });

        // Send to Kafka asynchonously
        producer.send({
            topic: 'web-events',
            messages: [
                {
                    key: userId || data.guestId,
                    value: JSON.stringify({
                        ...data,
                        id: event.id,
                        userId,
                        userAgent: req.headers['user-agent'],
                        timestamp: event.createdAt
                    })
                }
            ]
        }).catch(err => console.error('Kafka Send Error:', err));

        res.status(201).json({ status: 'ok', id: event.id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        console.error('Event tracking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
