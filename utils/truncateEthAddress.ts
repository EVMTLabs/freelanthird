// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address: `0x${string}` | undefined) => {
  if (!address) return '-';
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}...${match[2]}`;
};
