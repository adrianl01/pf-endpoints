import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.SEQUELIZE_URI as any, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    }
}) // Example for postgres
export { sequelize }