import { reportIndex } from "@/lib/algolia";
import { Report } from "@/models";

export type ReportData = {
    petName: string, location: string,
    long: number, lat: number,
    petImg: string, email: string
}
export type ReportDataUpdate = {
    petName: string, location: string,
    long: number, lat: number,
    petImg: string, email: string
    id: number
}

export async function createReport(data: ReportData) {
    const { petName, location, long, lat, petImg, email } = data
    const strgLong = await JSON.stringify(long)
    const strgLat = await JSON.stringify(lat)
    console.log(strgLat, strgLong)
    const report = await Report.create({ petName, location, long: strgLong, lat: strgLat, petImg, email });
    const res = await await reportIndex.saveObject({
        objectID: report.get("id"),
        petName: report.get("petName"),
        "_geoloc": {
            "lat": lat,
            "lng": long
        },
        email,
        location
    })
    console.log(res)
    return report
}

export async function updateReport(data: ReportDataUpdate, objectID: number) {
    const { petName, location, long, lat, petImg, email, id } = data
    console.log(data)
    const report = await Report.findOne({
        where: { id, email },
    });
    console.log(report)
    const res = await report?.set({
        petName, location, long, lat, petImg, email
    })
    const strg = JSON.stringify(objectID)
    reportIndex.findObject(hit => hit.objectID == strg)
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
    const radius = coords.radius

    const { hits } = await reportIndex.search("", {
        aroundLatLng: [coordsLat, coordsLong].join(","),
        aroundRadius: radius
    })

    return hits
}

export async function deleteReport(report_id: number) {
    const report = await Report.findOne({ where: { id: report_id } })
    console.log(report)
    const res = await report?.destroy()
    return res
}