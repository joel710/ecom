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

export const connectKafka = async () => {
    try {
        console.log(`⏳ Tentative de connexion à Kafka (${kafka.config.brokers[0]})...`);
        await producer.connect();
        console.log("✅ Connecté à Kafka avec succès");
    } catch (err) {
        console.error("❌ Erreur de connexion Kafka détaillée:", err.message);
    }
};

export { producer };
