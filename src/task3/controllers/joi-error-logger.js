export function joiErrorLogger(err, req, res, next) {
    if (err && err.error && err.error.isJoi) {
        res.status(404).json({ type: err.type, message: err.error.toString() });
    } else {
        return next(err);
    }
}
