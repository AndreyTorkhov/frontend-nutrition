import React from "react";
import type { PhotoAsset } from "@/features/photo-input/types";

export const UploadPreview: React.FC<{
  asset?: PhotoAsset | null;
  className?: string;
}> = ({ asset, className }) => {
  if (!asset) return null;
  return (
    <div
      className={`relative w-full aspect-square overflow-hidden rounded-2xl ${
        className ?? ""
      }`}
    >
      <img
        src={asset.previewUrl}
        alt="preview"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
