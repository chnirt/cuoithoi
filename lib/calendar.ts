// lib/calendar.ts
export interface CalendarEvent {
  couple: { bride: string; groom: string };
  event: {
    date: string;
    datetime: string; // ISO string
    time: string; // "HH:mm"
    venue?: string;
    address?: string;
  };
}

export function generateGoogleCalendarLink({ couple, event }: CalendarEvent) {
  if (!couple || !event?.datetime) return "";

  const startDate = new Date(event.datetime);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 giờ sau

  const pad = (n: number) => n.toString().padStart(2, "0");

  const formatDate = (date: Date) => {
    const y = date.getUTCFullYear();
    const m = pad(date.getUTCMonth() + 1);
    const d = pad(date.getUTCDate());
    const h = pad(date.getUTCHours());
    const min = pad(date.getUTCMinutes());
    return `${y}${m}${d}T${h}${min}00Z`;
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  const text = encodeURIComponent(
    `Wedding of ${couple.bride} & ${couple.groom}`
  );
  const location = encodeURIComponent(
    event.venue + (event.address ? `, ${event.address}` : "")
  );
  const details = encodeURIComponent(
    "Chúng mình trân trọng mời bạn đến chung vui ngày đặc biệt."
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${location}&details=${details}`;
}
