import { db } from '../storage/db.js';
// GET /api/customers (Admin)
export const getCustomers = (_req, res) => {
    try {
        const customers = db.customers.getAll();
        res.json({ success: true, count: customers.length, data: customers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch customers', error });
    }
};
// POST /api/contact
export const submitContactMessage = (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;
        if (!name || !phone || !message) {
            return res.status(400).json({ success: false, message: 'Name, phone and message are required' });
        }
        const newMsg = {
            id: `msg-${Date.now()}`,
            name,
            phone,
            email,
            subject: subject || 'সাধারণ বার্তা',
            message,
            createdAt: new Date().toLocaleDateString('bn-BD', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
        };
        db.messages.create(newMsg);
        res.status(201).json({ success: true, message: 'বার্তা সফলভাবে পাঠানো হয়েছে!', data: newMsg });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message', error });
    }
};
// POST /api/newsletter
export const subscribeNewsletter = (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).json({ success: false, message: 'A valid email is required' });
        }
        const sub = db.subscribers.create(email);
        res.status(201).json({ success: true, message: 'নিউজলেটারে সাবস্ক্রিপশন সফল হয়েছে!', data: sub });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to subscribe', error });
    }
};
