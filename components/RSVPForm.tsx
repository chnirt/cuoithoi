"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    guests: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên của bạn";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);

    console.log("[RSVP] Submitted:", formData);

    setSubmitted(true);
    setFormData({ name: "", guests: "", message: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 md:py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-24 h-24 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 border border-neutral-200 rounded-full opacity-10" />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-light text-neutral-800 mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Mong Bạn Đến Chung Vui
          </h2>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-300" />
            <div className="w-1 h-1 bg-neutral-400 rounded-full" />
            <div className="w-20 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300" />
            <div className="w-1 h-1 bg-neutral-400 rounded-full" />
            <div className="w-12 h-px bg-gradient-to-r from-neutral-300 to-transparent" />
          </div>

          <p
            className="text-neutral-600 text-lg font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Cho chúng mình biết bạn có thể đến chung vui nhé.
          </p>
        </div>

        {/* Submitted message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg p-12 text-center border-2"
            style={{ backgroundColor: "#f8f6f3", borderColor: "#8b7355" }}
          >
            <p
              className="text-3xl md:text-4xl font-light mb-4"
              style={{
                color: "#8b7355",
                fontFamily: "Dancing Script, cursive",
              }}
            >
              Cảm ơn bạn đã xác nhận tham dự
            </p>
            <p
              className="text-neutral-600 text-base font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Thông tin của bạn đã được ghi nhận. Hẹn gặp lại trong ngày vui!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-light text-neutral-700 mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Tên của bạn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên đầy đủ"
                className={`w-full px-4 py-4 border-2 rounded-lg font-light transition-all duration-300 focus:outline-none ${
                  errors.name
                    ? "border-red-500 focus:border-red-600"
                    : "border-neutral-300 focus:border-neutral-400"
                }`}
                style={{ fontFamily: "Georgia, serif" }}
              />
              {errors.name && (
                <p
                  className="text-red-500 text-sm mt-2 font-light"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-light text-neutral-700 mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Số người đi cùng (tùy chọn)
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Ví dụ: 2"
                min="0"
                className="w-full px-4 py-4 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-400 transition-all duration-300 font-light"
                style={{ fontFamily: "Georgia, serif" }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-light text-neutral-700 mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Lời nhắn (tùy chọn)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Gửi lời chúc đến cô dâu và chú rể..."
                rows={4}
                className="w-full px-4 py-4 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-400 transition-all duration-300 resize-none font-light"
                style={{ fontFamily: "Georgia, serif" }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 text-white font-light rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#8b7355",
                fontFamily: "Georgia, serif",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#6b5b47")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#8b7355")
              }
            >
              {isLoading ? "Đang gửi..." : "Gửi Xác Nhận"}
            </motion.button>
          </form>
        )}
      </div>
    </motion.section>
  );
}
