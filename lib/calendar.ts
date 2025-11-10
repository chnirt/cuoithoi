// lib/calendar.ts
export interface CalendarEvent {
  couple: { bride: string; groom: string };
  event: {
    datetime: string; // ISO string
    time: string; // "HH:mm"
    venue?: string;
    address?: string;
  };
}

export function generateGoogleCalendarLink({ couple, event }: CalendarEvent) {
  if (!couple || !event?.datetime || !event?.time) return "";

  const [hour, minute] = event.time.split(":").map(Number);
  const date = new Date(event.datetime);
  date.setHours(hour, minute, 0, 0);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const h = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());
  const start = `${y}${m}${d}T${h}${min}00Z`;

  const endDate = new Date(date.getTime() + 3 * 60 * 60 * 1000); // 3 giờ
  const eh = pad(endDate.getUTCHours());
  const emin = pad(endDate.getUTCMinutes());
  const end = `${y}${m}${d}T${eh}${emin}00Z`;

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
