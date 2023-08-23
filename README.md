# Chuck Norris Joke App API

Welcome to the Chuck Norris Joke App API - an entertaining RESTful API designed to deliver random Chuck Norris jokes.

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

## Usage

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

### Docker

You can also run the Chuck Norris Joke App API in a Docker container with Docker Compose. Ensure you have Docker and Docker Compose installed, and then use the following commands:

1. Build the Docker container:

   ```shell
   docker-compose build
   ```

2. Start the API in the Docker container:

   ```shell
   docker-compose up
   ```

This will launch the API in a Docker container, making it easy to deploy and manage.

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



## Configuration

The API uses environment variables for configuration. Create a `.env` file in the project root directory and define the following variables:

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


## License

This project is licensed under the MIT License

## Contact

For inquiries or suggestions, please don't hesitate to reach out to the author:

- Author: karlodini.kozic
- Email: karlodini.kozic@outlook.com

## Repository

You can access the source code for this API on GitHub: [chucknorisjokeappAPI](https://github.com/karlodinikozic/chucknorisjokeappAPI)

Enjoy the Chuck Norris jokes!
