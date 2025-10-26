"use client";

import {
  createContext,
  useContext,
  useState,
  // useEffect,
  type ReactNode,
} from "react";
// import defaultWeddingData from "@/mock/defaultWeddingData.json";
import { defaultWeddingData } from "@/mock/defaultWeddingData";

export interface WeddingGalleryItem {
  id: number;
  src: string;
  alt: string;
}

export interface WeddingData {
  couple: {
    bride: string;
    groom: string;
  };
  event: {
    date: string;
    datetime: string;
    time: string;
    venue: string;
    address: string;
    mapUrl: string;
    calendarUrl: string;
  };
  gallery: WeddingGalleryItem[];
  published?: boolean;
  publishedId?: string;
}

interface WeddingContextType {
  weddingData: WeddingData;
  updateWeddingData: (data: Partial<WeddingData>) => void;
  resetWeddingData: () => void;
  publishWedding: () => string;
  unpublishWedding: () => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [weddingData, setWeddingData] =
    useState<WeddingData>(defaultWeddingData);
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   try {
  //     const savedData = localStorage.getItem("weddingData");
  //     if (savedData) {
  //       const parsed = JSON.parse(savedData);
  //       setWeddingData({ ...defaultWeddingData, ...parsed });
  //     }
  //   } catch (error) {
  //     console.error("Failed to load wedding data from localStorage:", error);
  //   } finally {
  //     setIsLoaded(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isLoaded) {
  //     try {
  //       localStorage.setItem("weddingData", JSON.stringify(weddingData));
  //     } catch (error) {
  //       console.error("Failed to save wedding data to localStorage:", error);
  //     }
  //   }
  // }, [weddingData, isLoaded]);

  const updateWeddingData = (data: Partial<WeddingData>) => {
    setWeddingData((prev) => ({
      ...prev,
      couple: data.couple ? { ...prev.couple, ...data.couple } : prev.couple,
      event: data.event ? { ...prev.event, ...data.event } : prev.event,
      gallery: data.gallery ?? prev.gallery,
    }));
  };

  const resetWeddingData = () => {
    setWeddingData(defaultWeddingData);
    try {
      localStorage.removeItem("weddingData");
    } catch (error) {
      console.error("Failed to clear wedding data from localStorage:", error);
    }
  };

  const publishWedding = () => {
    const publishedId = `wedding-${Date.now()}`;
    const publishedData = { ...weddingData, published: true, publishedId };
    setWeddingData(publishedData);
    try {
      localStorage.setItem("weddingData", JSON.stringify(publishedData));
      localStorage.setItem(
        `published-${publishedId}`,
        JSON.stringify(publishedData)
      );
    } catch (error) {
      console.error("Failed to publish wedding:", error);
    }
    return publishedId;
  };

  const unpublishWedding = () => {
    const publishedId = weddingData.publishedId;
    if (publishedId) {
      try {
        localStorage.removeItem(`published-${publishedId}`);
      } catch (error) {
        console.error("Failed to unpublish wedding:", error);
      }
    }
    const unpublishedData = {
      ...weddingData,
      published: false,
      publishedId: undefined,
    };
    setWeddingData(unpublishedData);
    try {
      localStorage.setItem("weddingData", JSON.stringify(unpublishedData));
    } catch (error) {
      console.error("Failed to update wedding data:", error);
    }
  };

  return (
    <WeddingContext.Provider
      value={{
        weddingData,
        updateWeddingData,
        resetWeddingData,
        publishWedding,
        unpublishWedding,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWeddingData() {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error("useWeddingData must be used within a WeddingProvider");
  }
  return context;
}
