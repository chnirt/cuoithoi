import { getWedding } from "@/lib/firestore/weddings";

interface HeadProps {
  params: { slug: string };
}

export default async function Head({ params }: HeadProps) {
  const wedding = await getWedding(params.slug);

  if (!wedding) {
    return (
      <>
        <title>Thiệp cưới không tìm thấy</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }

  return (
    <>
      <title>{`${wedding.couple.bride} & ${wedding.couple.groom} - Thiệp cưới`}</title>
      <meta
        name="description"
        content={`Tham dự lễ cưới của ${wedding.couple.bride} & ${wedding.couple.groom} vào ngày ${wedding.event.date}.`}
      />

      {/* Open Graph / Social Sharing */}
      <meta
        property="og:title"
        content={`${wedding.couple.bride} & ${wedding.couple.groom} - Thiệp cưới`}
      />
      <meta
        property="og:description"
        content={`Tham dự lễ cưới của ${wedding.couple.bride} & ${wedding.couple.groom}.`}
      />
      {wedding.gallery[0]?.src && (
        <meta property="og:image" content={wedding.gallery[0].src} />
      )}
      <meta property="og:type" content="website" />
    </>
  );
}
