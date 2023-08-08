import { HttpStatus } from "./enums";

export class ResponseError {
	constructor(public httpStatus: HttpStatus, public message: string) {}
}

export default ResponseError;
