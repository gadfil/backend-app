import dotenv from "dotenv";

dotenv.config();
const requiredEnvVariables = [
    'DATABASE_USER',
    'DATABASE_PASSWORD',
    'DATABASE_NAME',
    'DATABASE_HOST'
];
requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Environment variable ${key} is missing.`);
        process.exit(1);
    }
});
const config = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    database: {


        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'postgres',
        host: process.env.DATABASE_HOST,
        dialect: 'postgresql'
    },
    pool: {
        max: parseInt(process.env.DB_POOL_MAX) || 10,
        min: parseInt(process.env.DB_POOL_MIN) || 0,
        acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
        idle: parseInt(process.env.DB_POOL_IDLE) || 10000
    }
};
export default config;
