import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.SEQUELIZE_URI as any, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
})
export { sequelize }