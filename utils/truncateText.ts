export const truncateText = (text: string, length: number) => {
  return text.slice(0, length) + (text.length > length ? '...' : '');
};
