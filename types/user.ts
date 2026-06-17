export interface UserLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface UserAttributes {
  id: number;
  fullName: string;
  email: string;
  location: UserLocation | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponse = {
  id: number;
  fullName: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};
