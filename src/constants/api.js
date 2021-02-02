const BASE_URL = "https://swapi.dev/api/";
export const ALL_CHARACTERS_API = (page) => `${BASE_URL}people?page=${page}`;
export const SINGLE_CHARACTER_API = (id) => `${BASE_URL}people/${id ? id : ""}`;
