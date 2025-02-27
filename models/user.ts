import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';

export const User = sequelize.define(
    'User',
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
        },
    },
    {},
);

console.log(User === sequelize.models.User, "model user"); // true
