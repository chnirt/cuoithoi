// app/not-found.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1
        className="text-6xl md:text-8xl font-bold text-[#b9a27f]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        404
      </h1>
      <p
        className="mt-4 text-lg md:text-2xl font-light text-gray-600 text-center max-w-lg"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>

      <div className="mt-8">
        <Button
          onClick={() => router.push("/")}
          className="bg-[#b9a27f] hover:bg-[#a89370] text-white px-6 py-3 rounded-lg shadow-md"
        >
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
}
