import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'ecommerce-backend',
    brokers: ['34.78.144.120:9092'], // Updated GCP Public IP
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
});

const producer = kafka.producer();
let isConnected = false;

export const connectKafka = async () => {
    if (isConnected) return;
    try {
        console.log(`⏳ Tentative de connexion à Kafka (${kafka.config.brokers[0]})...`);
        await producer.connect();
        isConnected = true;
        console.log("✅ Connecté à Kafka avec succès");
    } catch (err) {
        console.error("❌ Erreur de connexion Kafka détaillée:", err.message);
        throw err;
    }
};

export const sendEvent = async (topic, key, value) => {
    try {
        await connectKafka();
        await producer.send({
            topic,
            messages: [{ key, value: JSON.stringify(value) }]
        });
    } catch (error) {
        console.error("❌ Kafka Send Failed:", error.message);
        // We don't throw here to avoid crashing the main request
    }
};

export { producer };

