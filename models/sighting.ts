import { sequelize } from "@/lib/sequelize";
import { DataTypes } from 'sequelize';

export const Sighting = sequelize.define(
    'Sighting',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reportId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.JSONB,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },
    {},
);
