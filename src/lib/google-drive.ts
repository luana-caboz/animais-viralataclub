/**
 * Contratos da integração com Google Drive.
 *
 * A comunicação com a API do Drive será implementada no Commit 4.
 */
export type GoogleDriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedAt: string;
};
