import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';
import { Report } from "./report";
import { Auth } from "./auth";

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
// User.hasMany(Report)
// User.belongsTo(Auth)
console.log(User === sequelize.models.User); // true
