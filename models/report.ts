import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';

export const Report = sequelize.define(
    'Report',
    {
        petName: { type: DataTypes.STRING, allowNull: false, },
        location: { type: DataTypes.STRING, },
        long: { type: DataTypes.STRING },
        lat: { type: DataTypes.STRING },
        petImg: { type: DataTypes.STRING, },
        email: { type: DataTypes.STRING }
    },
    {}
);
console.log(Report === sequelize.models.Report, "model report"); // true


