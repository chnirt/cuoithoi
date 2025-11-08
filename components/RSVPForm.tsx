"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import DecorativeLine from "./DecorativeLine";
import type { FormData, FormErrors } from "@/types/rsvp";
import { fadeInUpVariant, staggerContainer } from "@/lib/animations";

/* -------------------- Button animation -------------------- */
const buttonVariants = {
  rest: { scale: 1, backgroundColor: "#8b7355" },
  hover: { scale: 1.02, backgroundColor: "#6b5b47" },
  tap: { scale: 0.98 },
};

/* -------------------- Main Component -------------------- */
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.15)}
      className="py-20 md:py-24 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-24 h-24 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 border border-neutral-200 rounded-full opacity-10" />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div variants={fadeInUpVariant} className="text-center mb-16">
          <p
            className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-6 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {defaultWeddingData.content.rsvpSection}
          </p>

          <h2
            className="text-3xl md:text-3xl font-light text-neutral-800 mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {defaultWeddingData.content.rsvpInvitation}
          </h2>

          <DecorativeLine />

          <p
            className="text-neutral-600 text-base md:text-lg font-light max-w-2xl mx-auto mt-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {defaultWeddingData.content.rsvpDescription}
          </p>
        </motion.div>

        {/* Submitted Message */}
        {submitted ? (
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", stiffness: 120 }}
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
              {defaultWeddingData.content.rsvpSubmittedTitle}
            </p>
            <p
              className="text-neutral-600 text-base font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {defaultWeddingData.content.rsvpSubmittedMessage}
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {["name", "guests", "message"].map((field, idx) => (
              <motion.div key={field} variants={fadeInUpVariant}>
                <FormField
                  id={field}
                  label={
                    field === "name"
                      ? "Tên của bạn"
                      : field === "guests"
                      ? "Số người đi cùng (tùy chọn)"
                      : "Lời nhắn (tùy chọn)"
                  }
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                  placeholder={
                    field === "name"
                      ? "Nhập tên đầy đủ"
                      : field === "guests"
                      ? "Ví dụ: 2"
                      : "Gửi lời chúc đến cô dâu và chú rể..."
                  }
                  type={field === "guests" ? "number" : "text"}
                  textarea={field === "message"}
                  required={field === "name"}
                  error={errors[field as keyof FormErrors]}
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              disabled={isLoading}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="w-full px-8 py-4 text-white font-light rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {isLoading ? "Đang gửi..." : "Gửi Xác Nhận"}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.section>
  );
}

/* -------------------- Subcomponent -------------------- */
interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
}

function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
  textarea,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-light text-neutral-700 mb-3"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-4 py-4 border-2 rounded-lg font-light resize-none transition-all duration-300 focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-neutral-400"
          }`}
          style={{ fontFamily: "Georgia, serif" }}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-4 border-2 rounded-lg font-light transition-all duration-300 focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-neutral-300 focus:border-neutral-400"
          }`}
          style={{ fontFamily: "Georgia, serif" }}
        />
      )}

      {error && (
        <p
          className="text-red-500 text-sm mt-2 font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
