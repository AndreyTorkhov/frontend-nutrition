export type FacingMode = "user" | "environment";

export interface CameraState {
  stream: MediaStream | null;
  isActive: boolean;
  facingMode: FacingMode;
  deviceId: string | null;
  availableVideoDevices: MediaDeviceInfo[];
  error: string | null;

  initDevices: () => Promise<void>;
  start: (opts?: {
    facingMode?: FacingMode;
    deviceId?: string;
  }) => Promise<void>;
  stop: () => void;
  switchCamera: () => Promise<void>;
  setFacingMode: (fm: FacingMode) => void;
  setDeviceId: (id: string | null) => void;
}
