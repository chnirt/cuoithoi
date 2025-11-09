"use client";

import { WeddingPageProps } from "@/types/wedding";
import WeddingPageView from "./WeddingPageView";
import { useFormContext, useWatch } from "react-hook-form";

export default function PreviewPanel() {
  const { control } = useFormContext<WeddingPageProps>();
  const data = useWatch({ control }) as WeddingPageProps;

  const couple = data.couple;
  const event = data.event;
  const gallery = data.gallery;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full lg:h-[calc(100vh-200px)] lg:flex lg:flex-col">
      <div className="w-full bg-white overflow-y-auto flex-1">
        <WeddingPageView couple={couple} event={event} gallery={gallery} />
      </div>
    </div>
  );
}
