import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';

export const Auth = sequelize.define(
    'Auth',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
        }
    },
    {},
);
console.log(Auth === sequelize.models.Auth, "model auth"); // true

