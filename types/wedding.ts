// /types/wedding.ts

/** Thời gian đếm ngược */
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Thông tin cặp đôi */
export interface Couple {
  bride: string;
  groom: string;
}

/** Thông tin sự kiện */
export interface EventInfo {
  date?: string | null;
  datetime?: string | null;
  time?: string | null;
  venue?: string | null;
  address?: string | null;
  mapUrl?: string | null; // thống nhất dùng mapUrl
  calendarUrl?: string | null;
}

/** Dữ liệu hình ảnh gallery */
export interface GalleryImage {
  id: string | number;
  src: string;
  alt?: string;
}

/** Props cho Gallery component */
export interface GalleryProps {
  images: GalleryImage[];
}

/** Dữ liệu mock toàn bộ trang cưới */
export interface WeddingData {
  couple: Couple;
  event: EventInfo;
  gallery: GalleryImage[];
}

/** Dữ liệu sự kiện bắt buộc cho page */
export interface EventData {
  datetime: string;
  venue: string;
  address?: string;
  mapUrl?: string; // thống nhất tên
  date?: string;
  time?: string;
  calendarUrl?: string;
}

/** Props cho trang WeddingPage */
export interface WeddingPageProps {
  couple: Couple;
  event: EventData;
  gallery: GalleryImage[];
}

/** Kiểu EventInfo dùng cho các component con */
export type EventInfoType = {
  date?: string | null;
  datetime?: string | null;
  time?: string | null;
  venue?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  calendarUrl?: string | null;
};
