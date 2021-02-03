export function getCharacterIdFromUrl(url) {
  const filteredArr = url.split("/").filter((item) => item);
  const id = filteredArr[filteredArr.length - 1];
  return id;
}
