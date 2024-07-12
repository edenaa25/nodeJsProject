const jwt = require('jsonwebtoken');
const { updateUserActions } = require("../services/userService");

const SECRET_KEY = 'my_secret_key'; 

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded; // Set req.user with decoded token data
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const checkAndUpdateActions = async (req, res, next) => {
    const userId = req.user.id;
    // console.log(userId)
    const allowed = await updateUserActions(userId);
    if (!allowed) {
        return res.status(403).send("No more actions available for today");
    }

    next();
};

module.exports = { authenticateJWT, checkAndUpdateActions };