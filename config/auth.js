// config/auth.js
module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.session && req.session.userId) {
            return next();
        }
        return res.status(401).json({ message: 'Unauthorized' });
    },
    ensureRole: (role) => {
        return (req, res, next) => {
            if (req.session && req.session.role === role) {
                return next();
            }
            return res.status(403).json({ message: `Forbidden: requires ${role} role` });
        };
    },
};
