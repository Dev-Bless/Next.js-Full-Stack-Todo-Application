import {NextRequest} from "next/server";
import jwt, {JwtPayload} from "jsonwebtoken";

export function getAuthUser(request: NextRequest): JwtPayload | null {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'fallback-secret'
        ) as JwtPayload;

        return decoded;
    } catch (error) {
        return null;
    }
}