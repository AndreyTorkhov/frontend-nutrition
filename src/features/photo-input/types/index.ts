export interface PhotoAsset {
  file: File;
  previewUrl: string;
  width?: number;
  height?: number;
  exifOrientation?: number;
}

export interface UploadResponse {
  id: string;
  url: string;
}
