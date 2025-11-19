"use client";

import { useCallback, useEffect, useState } from "react";
import EditorForm from "@/components/EditorForm";
import PreviewPanel from "@/components/PreviewPanel";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import { WeddingPageProps } from "@/types/wedding";
import { fetchWeddingByUserId } from "@/lib/firestore/weddings";
import LoadingOverlay from "@/components/LoadingOverlay";
import ShareDialog from "@/components/ShareDialog";
import { MIN_LOADING_TIME } from "@/constants/loading";

export default function EditorPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const form = useForm<WeddingPageProps>({
    defaultValues: defaultWeddingData,
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;

    let cancelled = false;

    const fetchWedding = async () => {
      setLoading(true);
      try {
        const dataPromise = fetchWeddingByUserId(user.id);

        // Tạo promise delay 2 giây
        const delayPromise = new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME)
        );

        // Chờ cả 2 promise xong
        const data = await Promise.all([dataPromise, delayPromise]).then(
          ([data]) => data
        );

        if (!cancelled && data) {
          form.reset(data);
          if (data.slug) setSlug(data.slug);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWedding();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, user, form]);

  const onResettingChange = useCallback(() => {
    form.reset(defaultWeddingData);
  }, [form]);

  if (!isLoaded || loading) return <LoadingOverlay show={true} />;

  return (
    <div className="min-h-screen bg-neutral-100 relative">
      {/* Loading Overlay */}
      <LoadingOverlay show={submitting} />
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1
              className="font-light text-neutral-900"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 5vw, 1.875rem)",
              }}
            >
              Chỉnh Sửa Thiệp Cưới
            </h1>
            <p
              className="text-neutral-500 mt-1"
              style={{ fontSize: "clamp(0.875rem, 3vw, 1rem)" }}
            >
              Tùy chỉnh thông tin cưới của bạn
            </p>
          </div>

          {/* Buttons + User */}
          <div className="flex gap-3 items-center">
            {slug && <ShareDialog slug={slug} />}

            {/* User button */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Form {...form}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:h-[calc(100vh-200px)]">
            {/* Editor Form */}
            <div
              className={`${
                activeTab === "editor" ? "block" : "hidden"
              } lg:block lg:bg-white lg:rounded-lg lg:shadow-sm lg:p-8 lg:overflow-y-auto`}
            >
              <div className="bg-white rounded-lg shadow-sm lg:bg-transparent lg:rounded-none lg:shadow-none lg:p-0">
                <EditorForm
                  onSubmittingChange={setSubmitting}
                  onSaved={(slug) => setSlug(slug)}
                  onResettingChange={onResettingChange}
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
        </Form>

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
