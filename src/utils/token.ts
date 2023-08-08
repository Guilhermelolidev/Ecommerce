import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayloadI extends JwtPayload {
	iduser: number;
}

export function generateToken(iduser?: number, expiresIn?: string | number) {
	return jwt.sign({ iduser }, `${process.env.JWT_SECRET}`, { expiresIn });
}

export function verify(token: string): JwtPayloadI {
	try {
		const data = jwt.verify(token, `${process.env.JWT_SECRET}`);
		return data as JwtPayloadI;
	} catch (err) {
		throw err;
	}
}
