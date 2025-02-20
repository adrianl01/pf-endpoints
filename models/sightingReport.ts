import { sequelize } from "@/lib/sequelize";

import { Sequelize, DataTypes } from 'sequelize';
import { User } from "./user";

type SightingReportData = {
    petName: string,
    location: string,
    phoneNumber: number,
    email: string
}

export const Sighting = sequelize.define(
    'Sighting',
    {
        petName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.NUMBER
        },
        email: {
            type: DataTypes.STRING
        }
    },
    {}
);
Sighting.belongsTo(User)
// console.log(Sighting === sequelize.models.Sighting); // true



// export async function createReport(data: SightingReportData) {
//     const { petName,
//         location,
//         phoneNumber,
//         email } = data
//     const newSighting = await Sighting.create({
//         petName,
//         location,
//         phoneNumber,
//         email
//     })
//     return newSighting
// }

// export async function updateReport(data: ReportData, report_id: number) {
//     const { petName, location, locationCoords, petImg, email } = data
//     console.log(data)
//     const report = await Report.findOne({
//         where: { report_id },
//     });
//     console.log(report)
//     const res = await report?.set({
//         petName, location, locationCoords, petImg, email
//     })
//     return res
// }