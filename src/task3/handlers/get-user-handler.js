export function getUserHandler(req, res) {
    const { user } = req.user;
    if (!user) {
        return res.status(404).send('Can not find user with such id.');
    }
    res.send(user);
}
