import { reportIndex } from "@/lib/algolia";
import { uploadImage } from "@/lib/cloudinary";
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
    console.log(data)
    const { petName, location, long, lat, petImg, email } = data
    const strgLong = await JSON.stringify(long)
    const strgLat = await JSON.stringify(lat)
    console.log(strgLat, strgLong)
    const resCloudinaryImgUrl = await uploadImage(petImg)
    console.log(resCloudinaryImgUrl)

    // const report = await Report.create({ petName, location, long: strgLong, lat: strgLat, petImg:resCloudinaryImgUrl, email });
    // const res = await await reportIndex.saveObject({
    //     objectID: report.get("id"),
    //     petName: report.get("petName"),
    //     "_geoloc": {
    //         "lat": lat,
    //         "lng": long
    //     },
    //     email,
    //     location,
    //     petImg:resCloudinaryImgUrl.
    //     })
    // console.log(res)
    // return report

    // probar el url de cloudinary después de subir una foto
    return "ok"
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

export async function deleteReport(report_id: number) {
    const report = await Report.findOne({ where: { id: report_id } })
    console.log(report)
    const res = await report?.destroy()
    return res
}