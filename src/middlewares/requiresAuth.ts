import { NextFunction, Response, Request } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { HttpStatus } from "../utils/enums";
import { verify } from "../utils/token";

export function requiresAuth(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { authorization } = request.headers;

	if (!authorization) {
		return response
			.status(HttpStatus.UNAUTHORIZED)
			.json({ error: "Token not provided" });
	}

	try {
		const token = verify(authorization);

		request.iduser = token.iduser;
		return next();
	} catch (e) {
		if (e instanceof JsonWebTokenError) {
			response
				.status(HttpStatus.UNAUTHORIZED)
				.json({ error: "Token is not valid" });
		}
	}
}
