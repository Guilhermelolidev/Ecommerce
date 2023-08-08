export class UserModel {
	iduser?: string;
	name: string;
	email: string;
	password: string;
	role: string;

	constructor(user: UserModel) {
		this.name = user.name;
		this.email = user.email;
		this.password = user.password;
		this.role = user.role;
	}
}
