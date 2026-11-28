import { config } from '../config/index.js';
// POST /api/auth/login
export const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === config.admin.email && password === config.admin.password) {
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        name: 'মোঃ আব্দুল্লাহ',
                        role: 'Super Admin',
                        email: config.admin.email,
                    },
                    token: `gb-token-${Date.now()}`,
                },
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: 'ভুল ইমেইল বা পাসওয়ার্ড। সঠিক তথ্য দিন।',
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Login failed', error });
    }
};
// GET /api/auth/me
export const getAdminProfile = (_req, res) => {
    res.json({
        success: true,
        data: {
            name: 'মোঃ আব্দুল্লাহ',
            role: 'Super Admin',
            email: config.admin.email,
        },
    });
};
