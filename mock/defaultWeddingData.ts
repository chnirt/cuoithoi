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
  const timeStr = "11:00";

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
    content: {
      countdown: "Đếm từng khoảnh khắc đến ngày chúng mình về chung một nhà",
      saveTheDate:
        "Hãy dành ngày này cho tụi mình nhé — đây là ngày quan trọng lắm đó",
      invitation: "Chúng mình sắp cưới rồi, rất mong được gặp bạn",
      invitationSubtitle: "Có bạn ở đó sẽ làm ngày ấy thêm phần ý nghĩa",
      withFamily: "Cùng gia đình hai bên",
      invitationText:
        "Chúng mình trân trọng mời bạn đến chung vui trong ngày đặc biệt",
      specialMoment: "Sự có mặt của bạn sẽ khiến khoảnh khắc thêm trọn vẹn",
      shareJoy: "Hãy đến và cùng chúng mình sẻ chia niềm vui này",
      galleryTitle: "Những khoảnh khắc của chúng mình",
      galleryCaption: "Ghi lại câu chuyện tình yêu của chúng mình",
      eventInfo: "Thông tin sự kiện",
      rsvpSection: "Chúng mình rất mong được gặp bạn",
      rsvpInvitation: "Xác nhận tham dự",
      rsvpDescription:
        "Cho chúng mình biết bạn có thể đến nhé, để chuẩn bị chu đáo",
      rsvpSubmittedTitle: "Cảm ơn bạn đã xác nhận tham dự",
      rsvpSubmittedMessage:
        "Thông tin của bạn đã được ghi nhận. Hẹn gặp lại trong ngày vui!",
      rsvpThankYou:
        "Rất hân hạnh được chào đón bạn trong ngày đáng nhớ của chúng mình",
      footerMessage:
        "Chúng mình thật trân trọng những yêu thương và sự đồng hành trong suốt chặng đường vừa qua",
      copyright:
        "© 2025 — Hành trình yêu thương tiếp tục, với sự bình yên và trọn vẹn",
    },
    gallery: [
      // {
      //   id: 1,
      //   src: "/placeholder.svg?height=400&width=400",
      //   alt: "Engagement photo",
      // },
      // {
      //   id: 2,
      //   src: "/placeholder.svg?height=400&width=400",
      //   alt: "Pre-wedding photoshoot",
      // },
      // {
      //   id: 3,
      //   src: "/placeholder.svg?height=400&width=400",
      //   alt: "Romantic moment",
      // },
      // {
      //   id: 4,
      //   src: "/placeholder.svg?height=400&width=400",
      //   alt: "Wedding day happiness",
      // },
      // {
      //   id: 5,
      //   src: "/placeholder.svg?height=400&width=400",
      //   alt: "Celebration moment",
      // },
      // {
      //   id: 6,
      //   src: "/placeholder.svg?height=400&width=400",
      //   alt: "Wedding portrait",
      // },
    ],
  };
})();

export type DefaultWeddingData = typeof defaultWeddingData;
