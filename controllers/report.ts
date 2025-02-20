import { Report } from "@/models/report";
export type ReportData = {
    petName: string,
    location: string,
    locationCoords: string,
    petImg: string,
    email: string
}
export async function createReport(data: ReportData) {
    const { petName, location, locationCoords, petImg, email } = data
    console.log(data)
    const report = await Report.create({ petName, location, locationCoords, petImg, email });
    return report
}

export async function updateReport(data: ReportData, report_id: number) {
    const { petName, location, locationCoords, petImg, email } = data
    console.log(data)
    const report = await Report.findOne({
        where: { report_id },
    });
    console.log(report)
    const res = await report?.set({
        petName, location, locationCoords, petImg, email
    })
    return res
}

export async function getMyReports(email: string) {
    const myReports = await Report.findAll({ where: { email } })
    return myReports
}
// export async function getReportsByCoords(coords: number) {
//     const myReports = await Report.findAll({ where: { locationCoords: coords } })
//     return myReports
// }

export async function deleteReport(report_id: number) {
    const report = await Report.findOne({ where: { id: report_id } })
    console.log(report)
    await report?.destroy()
    return console.log("Reporte eliminado")
}