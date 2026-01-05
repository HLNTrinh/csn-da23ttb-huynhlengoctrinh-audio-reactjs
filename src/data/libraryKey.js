export const getLibraryKey = (user) => {
  if (!user) return null;
  return `library_${user.email}`;
};
