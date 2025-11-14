import React, { useEffect, useRef, useState } from "react";
import { Camera, Loader2, RotateCw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { usePhotoUploadStore } from "../store";
import { useCameraStore } from "@/entities/camera/store";
import type { UploadResponse } from "@/features/photo-input/types";

type Props = {
  onUploaded?: (resp: UploadResponse) => void;
  className?: string;
};

export const PhotoInput: React.FC<Props> = ({ onUploaded, className }) => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    stream,
    isActive,
    start,
    stop,
    switchCamera,
    initDevices,
    error: cameraError,
  } = useCameraStore();

  const { isUploading, upload, error: uploadError } = usePhotoUploadStore();

  // запуск/остановка камеры при открытии/закрытии диалога
  useEffect(() => {
    if (open) {
      (async () => {
        try {
          await initDevices();
          await start({ facingMode: "environment" });
        } catch (e) {
          console.error("camera start error", e);
        }
      })();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [open, initDevices, start, stop]);

  // привязка stream к <video>
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleUploaded = (resp: UploadResponse | null) => {
    if (resp && onUploaded) onUploaded(resp);
    if (resp) setOpen(false);
  };

  const handleFile = async (file: File | null | undefined) => {
    if (!file) return;
    const resp = await upload(file);
    handleUploaded(resp);
  };

  const handleCaptureClick = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, w, h);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;
        const file = new File([blob], `photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        await handleFile(file);
      },
      "image/jpeg",
      0.9,
    );
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    void handleFile(file);
    // сброс, чтобы можно было выбрать тот же файл ещё раз
    e.target.value = "";
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`dark:text-white text-black ${className ?? ""}`}
        onClick={() => setOpen(true)}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-5 w-5" />
        )}
        <span className="sr-only">Загрузить фото</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md p-3">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Фото</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="w-full rounded-lg overflow-hidden bg-black aspect-[3/4] flex items-center justify-center">
              {cameraError ? (
                <div className="text-sm text-red-500 px-2 text-center">
                  {cameraError}
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {uploadError && (
              <p className="text-xs text-red-500">{uploadError}</p>
            )}

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleCaptureClick}
                disabled={isUploading || !!cameraError || !isActive}
              >
                {isUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Сделать снимок
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={() => switchCamera()}
                disabled={!!cameraError}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Выбрать из галереи */}
            <div className="flex flex-col gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Выбрать фото из галереи
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
