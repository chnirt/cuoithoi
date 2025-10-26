"use client";

import type React from "react";
import { useState } from "react";
import { useWeddingData } from "@/context/WeddingContext";
import type { WeddingData } from "@/types/WeddingData";

export default function EditorForm({ onSave }: { onSave?: () => void }) {
  const { weddingData, updateWeddingData, resetWeddingData } = useWeddingData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!weddingData.couple.bride.trim())
      newErrors["couple.bride"] = "Tên cô dâu không được để trống";
    if (!weddingData.couple.groom.trim())
      newErrors["couple.groom"] = "Tên chú rể không được để trống";
    if (!weddingData.event.datetime)
      newErrors["event.datetime"] = "Ngày giờ cưới không được để trống";
    if (!weddingData.event.time.trim())
      newErrors["event.time"] = "Thời gian không được để trống";
    if (!weddingData.event.venue.trim())
      newErrors["event.venue"] = "Tên địa điểm không được để trống";
    if (!weddingData.event.address.trim())
      newErrors["event.address"] = "Địa chỉ không được để trống";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    section: keyof WeddingData,
    key: string,
    value: string
  ) => {
    updateWeddingData({
      [section]: {
        ...weddingData[section],
        [key]: value,
      },
    } as Partial<WeddingData>);

    // Clear error for this field
    const fieldKey = `${section}.${key}`;
    if (errors[fieldKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Thông tin đã được cập nhật thành công!");
      onSave?.();
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại tất cả thông tin?")) {
      resetWeddingData();
      setErrors({});
      setSuccessMessage("Đã đặt lại thông tin mặc định");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {successMessage}
        </div>
      )}

      <div>
        <h2
          className="text-xl font-light text-neutral-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thông Tin Cặp Đôi
        </h2>

        {/* Bride Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tên Cô Dâu
          </label>
          <input
            type="text"
            value={weddingData.couple.bride}
            onChange={(e) =>
              handleInputChange("couple", "bride", e.target.value)
            }
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors ${
              errors["couple.bride"] ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="Nhập tên cô dâu"
          />
          {errors["couple.bride"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["couple.bride"]}
            </p>
          )}
        </div>

        {/* Groom Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tên Chú Rể
          </label>
          <input
            type="text"
            value={weddingData.couple.groom}
            onChange={(e) =>
              handleInputChange("couple", "groom", e.target.value)
            }
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors ${
              errors["couple.groom"] ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="Nhập tên chú rể"
          />
          {errors["couple.groom"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["couple.groom"]}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <h2
          className="text-xl font-light text-neutral-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thông Tin Sự Kiện
        </h2>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Ngày Giờ Cưới
            </label>
            <input
              type="datetime-local"
              value={weddingData.event.datetime.slice(0, 16)}
              onChange={(e) =>
                handleInputChange("event", "datetime", e.target.value)
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors ${
                errors["event.datetime"]
                  ? "border-red-500"
                  : "border-neutral-300"
              }`}
            />
            {errors["event.datetime"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors["event.datetime"]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Thời Gian
            </label>
            <input
              type="text"
              value={weddingData.event.time}
              onChange={(e) =>
                handleInputChange("event", "time", e.target.value)
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors ${
                errors["event.time"] ? "border-red-500" : "border-neutral-300"
              }`}
              placeholder="VD: 10:00 Sáng"
            />
            {errors["event.time"] && (
              <p className="text-red-500 text-xs mt-1">
                {errors["event.time"]}
              </p>
            )}
          </div>
        </div>

        {/* Venue */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tên Địa Điểm
          </label>
          <input
            type="text"
            value={weddingData.event.venue}
            onChange={(e) =>
              handleInputChange("event", "venue", e.target.value)
            }
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors ${
              errors["event.venue"] ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="VD: Nhà Hàng Tiệc Cưới"
          />
          {errors["event.venue"] && (
            <p className="text-red-500 text-xs mt-1">{errors["event.venue"]}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Địa Chỉ
          </label>
          <input
            type="text"
            value={weddingData.event.address}
            onChange={(e) =>
              handleInputChange("event", "address", e.target.value)
            }
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors ${
              errors["event.address"] ? "border-red-500" : "border-neutral-300"
            }`}
            placeholder="VD: 123 Đường Bất Kỳ, Thành Phố"
          />
          {errors["event.address"] && (
            <p className="text-red-500 text-xs mt-1">
              {errors["event.address"]}
            </p>
          )}
        </div>

        {/* Map URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Liên Kết Bản Đồ
          </label>
          <input
            type="url"
            value={weddingData.event.mapUrl}
            onChange={(e) =>
              handleInputChange("event", "mapUrl", e.target.value)
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors"
            placeholder="https://maps.google.com/..."
          />
        </div>

        {/* Calendar URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Liên Kết Lịch
          </label>
          <input
            type="url"
            value={weddingData.event.calendarUrl}
            onChange={(e) =>
              handleInputChange("event", "calendarUrl", e.target.value)
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b9a27f] transition-colors"
            placeholder="https://calendar.google.com/..."
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6 border-t border-neutral-200">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-[#b9a27f] text-white rounded-lg font-medium hover:bg-[#a89370] transition-colors"
        >
          Lưu Thay Đổi
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
        >
          Đặt Lại
        </button>
      </div>
    </form>
  );
}
