import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/UserRepository";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";

export async function isAdminRoute(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const iduser = Number(request.iduser);

		const user = await userRepository.findUserById(iduser);

		const userData = user.rows[0];

		if (userData.role === "Admin") {
			return next();
		} else {
			throw new ResponseError(HttpStatus.UNAUTHORIZED, "Only for admin");
		}
	} catch (err) {
		if (err instanceof ResponseError) {
			return response.status(err.httpStatus).json({ error: err.message });
		}

		const e = err as Error;
		return response
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
}

export async function isUserRoute(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const iduser = Number(request.iduser);

		const user = await userRepository.findUserById(iduser);

		const userData = user.rows[0];

		if (userData.role === "User") {
			return next();
		} else {
			throw new ResponseError(HttpStatus.UNAUTHORIZED, "Only for user");
		}
	} catch (err) {
		if (err instanceof ResponseError) {
			return response.status(err.httpStatus).json({ error: err.message });
		}

		const e = err as Error;
		return response
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
}
