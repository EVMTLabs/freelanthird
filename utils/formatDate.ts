export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
