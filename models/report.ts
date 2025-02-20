import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';
import { User } from "./user";

export const Report = sequelize.define(
    'Report',
    {
        petName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
        },
        locationCoords: {
            type: DataTypes.INTEGER,
        },
        petImg: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        }
    },
    {}
);
// Report.belongsTo(User)
console.log(Report === sequelize.models.Report); // true


