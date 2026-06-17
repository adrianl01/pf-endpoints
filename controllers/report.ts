import { Report } from '@/models';

export type ReportData = {
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  color: string;
  status: 'lost' | 'found';
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isActive: boolean;
};

export async function createReport(data: ReportData) {
  return Report.create(data);
}

export async function updateReport(id: number, ownerId: number, data: Partial<ReportData>) {
  const report = await Report.findOne({
    where: {
      id,
      ownerId
    }
  });

  if (!report) {
    throw new Error('Report not found');
  }

  report.set(data);

  await report.save();

  return report;
}

export async function getReportById(id: number) {
  return Report.findByPk(id, {
    include: ['Sightings']
  });
}

export async function getUserReports(ownerId: number) {
  return Report.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });
}

export async function getNearbyReports(latitude: number, longitude: number, radiusKm: number) {
  const reports = await Report.findAll();

  return reports
    .map((report: any) => {
      const location = report.get('location');

      if (!location) return null;

      const distanceKm = calculateDistance(latitude, longitude, location.latitude, location.longitude);

      return {
        ...report.toJSON(),
        distanceKm
      };
    })
    .filter((report: any) => report && report.distanceKm <= radiusKm)
    .sort((a: any, b: any) => a.distanceKm - b.distanceKm);
}

export async function deleteReport(id: number, ownerId: number) {
  const report = await Report.findOne({
    where: {
      id,
      ownerId
    }
  });

  if (!report) {
    throw new Error('Report not found');
  }

  await report.destroy();

  return true;
}
