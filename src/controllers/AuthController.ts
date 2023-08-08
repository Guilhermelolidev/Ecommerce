import { Router } from "express";
import AuthService from "../services/AuthService";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
	try {
		const token = await AuthService.login(req.body);
		return res.status(HttpStatus.OK).json({ token });
	} catch (err) {
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}

		const e = err as Error;
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
});

export default authRouter;
