import { QueryResult } from "pg";
import query from "../config/db";
import { UserModel } from "../models/UserModel";

class UserRepository {
	async create(user: Array<string>) {
		await query(
			"insert into users (name,email,password,role) values ($1,$2,$3, $4)",
			user
		);
	}

	async findUserByEmail(email: string): Promise<QueryResult<UserModel>> {
		const res = await query("select * from users where email = $1", [email]);
		return res;
	}

	async findUserById(iduser: number): Promise<QueryResult<UserModel>> {
		const res = await query("select * from users where iduser = $1", [iduser]);
		return res;
	}
}

const userRepository = new UserRepository();

export default userRepository;
