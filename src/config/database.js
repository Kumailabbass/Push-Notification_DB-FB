const { DataSource } = require('typeorm');
const { env } = require('./environment');
const { DeviceToken } = require('../entities/DeviceToken');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: env.NODE_ENV === 'development',
  logging: env.NODE_ENV === 'development',
  entities: [DeviceToken],
  migrations: ['src/migrations/**/*.js'],
  subscribers: [],
});

const initializeDatabase = async () => {
  try {
    const dataSource = await AppDataSource.initialize();
    console.log('Database connection established');
    return dataSource;
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1);
  }
};

module.exports = { AppDataSource, initializeDatabase };