export function createWeddingSlug(
  bride: string,
  groom: string,
  userId: string
) {
  const normalize = (str: string) =>
    str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
      .replace(/\s+/g, "-") // đổi space thành -
      .toLowerCase();

  const brideSlug = normalize(bride);
  const groomSlug = normalize(groom);

  return `${brideSlug}-&-${groomSlug}-${userId}`;
}

export function getUserIdFromSlug(slug: string) {
  const match = slug.match(/user_[A-Za-z0-9]+$/);
  return match ? match[0] : null;
}
