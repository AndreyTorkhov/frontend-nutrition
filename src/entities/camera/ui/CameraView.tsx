import React, { useEffect, useRef } from "react";
import { useCameraStore } from "../store";

interface Props {
  className?: string;
  muted?: boolean;
  mirror?: boolean;
}

export const CameraView: React.FC<Props> = ({
  className,
  muted = true,
  mirror,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { stream, isActive } = useCameraStore();

  useEffect(() => {
    const v = videoRef.current;
    if (v && stream) {
      v.srcObject = stream;
      v.play().catch(() => {
        /* safari can reject without user gesture */
      });
    }
  }, [stream]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      {!isActive && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
          Камера не активна
        </div>
      )}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted={muted}
        className={`w-full h-full object-cover ${mirror ? "scale-x-[-1]" : ""}`}
      />
    </div>
  );
};
