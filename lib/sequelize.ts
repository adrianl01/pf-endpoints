import { Sequelize } from "sequelize";
import pg from "pg"
const sequelize = new Sequelize(process.env.SEQUELIZE_URI as any, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
    dialectModule: pg
})
export { sequelize }