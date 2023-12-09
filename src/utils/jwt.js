import { sign } from "jsonwebtoken";

export function getToken(payload) {
    const token = sign(payload, "secret", {
        expiresIn: "1 days",
    });
    return token;
}