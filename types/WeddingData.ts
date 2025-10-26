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
}
