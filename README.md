# Newsletter Generator

## Installation
First of all, make sure to have Node and Homebrew installed in your machine.

Clone the repository and install all the dependencies:

    npm install

Make sure to install also `sequelize-cli`. Install it globally, using the parameter `-g`:

   npm install -g sequelize-cli

The app will need to communicate with a PostgreSQL database. If not installed already, install Postgres:

    brew install postgres

Then, start the PostgreSQL service with:

    brew services start postgresql

In order to connect to the database, run the following command. This will get you inside the prompt of PostgreSQL:

    psql postgres

Create now the user that will access the database:

    postgres=# CREATE ROLE "express-mvp-dbuser" WITH LOGIN PASSWORD '123456';

Then, create the database:

    postgres=# CREATE DATABASE "express-mvp-db";

> N.B.: the above values for user, password and database are set by default. If needed, you can change these values by setting new values in the file `config/config.js`, and use them in the above commands accordingly.

To exit the prompt, enter `CTRL+D`. Then, migrate the table in the database:

    sequelize db:migrate

You're all set. The app will start running by entering `DEBUG=newsletter-generator:* npm start`. Once up running, the app will be available on port 3000 of the web server: `localhost:3000`.
