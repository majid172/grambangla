import { db } from '../storage/db.js';
// GET /api/settings
export const getSettings = (_req, res) => {
    try {
        const settings = db.settings.get();
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch settings', error });
    }
};
// PUT /api/settings (Admin)
export const updateSettings = (req, res) => {
    try {
        const updated = db.settings.update(req.body);
        res.json({ success: true, message: 'Settings updated successfully', data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update settings', error });
    }
};
