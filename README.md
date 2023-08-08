<h1 align="center">:file_cabinet: Ecommerce </h1>

## :memo: Description
* Simple webshop for selling 3d printer products (English)
* Loja virtual simples para venda de produtos de impressora 3d. (Portuguese)

## :books: Functionalities

| Method | Path           | Description           |
|--------|----------------|-----------------------|
|POST    | /products      | Create a new product  |
|GET     | /products?page={page}&limit={limit} | Get all products |
|POST    | /orderProduct  | Insert product in order |
|DEL     | /orderProduct/{id}  | Remove product from order |
|GET     | /orderProduct  | Get all orders |
|POST    | /users  | Create user |
|POST    | /auth/login  | Login with user |

## :wrench: Technologies
* Node
* Express
* Typescript
* Pg
* Bcrypt
* Jsonwebtoken
* Helmet
* Morgan
* Dotenv
* Nodemon

## :rocket: Running the project
To run the repository it is necessary to clone it, issue the following command to start the project:

* yarn
* yarn dev



