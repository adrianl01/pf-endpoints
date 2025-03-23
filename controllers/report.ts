import { reportIndex } from "@/lib/algolia";
import { Report } from "@/models";

export type ReportData = {
    petName: string, location: string,
    long: number, lat: number,
    petImg: string, email: string
}
// export type ReportDataUpdate = {
//     petName: string, location: string,
//     long: number, lat: number,
//     petImg: string, email: string
// }

export async function createReport(data: ReportData) {
    const { petName, location, long, lat, petImg, email } = data
    const strgLong = await JSON.stringify(long)
    const strgLat = await JSON.stringify(lat)
    const report = await Report.create({ petName, location, long: strgLong, lat: strgLat, petImg, email });
    const res = await await reportIndex.saveObject({
        objectID: report.get("id"),
        petName: report.get("petName"),
        "_geoloc": {
            "lat": lat,
            "lng": long
        },
        email,
        location,
        petImg
    })
    console.log(res)
    return report
    // probar el url de cloudinary después de subir una foto
    // return { message: "ok" }
}

export async function updateReport(data: ReportData, id: number) {
    console.log("updateReport")
    const { petName, location, long, lat, petImg, email } = data
    const report = await Report.findOne({
        where: { id, email },
    });
    const res = await report?.set({
        petName, location, long, lat, petImg, email
    })
    console.log(res?.dataValues.petName)
    const _geoloc = { lat: lat, lng: long }
    // IMPORTANTE!!!!: .toString() pone {''} al objeto, y JSON.stringify() pone {""} al objeto
    const objectID = id.toString()
    const algolia = await reportIndex.partialUpdateObject({ petName: petName, location, _geoloc, petImg, objectID: objectID })
    algolia
    console.log("algolia:", algolia)
    const saved = await res?.save()
    return { saved, algolia }

}

export async function getMyReports(email: string) {
    const myReports = await Report.findAll({ where: { email } })
    return myReports
}
export async function getMyReportById(email: string, id: number) {
    const report = await Report.findOne({ where: { email, id } })
    return report
}

export async function getReportsByCoords(coords: any) {
    console.log(coords)
    const coordsLong = coords.strngLong
    const coordsLat = coords.strngLat
    const radius = coords.strngRadius

    const { hits } = await reportIndex.search("", {
        aroundLatLng: [coordsLat, coordsLong].join(","),
        aroundRadius: radius
    })

    return hits
}

export async function deleteReport(email: string, id: number) {
    const report = await Report.findOne({ where: { email, id } })
    console.log(report)
    const res = await report?.destroy()
    return res
}