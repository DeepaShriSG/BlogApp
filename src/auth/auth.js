import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

const hashCompare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

const createToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    return token;
}

const decodeToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}

const validate = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            const payload = await decodeToken(token);
            req.headers.userId = payload.id;
            let currentTime = +(new Date()) / 1000;
            if (currentTime < payload.exp) {
                next();
            } else {
                res.status(401).send({
                    message: "Token expired"
                });
            }
        } catch (err) {
            res.status(400).send({
                message: "Invalid token"
            });
        }
    } else {
        res.status(400).send({
            message: "Token not found"
        });
    }
}

const admin = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
        try {
            const payload = await decodeToken(token);
            if (payload.role === "admin") {
                next();
            } else {
                res.status(401).send({
                    message: "Only Admin allowed"
                });
            }
        } catch (err) {
            res.status(400).send({
                message: "Invalid token"
            });
        }
    } else {
        res.status(400).send({
            message: "Token not found"
        });
    }
}

export default {
    hashPassword,
    hashCompare,
    createToken,
    decodeToken,
    validate,
    admin
}
