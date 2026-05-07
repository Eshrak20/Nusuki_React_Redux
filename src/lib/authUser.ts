export const getFirstLetter = (
  name?: string | null,
  email?: string | null
) => {
  const value = name || email || "U";
  return value.charAt(0).toUpperCase();
};