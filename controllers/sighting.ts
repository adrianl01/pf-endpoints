import { Sighting } from "@/models";

export type SightingData = {
  reportId: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  reporterName?: string;
};

export async function createSighting(
  data: SightingData
) {
  return Sighting.create(data);
}

export async function getSightingsByReport(
  reportId: string
) {
  return Sighting.findAll({
    where: {
      reportId,
    },
    order: [["createdAt", "DESC"]],
  });
}

export async function getSightingById(id: string) {
  return Sighting.findByPk(id);
}

export async function deleteSighting(id: string) {
  const sighting = await Sighting.findByPk(id);

  if (!sighting) {
    throw new Error("Sighting not found");
  }

  await sighting.destroy();

  return true;
}