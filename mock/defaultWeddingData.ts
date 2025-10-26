export const defaultWeddingData = (() => {
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);

  // Format date & datetime
  const dateStr = nextMonth.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const datetimeISO = nextMonth.toISOString();
  const timeStr = "11:00 AM";

  return {
    couple: {
      bride: "Cô Dâu",
      groom: "Chú Rể",
    },
    event: {
      date: dateStr,
      datetime: datetimeISO,
      time: timeStr,
      venue: "Nhà hàng Hạnh Phúc",
      address: "123 Đường Tình Yêu, Quận 1, TP. Hồ Chí Minh",
      mapUrl:
        "https://maps.google.com/?q=Nhà+Hàng+Hạnh+Phúc,+123+Đường+Tình+Yêu,+Quận+1,+TP.HCM",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Co+Dau+%26+Chu+Re",
    },
    gallery: [
      {
        id: 1,
        src: "/placeholder.svg?height=400&width=400",
        alt: "Engagement photo",
      },
      {
        id: 2,
        src: "/placeholder.svg?height=400&width=400",
        alt: "Pre-wedding photoshoot",
      },
      {
        id: 3,
        src: "/placeholder.svg?height=400&width=400",
        alt: "Romantic moment",
      },
      {
        id: 4,
        src: "/placeholder.svg?height=400&width=400",
        alt: "Wedding day happiness",
      },
      {
        id: 5,
        src: "/placeholder.svg?height=400&width=400",
        alt: "Celebration moment",
      },
      {
        id: 6,
        src: "/placeholder.svg?height=400&width=400",
        alt: "Wedding portrait",
      },
    ],
  };
})();

export type DefaultWeddingData = typeof defaultWeddingData;
