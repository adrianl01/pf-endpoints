import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';

export const Report = sequelize.define(
    'Report',
    {
        report_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, },
        species: { type: DataTypes.STRING, allowNull: false, },
        breed: { type: DataTypes.STRING, allowNull: false, },
        location: { type: DataTypes.STRING, },
        long: { type: DataTypes.STRING },
        lat: { type: DataTypes.STRING },
        petImg: { type: DataTypes.STRING, },
        email: { type: DataTypes.STRING }
    },
    {}
);
console.log(Report === sequelize.models.Report, "model report"); // true


