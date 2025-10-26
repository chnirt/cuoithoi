"use client";

import { useState } from "react";
import EditorForm from "@/components/EditorForm";
import PreviewPanel from "@/components/PreviewPanel";
import { useWeddingData } from "@/context/WeddingContext";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { weddingData, publishWedding, unpublishWedding } = useWeddingData();

  const handlePublish = () => {
    const publishedId = publishWedding();
    const shareUrl = `${window.location.origin}/share/${publishedId}`;
    setToastMessage(`Đã xuất bản! Liên kết: ${shareUrl}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleUnpublish = () => {
    unpublishWedding();
    setToastMessage("Đã hủy xuất bản");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyLink = () => {
    if (weddingData.publishedId) {
      const shareUrl = `${window.location.origin}/share/${weddingData.publishedId}`;
      navigator.clipboard.writeText(shareUrl);
      setToastMessage("Đã sao chép liên kết!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-light text-neutral-900"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Chỉnh Sửa Thiệp Cưới
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Tùy chỉnh thông tin cưới của bạn
            </p>
          </div>

          {/* Buttons + User */}
          <div className="flex gap-3 items-center">
            {weddingData.published ? (
              <>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Sao Chép Liên Kết
                </button>
                <button
                  onClick={handleUnpublish}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Hủy Xuất Bản
                </button>
              </>
            ) : (
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-[#b9a27f] text-white rounded-lg text-sm font-medium hover:bg-[#a89370] transition-colors"
              >
                Xuất Bản
              </button>
            )}

            {/* User button */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" 
              />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] max-w-md text-center">
          {toastMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:h-[calc(100vh-200px)]">
          {/* Editor Form */}
          <div
            className={`${
              activeTab === "editor" ? "block" : "hidden"
            } lg:block lg:bg-white lg:rounded-lg lg:shadow-sm lg:p-8 lg:overflow-y-auto`}
          >
            <div className="bg-white rounded-lg shadow-sm p-8 lg:bg-transparent lg:rounded-none lg:shadow-none lg:p-0">
              <EditorForm
                onSave={() => {
                  setToastMessage("Đã lưu thành công!");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className={`${
              activeTab === "preview" ? "block" : "hidden"
            } lg:block lg:bg-white lg:rounded-lg lg:shadow-sm lg:overflow-hidden`}
          >
            <PreviewPanel />
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 flex gap-0 z-40 shadow-lg">
          <button
            onClick={() => setActiveTab("editor")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "editor"
                ? "text-[#b9a27f] border-b-2 border-[#b9a27f]"
                : "text-neutral-600 border-b-2 border-transparent"
            }`}
          >
            Chỉnh Sửa
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              activeTab === "preview"
                ? "text-[#b9a27f] border-b-2 border-[#b9a27f]"
                : "text-neutral-600 border-b-2 border-transparent"
            }`}
          >
            Xem Trước
          </button>
        </div>

        {/* Add padding to prevent content from being hidden behind tab navigation */}
        <div className="lg:hidden h-20" />
      </div>
    </div>
  );
}
