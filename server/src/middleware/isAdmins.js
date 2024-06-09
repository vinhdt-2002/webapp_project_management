export default function isAdmins(req, res, next) {
    if (!req.isAdmins)
        return res
            .status(400)
            .json({ err: "This user is not an administrator." });
    next();
}
