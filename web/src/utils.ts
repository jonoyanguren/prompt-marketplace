export const getLikeNumbers = (likes: number) => {
  if (likes < 1000) return likes;
  if (likes < 1000000) return (likes / 1000).toFixed(1) + "K";
  if (likes < 1000000000) return (likes / 1000000).toFixed(1) + "M";
  return (likes / 1000000000).toFixed(1) + "B";
};
