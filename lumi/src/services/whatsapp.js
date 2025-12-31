import { getGuestId } from './tracking';
import api from './api';

const PHONE_NUMBER = "22501020304"; // Replace with actual number

export const checkoutViaWhatsApp = async (cartItems, total) => {
    const guestId = getGuestId();

    // Create the order in backend first (Status PENDING)
    try {
        const response = await api.post('/orders', {
            items: cartItems.map(item => ({
                productId: item.id, // Assuming product objects have backend ID
                quantity: item.quantity
            })),
            guestId
        });

        const { whatsappMessage } = response.data;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

        window.location.href = waUrl;

    } catch (error) {
        console.error("Checkout failed", error);
        alert("Une erreur est survenue lors de la commande. Veuillez réessayer.");
    }
};
