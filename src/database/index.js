import {Sequelize} from 'sequelize';
import config from '../config/config.js';

export const sequelize = new Sequelize(config.database);

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}; 