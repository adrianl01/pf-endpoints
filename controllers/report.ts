import { reportIndex } from "@/lib/algolia";
import { cloudinary } from "@/lib/cloudinary";
import { Report } from "@/models";

export type ReportData = {
    petName: string, location: string,
    long: number, lat: number,
    petImg: string, email: string
}

export async function createReport(data: ReportData) {
    const { petName, location, long, lat, petImg, email } = data
    const strgLong = await JSON.stringify(long)
    const strgLat = await JSON.stringify(lat)
    const report = await Report.create({ petName, location, long: strgLong, lat: strgLat, petImg, email });
    const res = await reportIndex.saveObject({
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
    return report
}

export async function updateReport(data: ReportData, id: number) {
    const { petName, location, long, lat, petImg, email } = data
    const report = await Report.findOne({
        where: { id, email },
    });
    const res = await report?.set({
        petName, location, long, lat, petImg, email
    })
    const _geoloc = { lat: lat, lng: long }
    // IMPORTANTE!!!!: .toString() pone {''} al objeto, y JSON.stringify() pone {""} al objeto
    const objectID = id.toString()
    const algolia = await reportIndex.partialUpdateObject({ petName: petName, location, _geoloc, petImg, objectID: objectID })
    const saved = await res?.save()
    return { saved, algolia }
}

export async function deleteOldRepImg(oldImg: any) {
    const splitRes = oldImg.split("/");
    const s1 = splitRes[7];
    const s2 = splitRes[8].split(".")[0];
    try {
        const cloudinaryRes = await cloudinary.uploader.destroy(s1 + "/" + s2);
        return cloudinaryRes
    } catch (e) { return e }
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
    const strngId = id.toString()
    await reportIndex.deleteObject(strngId)
    const res = await report?.destroy()
    return res
}