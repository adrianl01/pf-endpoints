import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';

export const Auth = sequelize.define(
    'Auth',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {},
);
console.log(Auth === sequelize.models.Auth, "model auth"); // true

