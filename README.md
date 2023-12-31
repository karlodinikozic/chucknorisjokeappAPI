# Chuck Norris Joke App API

Welcome to the Chuck Norris Joke App API - an entertaining RESTful API designed to deliver 
random Chuck Norris jokes.

## Installation

To get started with the Chuck Norris Joke App API, follow these steps:

1. Clone the repository from GitHub:

   ```shell
   git clone git@github.com:karlodinikozic/chucknorisjokeappAPI.git
   ```

2. Navigate to the project directory:

   ```shell
   cd chucknorisjokeappAPI
   ```

3. Install the required dependencies using Yarn:

   ```shell
   yarn install
   ```

## Configuration

The API uses environment variables for configuration. Create a `.env` file in the project root 
directory and define the following variables:

General:

- `PORT`: The port on which the API should listen (default is 3001).
- `FULL_URL`: The full URL of your API (e.g., http://localhost:3001).
- `SECRET_KEY`: Secret key for JWT authentication.
- `JOKE_API_URL`: The URL of the Chuck Norris Joke API (e.g., https://api.chucknorris.io/).

For email configuration:
- `EMAIL_KEY`:  The email service API key or password.
- `EMAIL_USER`: The email address for sending emails.
- `EMAIL_PORT`: The email service port (e.g., 587).
- `EMAIL_HOST`: The email service host (e.g., gmail).

For database configuration:
- `DB_HOST`: The host of your MySQL database (e.g., localhost).
- `DB_PORT`: The port of your MySQL database (e.g., 3306).
- `DB_NAME`:  The name of the MySQL database.
- `DB_USER`:  The username for connecting to the MySQL database.
- `DB_PASSWORD`: The password for connecting to the MySQL database.


## Usage

**Note:** To run application properly database connection is required


## Docker

You can run the Chuck Norris Joke App API in a Docker container using Docker Compose. 
Make sure you have Docker and Docker Compose installed, and then follow these steps:

### First-time Setup

**Note:** The first-time run of `docker-compose up` may result in a MySQL server signal error, 
causing the Express server to receive a connection refusal. This can be resolved in two simple ways:

Add `restart: unless-stopped` to the `docker-compose.yml` file in the `services -> app` section.

#### or

Run the following commands separately:

   ```shell
   docker-compose up db
   ```

followed by

   ```shell
   docker-compose up app
   ```

Afterward, you can use `docker-compose up` as usual.

### Starting the API in Docker

To start the API in a Docker container, use the following command:

```shell
docker-compose up
```


### Development

To run the API in development mode with automatic code reloading, use the following command:



```shell
yarn dev
```

This will start the API server and automatically restart it whenever you make changes to the code.

### Production

For production use, you can build and start the API with these commands:

```shell
yarn build
yarn start
```

### Testing

You can run tests for the Chuck Norris Joke App API with the following command:

```shell
yarn test
```

Please make sure the database is running as mentioned above to ensure the tests can access the required database connection.
**Note:** It is recommended to run the database using Docker Compose. You can do this by running:

```shell
docker-compose up db
```

This ensures that the necessary database connection is available for the tests to run properly.



## Importing Postman Environment and Collection

Inside the `/postman` directory, you will find three important files for configuring and testing the Chuck Norris Joke App API in Postman:

### Environment Files:

- `JockApp.localDocker.postman_environment.json`
- `JokeApp.local.postman_environment.json`

These environment files contain predefined variables and configurations to simplify API testing in different setups.

### Collection File:

- `JokeApp.postman_collection.json`

This collection file contains a set of API requests organized for easy testing and usage.




## License

This project is licensed under the MIT License

## Contact

For inquiries or suggestions, please don't hesitate to reach out to the author:

- Author: karlodini.kozic
- Email: karlodini.kozic@outlook.com

## Repository

You can access the source code for this API on GitHub: [chucknorisjokeappAPI](https://github.com/karlodinikozic/chucknorisjokeappAPI)

Enjoy the Chuck Norris jokes!
