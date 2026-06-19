import { sequelize } from '@/lib/sequelize';
import { DataTypes } from 'sequelize';

export const Report = sequelize.define(
  'Report',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    breed: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    location: { type: DataTypes.JSONB },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false }
  },
  {}
);
console.log(Report === sequelize.models.Report, 'model report'); // true
