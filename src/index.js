import express from "express";
import dotenv from "dotenv";
import config from "./config/config.js";
import {connectToDatabase} from './database/database.js';
import {getMigrationsStatus, runMigrations} from './database/umzug.js';
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = config.PORT

app.use(express.json());


app.get("/", (req, res) => {
    res.json({message: "Hello world!"});
});

app.use("/users", userRoutes)
const start = async () => {
    try {
        await connectToDatabase();
        await runMigrations();
        await getMigrationsStatus();

        app.listen(port, () => {
            console.log(`Server is running http://localhost:${port} `);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

start();
