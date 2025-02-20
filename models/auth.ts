import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';
import { User } from "./user";

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
// Auth.hasOne(User)
console.log(Auth === sequelize.models.Auth); // true

