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
import { resizeImage, uploadToCloudinary } from "@/lib/cloudinary/upload";

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

export function GalleryEditor({ field }: GalleryEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleAddImage = async (file: File) => {
    try {
      setLoading(true);

      // Resize trước khi upload
      const resizedBlob = await resizeImage(file, 1920);

      // Upload lên Cloudinary
      const url = await uploadToCloudinary(resizedBlob);

      const updated = [
        ...(field.value || []),
        { id: Date.now(), src: url, alt: file.name },
      ];
      field.onChange(updated);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (idx: number) => {
    const updated = field.value.filter((_, i) => i !== idx);
    field.onChange(updated);
  };

  return (
    <FormItem>
      <FormLabel>Ảnh Cưới</FormLabel>
      <FormControl>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
          {field.value?.map((img, idx) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-xl overflow-hidden group border border-neutral-200 shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt || `Ảnh ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/50 backdrop-blur-sm text-neutral-700 hover:bg-white/80 hover:text-neutral-900 transition-all opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Nút thêm ảnh */}
          <label className="aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-neutral-400 cursor-pointer hover:bg-neutral-50 transition">
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAddImage(file);
              }}
            />
          </label>
        </div>
      </FormControl>

      <FormDescription className="text-sm text-neutral-500 mt-2">
        Tối ưu 6–9 ảnh cho giao diện thiệp. Ảnh sẽ được hiển thị tự động trong
        gallery. Fullscreen sẽ load ảnh chất lượng cao.
      </FormDescription>
    </FormItem>
  );
}
