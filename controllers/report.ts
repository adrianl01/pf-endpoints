import { reportIndex } from "@/lib/algolia";
import { Report } from "@/models";

export type ReportData = {
    petName: string,
    location: string,
    long: number,
    lat: number,
    petImg: string,
    email: string
}

export async function createReport(data: ReportData) {
    const { petName, location, long, lat, petImg, email } = data
    const strgLong = await JSON.stringify(long)
    const strgLat = await JSON.stringify(lat)
    console.log(strgLat, strgLong)
    const report = await Report.create({ petName, location, long: strgLong, lat: strgLat, petImg, email });
    const reportAlgolia = data
    const res = await reportIndex.saveObject({ reportAlgolia }, { autoGenerateObjectIDIfNotExist: true })
    console.log(res)
    return report
}

export async function updateReport(data: ReportData, report_id: number) {
    const { petName, location, long, lat, petImg, email } = data
    console.log(data)
    const report = await Report.findOne({
        where: { report_id },
    });
    console.log(report)
    const res = await report?.set({
        petName, location, long, lat, petImg, email
    })
    const saved = await res?.save()
    return saved
}

export async function getMyReports(email: string) {
    const myReports = await Report.findAll({ where: { email } })
    return myReports
}

export async function getReportsByCoords(coords: any) {
    const coordsLong = coords.long
    const coordsLat = coords.lat
    const myReports = await Report.findAll({ where: { long: coordsLong, lat: coordsLat } })
    return myReports
}

export async function deleteReport(report_id: number) {
    const report = await Report.findOne({ where: { id: report_id } })
    console.log(report)
    const res = await report?.destroy()
    return res
}