import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'ecommerce-backend',
    brokers: ['34.78.144.120:9092'],
    connectionTimeout: 30000,
    authenticationTimeout: 30000,
    retry: {
        initialRetryTime: 500,
        retries: 10
    }
});

const producer = kafka.producer();
let isConnected = false;

export const connectKafka = async () => {
    if (isConnected) return;
    try {
        console.log(`⏳ Tentative de connexion à Kafka (34.78.144.120:9092)...`);
        // Add a timeout to the connection attempt
        const connectPromise = producer.connect();
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Kafka Connection Timeout (30s)')), 30000)
        );

        await Promise.race([connectPromise, timeoutPromise]);

        isConnected = true;
        console.log("✅ Connecté à Kafka avec succès");
    } catch (err) {
        console.error("❌ Erreur de connexion Kafka détaillée:", err.message);
        // Do NOT throw here, we want the app to keep running even without Kafka
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

