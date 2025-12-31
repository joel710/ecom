import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'ecommerce-backend',
    brokers: ['35.190.218.111:9092'], // GCP Public IP from instructions
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
});

const producer = kafka.producer();

export const connectKafka = async () => {
    try {
        await producer.connect();
        console.log("✅ Connecté à Kafka avec succès");
    } catch (err) {
        console.error("❌ Erreur de connexion Kafka:", err);
    }
};

export { producer };
