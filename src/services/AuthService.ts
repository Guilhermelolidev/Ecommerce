import userRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import ResponseError from "../utils/exceptions";
import { UserModel } from "../models/UserModel";
import { HttpStatus } from "../utils/enums";
import { generateToken } from "../utils/token";

const MIN_EMAIL_L = 8;
const MAX_EMAIL_L = 40;
const EMAIL_REG =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AuthService {
	async login(user: UserModel) {
		const { email, password } = user;

		if (!email || !password) {
			throw new ResponseError(
				HttpStatus.MULTIPLE_CHOICES,
				"Some parameters were not given."
			);
		}

		if (
			!(MIN_EMAIL_L <= email.length && email.length <= MAX_EMAIL_L) ||
			!String(email).toLowerCase().match(EMAIL_REG)
		)
			throw new ResponseError(
				HttpStatus.MULTIPLE_CHOICES,
				"Either email is not between 8 and 40 character inclusive or it is not a valid email."
			);

		const userExists = await userRepository.findUserByEmail(email);

		if (userExists.rows.length <= 0) {
			throw new ResponseError(
				HttpStatus.NOT_FOUND,
				"Incorret E-mail or user is not registered."
			);
		}

		const is_match = bcrypt.compareSync(password, userExists.rows[0].password);
		if (!is_match) {
			throw new ResponseError(
				HttpStatus.UNAUTHORIZED,
				"Incorret password or user is not registered."
			);
		}

		const token = generateToken(Number(userExists.rows[0].iduser), "5h");
		return token;
	}
}

const authService = new AuthService();

export default authService;
