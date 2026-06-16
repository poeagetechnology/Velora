import React, { useState, useRef } from "react";

export interface MediaAsset {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  loop?: boolean;
  muted?: boolean;
}

interface FarmMediaGalleryProps {
  assets: MediaAsset[];
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3]">
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
    </div>
  );
}

interface MediaCardProps {
  asset: MediaAsset;
  onClick: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ asset, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 z-10" />
      )}

      {asset.type === "image" ? (
        <img
          src={asset.src}
          alt={asset.alt ?? "Farm photo"}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <video
          ref={videoRef}
          src={asset.src}
          loop={asset.loop ?? true}
          muted={asset.muted ?? true}
          playsInline
          autoPlay
          onLoadedData={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play icon for video */}
      {asset.type === "video" && (
        <div className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-gray-800 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Caption */}
      {asset.caption && (
        <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {asset.caption}
        </p>
      )}

      {/* Expand icon */}
      <div className="absolute top-3 left-3 w-7 h-7 bg-white/0 group-hover:bg-white/90 rounded-full flex items-center justify-center transition-all duration-200">
        <svg
          className="w-3.5 h-3.5 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
          />
        </svg>
      </div>
    </button>
  );
};

interface LightboxProps {
  asset: MediaAsset;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function Lightbox({
  asset,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Media */}
        <div className="rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
          {asset.type === "image" ? (
            <img
              src={asset.src}
              alt={asset.alt ?? ""}
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={asset.src}
              controls
              autoPlay
              loop={asset.loop}
              muted={asset.muted}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Caption */}
        {asset.caption && (
          <p className="mt-3 text-center text-white/60 text-sm">
            {asset.caption}
          </p>
        )}

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 transition-all"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 transition-all"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

const LOADING_COUNT = 4;

export default function FarmMediaGallery({ assets }: FarmMediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () =>
    setLightboxIndex((i) => (i !== null && i < assets.length - 1 ? i + 1 : i));

  if (!assets.length) {
    return (
      <div className="grid grid-cols-2 gap-3 mt-6">
        {Array.from({ length: LOADING_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const [featured, ...rest] = assets;

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* Featured slot — spans 2 columns */}
        <div className="col-span-2">
          <MediaCard asset={featured} onClick={() => open(0)} />
        </div>
        {/* Remaining thumbnails */}
        {rest.slice(0, 3).map((asset, i) => (
          <MediaCard key={asset.id} asset={asset} onClick={() => open(i + 1)} />
        ))}
        {/* "View all" tile when there are more than 4 assets */}
        {assets.length > 4 && (
          <button
            onClick={() => open(4)}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-blue-900 flex items-center justify-center text-white group"
          >
            <div className="text-center">
              <p className="text-2xl font-black">+{assets.length - 4}</p>
              <p className="text-xs font-semibold text-blue-300 mt-1">
                more photos
              </p>
            </div>
          </button>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          asset={assets[lightboxIndex]}
          onClose={close}
          onPrev={prev}
          onNext={next}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < assets.length - 1}
        />
      )}
    </>
  );
}
