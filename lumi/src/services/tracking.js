import api from './api';
import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'lumi_guest_id';

export const getGuestId = () => {
    let guestId = localStorage.getItem(GUEST_ID_KEY);
    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem(GUEST_ID_KEY, guestId);
    }
    return guestId;
};

export const trackEvent = async (type, payload = {}, url = window.location.pathname) => {
    try {
        const guestId = getGuestId();
        await api.post('/events', {
            guestId,
            type,
            payload,
            url
        });
    } catch (error) {
        console.error('Tracking failed:', error);
        // Fail silently to not disrupt user experience
    }
};
