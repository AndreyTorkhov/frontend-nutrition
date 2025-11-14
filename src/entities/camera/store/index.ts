import { create } from "zustand";

export type FacingMode = "user" | "environment";

export interface CameraState {
  stream: MediaStream | null;
  isActive: boolean;
  facingMode: FacingMode;
  deviceId: string | null;
  availableVideoDevices: MediaDeviceInfo[];
  error: string | null;

  initDevices: () => Promise<void>;
  start: (opts?: { facingMode?: FacingMode; deviceId?: string | null }) => Promise<void>;
  stop: () => void;
  switchCamera: () => Promise<void>;
  setFacingMode: (fm: FacingMode) => void;
  setDeviceId: (id: string | null) => void;
}

const getConstraints = (opts: { facingMode?: FacingMode; deviceId?: string | null }) => {
  const { deviceId, facingMode } = opts;

  const video: MediaTrackConstraints = deviceId
    ? { deviceId: { exact: deviceId } }
    : { facingMode: facingMode ?? "environment" };

  (video as any).width = { ideal: 1280 };
  (video as any).height = { ideal: 720 };

  return { video, audio: false } as MediaStreamConstraints;
};

export const useCameraStore = create<CameraState>((set, get) => ({
  stream: null,
  isActive: false,
  facingMode: "environment",
  deviceId: null,
  availableVideoDevices: [],
  error: null,

  initDevices: async () => {
    try {
      // iOS Safari hack — must request permission before enumerateDevices shows labels
      try {
        const tmp = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        tmp.getTracks().forEach((t) => t.stop());
      } catch {}

      const devices = await navigator.mediaDevices.enumerateDevices();
      const vids = devices.filter((d) => d.kind === "videoinput");

      set({ availableVideoDevices: vids, error: null });
    } catch (e) {
      set({ error: "Не удалось получить список камер" });
    }
  },

  start: async (opts) => {
    const facing = opts?.facingMode ?? get().facingMode;
    const deviceId = opts?.deviceId ?? get().deviceId;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        getConstraints({ facingMode: facing, deviceId })
      );

      // стоп старый стрим
      get().stream?.getTracks().forEach((t) => t.stop());

      set({
        stream,
        isActive: true,
        facingMode: facing,
        deviceId: deviceId ?? null,
        error: null,
      });
    } catch (e) {
      console.error("camera start error", e);
      set({ error: "Доступ к камере отклонён", isActive: false });
      throw e;
    }
  },

  stop: () => {
    const s = get().stream;
    if (s) s.getTracks().forEach((t) => t.stop());
    set({ stream: null, isActive: false });
  },

  switchCamera: async () => {
    const devices = get().availableVideoDevices;
    if (!devices.length) await get().initDevices();

    const devs = get().availableVideoDevices;
    if (!devs.length) return;

    const current = get().deviceId;
    const idx = devs.findIndex((d) => d.deviceId === current);
    const next = devs[(idx + 1 + devs.length) % devs.length];

    const nextFacing: FacingMode =
      get().facingMode === "environment" ? "user" : "environment";

    await get().start({
      deviceId: next.deviceId,
      facingMode: nextFacing,
    });
  },

  setFacingMode: (fm) => set({ facingMode: fm }),
  setDeviceId: (id) => set({ deviceId: id }),
}));
