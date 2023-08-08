import { Router } from "express";
import userService from "../services/UserService";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
	try {
		await userService.create(req.body);
		return res.status(HttpStatus.CREATED).json();
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

export default userRouter;
