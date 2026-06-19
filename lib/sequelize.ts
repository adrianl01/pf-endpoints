import fs from 'fs';
import { Sequelize } from 'sequelize';
import pg from 'pg';

export const sequelize = new Sequelize(process.env.SEQUELIZE_URI!, {
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      ca: process.env.AIVEN_CA_CERT,
      rejectUnauthorized: true
    }
  }
});
