import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    { name: "Veste en Jean", price: 29500, category: "clothing", stock: 10, imageUrl: "👕", description: "Veste stylée en jean." },
    { name: "T-shirt Blanc", price: 13000, category: "clothing", stock: 20, imageUrl: "👕", description: "Basique essentiel." },
    { name: "Sweat à Capuche", price: 22500, category: "clothing", stock: 15, imageUrl: "🧥", description: "Confortable et chaud." },
    { name: "Cookies Chocolat", price: 3000, category: "cookies", stock: 50, imageUrl: "🍪", description: "Pépites fondantes." },
    { name: "Macarons Parisiens", price: 8000, category: "cookies", stock: 30, imageUrl: "🧁", description: "Assortiment coloré." },
    { name: "Sablés Vanille", price: 2500, category: "cookies", stock: 40, imageUrl: "🧇", description: "Douceur vanillée." },
    { name: "Caméra Vintage", price: 78000, category: "used", stock: 1, imageUrl: "📷", description: "Appareil photo argentique." },
    { name: "Livre d'Art", price: 5000, category: "used", stock: 1, imageUrl: "📚", description: "Edition limitée." },
    { name: "Sneakers Runner", price: 58000, category: "shoes", stock: 5, imageUrl: "👟", description: "Pour le sport et la ville." },
    { name: "Jean Slim", price: 36000, category: "clothing", stock: 8, imageUrl: "👖", description: "Coupe ajustée." },
    { name: "Bottes Cuir", price: 72000, category: "shoes", stock: 3, imageUrl: "🥾", description: "Cuir véritable." },
    { name: "Baskets Urbaines", price: 42500, category: "shoes", stock: 6, imageUrl: "👟", description: "Style décontracté." }
];

async function main() {
    console.log('Start seeding ...');
    for (const p of products) {
        const product = await prisma.product.create({
            data: p,
        });
        console.log(`Created product with id: ${product.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
