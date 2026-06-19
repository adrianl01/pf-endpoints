export type ReportPayload = {
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
  phoneNumber: number;
};