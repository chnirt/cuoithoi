"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ----------------------
// Mock data: 20 câu chúc
// ----------------------
const WISHES_VN: string[] = [
  "Chúc hai bạn một cuộc sống hôn nhân tràn đầy yêu thương và hạnh phúc.",
  "Mong rằng mỗi ngày bên nhau đều là một kỷ niệm ngọt ngào và đáng nhớ.",
  "Gia đình là nơi trái tim luôn tìm thấy bình yên và yêu thương.",
  "Hãy cùng nhau viết nên câu chuyện tình yêu dài lâu và bền chặt.",
  "Tình yêu là khi hai trái tim đồng hành qua mọi thử thách và niềm vui.",
  "Chúc cho mái ấm của hai bạn luôn rực rỡ tiếng cười và sự sẻ chia.",
  "Cầu chúc hai bạn mãi mãi hạnh phúc, bình an và thấu hiểu nhau.",
  "Một tình yêu đẹp là khi hai người cùng nhau trưởng thành và vun đắp.",
  "Hãy để mỗi khoảnh khắc bên nhau đều là một niềm vui và kỷ niệm đáng nhớ.",
  "Gia đình là nơi bắt đầu và kết thúc của tất cả tình yêu thương.",
  "Mong rằng ngôi nhà của bạn luôn ngập tràn tiếng cười và sự ấm áp.",
  "Hạnh phúc là khi nhìn nhau và thấy trái tim cùng nhịp đập.",
  "Chúc cho tình yêu và sự tin tưởng giữa hai bạn ngày càng sâu sắc.",
  "Cùng nhau chia sẻ mọi buồn vui, để tình yêu luôn vững bền.",
  "Mỗi năm trôi qua, tình yêu của bạn càng thêm ngọt ngào và bền chặt.",
  "Hãy để tình yêu dẫn lối và gia đình là bến đỗ bình yên.",
  "Chúc cho cuộc sống hôn nhân của hai bạn luôn tràn đầy tiếng cười.",
  "Tình yêu đẹp là khi cùng nhau vượt qua mọi thử thách và khó khăn.",
  "Mong rằng mỗi ngày bên nhau đều là một chương mới trong câu chuyện tình yêu.",
  "Hãy cùng nhau xây dựng một gia đình ấm áp, hạnh phúc và yêu thương.",
];

// ----------------------
// Component
// ----------------------
interface AnniversaryWishesProps {
  interval?: number; // thời gian hiển thị 1 câu (ms)
}

export default function AnniversaryWishes({
  interval = 8000,
}: AnniversaryWishesProps) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * WISHES_VN.length)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WISHES_VN.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <section className="min-h-[30vh] flex items-center justify-center bg-white px-6 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.99 }}
          transition={{ duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-[#8b7355] font-light italic leading-relaxed"
          style={{ fontFamily: "Georgia, serif", maxWidth: 700 }}
        >
          {WISHES_VN[index]}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}
