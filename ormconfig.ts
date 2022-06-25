const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(process.cwd(), `.env`),
});

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
