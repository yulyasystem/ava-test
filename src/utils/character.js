export function getCharacterIdFromUrl(url) {
  const filteredArr = url.split("/").filter((item) => item);
  const id = filteredArr[filteredArr.length - 1];
  return id;
}

export function getFavoritesFromLocalStorage() {
  const charactersId = JSON.parse(localStorage.getItem("characters"));

  if (!charactersId) {
    return [];
  } else {
    return charactersId;
  }
}

export function addFavoriteToLocalStorage(id) {
  let charactersId = [];

  charactersId = JSON.parse(localStorage.getItem("characters")) || [];
  charactersId.push(id);
  localStorage.setItem("characters", JSON.stringify(charactersId));
}
