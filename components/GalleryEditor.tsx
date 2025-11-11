"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/lib/crop";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface GalleryImage {
  id: number | string;
  src: string;
  alt?: string;
}

interface GalleryEditorProps {
  field: {
    value: GalleryImage[];
    onChange: (value: GalleryImage[]) => void;
  };
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function GalleryEditor({ field }: GalleryEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [cropModal, setCropModal] = useState<{
    src: string;
    file: File;
  } | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const handleCropComplete = (_: Area, croppedPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropConfirm = async () => {
    if (!cropModal || !croppedAreaPixels) return;

    setLoading(true);
    try {
      const croppedBlob = await getCroppedImg(cropModal.src, croppedAreaPixels);
      const url = await uploadToCloudinary(croppedBlob);

      field.onChange([
        ...(field.value || []),
        { id: Date.now(), src: url, alt: cropModal.file.name },
      ]);

      // reset state
      setCropModal(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      setCroppedAreaPixels(null);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // cancel thì không làm gì
    setCropModal({ src: URL.createObjectURL(file), file });
    e.target.value = ""; // reset input
  };

  const handleRemoveImage = (idx: number) => {
    field.onChange(field.value.filter((_, i) => i !== idx));
  };

  return (
    <FormItem>
      <FormLabel>Ảnh Cưới</FormLabel>
      <FormControl>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {field.value?.map((img, idx) => (
            <div
              key={img.id}
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt || `Ảnh ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300"
                style={{ objectPosition: "center" }}
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => handleRemoveImage(idx)}
                className="
      absolute top-1.5 right-1.5
      h-5 w-5 sm:h-6 sm:w-6
      rounded-full bg-white/60 backdrop-blur-sm text-neutral-700 
      shadow-[0_0_4px_rgba(0,0,0,0.15)]
      hover:bg-white/80 hover:text-neutral-900 
      transition-all
      opacity-100
    "
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </div>
          ))}

          <label className="aspect-[16/9] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-neutral-400 cursor-pointer hover:bg-neutral-50 transition">
            {loading ? (
              <span className="text-sm">Đang tải...</span>
            ) : (
              <span className="text-sm">+ Thêm ảnh</span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </label>
        </div>
      </FormControl>

      <FormDescription className="text-sm text-neutral-500 mt-2">
        Tối ưu 6–9 ảnh cho giao diện thiệp. Ảnh sẽ được hiển thị tự động trong
        gallery.
      </FormDescription>

      {cropModal && (
        <Dialog
          open={!!cropModal}
          onOpenChange={(open) => !open && !loading && setCropModal(null)}
        >
          <DialogContent className="max-w-[600px] w-full h-[450px]">
            <DialogHeader>
              <DialogTitle>Chỉnh ảnh 16/9</DialogTitle>
            </DialogHeader>

            <div className="relative w-full h-[300px] bg-black">
              <Cropper
                image={cropModal.src}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>

            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => !loading && setCropModal(null)}
                disabled={loading}
              >
                Huỷ
              </Button>
              <Button onClick={handleCropConfirm} disabled={loading}>
                {loading ? "Đang tải..." : "Xác nhận"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </FormItem>
  );
}
