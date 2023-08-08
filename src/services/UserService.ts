import userRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import ResponseError from "../utils/exceptions";
import { UserModel } from "../models/UserModel";
import { HttpStatus, TypeUser } from "../utils/enums";

class UserService {
	async create(user: UserModel) {
		const { name, email, password } = user;
		const role = TypeUser.user;

		const userExists = await userRepository.findUserByEmail(email);

		if (userExists.rows.length > 0) {
			throw new ResponseError(HttpStatus.BAD_REQUEST, "E-mail already exists.");
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const userData = [name, email, hashedPassword, role];
		await userRepository.create(userData);
	}
}

const userService = new UserService();

export default userService;
