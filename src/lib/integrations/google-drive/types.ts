export type GoogleConfig = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export type GoogleDriveImage = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  md5Checksum?: string;
};