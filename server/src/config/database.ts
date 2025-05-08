import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  NODE_ENV
} = process.env;

let sequelize: Sequelize;

if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: NODE_ENV === 'development',
    ssl: NODE_ENV === 'production',
    dialectOptions: NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  });
} else {
  sequelize = new Sequelize(
    DATABASE_NAME || 'astrology_ai',
    DATABASE_USER || 'postgres',
    DATABASE_PASSWORD || 'postgres',
    {
      host: DATABASE_HOST || 'localhost',
      port: parseInt(DATABASE_PORT || '5432'),
      dialect: 'postgres',
      logging: NODE_ENV === 'development',
    }
  );
}

export const configureDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // In development, sync database models
    if (NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;