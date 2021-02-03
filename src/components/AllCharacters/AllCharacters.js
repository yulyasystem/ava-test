import { useState, useEffect, useMemo } from "react";
import { Filters } from "../Filter/Filters";
import { List } from "../List/List";
import { Favorites } from "../Favorites/Favorites";

import "./AllCharacters.scss";

import { ALL_CHARACTERS_API } from "../../constants/api";
import {
  getCharacterIdFromUrl,
  getFavoritesFromLocalStorage,
} from "../../utils/character";

import { initialFilterValues } from "../../constants/static";

export function AllCharacters({}) {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [filterValues, setFilterValues] = useState(initialFilterValues);

  let persistedCharacters = useMemo(() => getFavoritesFromLocalStorage());

  // additional data as movies and species needed for further filtering
  async function getherMoreCharactersData(data) {
    const characters = data.results;
    const filmsLinks = [
      ...new Set(characters.map((character) => character.films).flat()),
    ];
    const speciesLinks = [
      ...new Set(characters.map((character) => character.species).flat()),
    ];

    const filmsData = await Promise.all(
      filmsLinks.map((filmLink) => fetch(filmLink).then((response) => response.json()))
    );
    const speciesData = await Promise.all(
      speciesLinks.map((filmLink) => fetch(filmLink).then((response) => response.json()))
    );

    const charactersUpgraded = characters.map((character) => ({
      ...character,
      films: character.films.map(
        (filmLink) => filmsData[filmsLinks.indexOf(filmLink)].title
      ),
      species: character.species.map(
        (speciesLink) => speciesData[speciesLinks.indexOf(speciesLink)].name
      ),
      isDraggable: true,
      id: getCharacterIdFromUrl(character.url),
    }));

    const favoritesArr = charactersUpgraded.filter((character) => {
      return persistedCharacters.includes(character.id);
    });

    setFavorites([...favorites, ...favoritesArr]);
    return { ...data, results: charactersUpgraded };
  }

  useEffect(() => {
    fetch(ALL_CHARACTERS_API(page))
      .then((response) => {
        return response.json();
      })
      .then(getherMoreCharactersData)
      .then((data) => {
        setCharacters([...characters, ...data.results]);
        setFilteredCharacters([...characters, ...data.results]);
        setIsNext(Boolean(data.next));

        if (page < 3) {
          setPage(page + 1);
        }
      });
  }, [page]);

  function filterByRange(character) {
    const { max, min } = filterValues.age.value;
    const isBBY = character.birth_year.includes("BBY");
    //slice last 3 elements which always are ABY or BBY
    let digitAge = character.birth_year.slice(0, -3);

    if (isBBY) {
      //transform digit to negative
      digitAge = -Math.abs(digitAge);
    }
    if (min === filterValues.age.min && max === filterValues.age.max) {
      return true;
    }
    return digitAge >= min && digitAge <= max;
  }

  function filterByMovies(character) {
    const choosenFilms = filterValues.films.filter((film) => film.isChecked);
    if (!choosenFilms.length) {
      return true;
    } else {
      return choosenFilms.some((chosenFilm) =>
        character.films.includes(chosenFilm.value)
      );
    }
  }

  function filterBySpecies(character) {
    const choosenSpecies = filterValues.species.filter((film) => film.isChecked);
    if (!choosenSpecies.length) {
      return true;
    } else {
      return choosenSpecies.some((chosenSpecies) =>
        character.species.includes(chosenSpecies.value)
      );
    }
  }

  useEffect(
    function handleFilters() {
      const filteredCharacters = characters
        .filter(filterByRange)
        .filter(filterByMovies)
        .filter(filterBySpecies);
      setFilteredCharacters(filteredCharacters);
    },
    [filterValues]
  );

  function onChangeRange(range) {
    setFilterValues({ ...filterValues, age: { ...filterValues.age, value: range } });
  }

  function onChangeCheckbox({ target }, values) {
    let newValues = values;
    newValues.forEach((item) => {
      if (item.value === target.value) {
        item.isChecked = target.checked;
      }
    });

    setFilterValues({ ...filterValues, [values]: newValues });
  }
  function handleLoad() {
    setPage(page + 1);
  }

  function onDropHandler(e) {
    e.preventDefault();
    let deletedCharacter;

    const updatedFavorites = favorites.filter((character) => {
      if (character.name === draggedItem.name) {
        deletedCharacter = draggedItem;
        character.isDraggable = true;
      }
      return character.name !== draggedItem.name;
    });

    const updatedFilteredCharacters = filteredCharacters.map((character) => {
      if (character.name === deletedCharacter.name) {
        character.isDraggable = true;
      }
      return character;
    });

    deleteCharacterIdFromLocalStorage(deletedCharacter.id);

    setFavorites(updatedFavorites);
    setFilteredCharacters(updatedFilteredCharacters);
  }

  function deleteCharacterIdFromLocalStorage(id) {
    const charactersId = JSON.parse(localStorage.getItem("characters"));
    const filteredArr = charactersId.filter((item) => item !== id);
    localStorage.setItem("characters", JSON.stringify(filteredArr));
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dragEnterHandler(e) {
    e.preventDefault();
  }

  return (
    <div className='main-view'>
      <main className='main'>
        <div className='characters-wrapper'>
          <Filters
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            onChangeRange={onChangeRange}
            onChangeCheckbox={onChangeCheckbox}
          />
          <h2>All Characters List</h2>

          {filteredCharacters.length ? (
            <List
              setDraggedItem={setDraggedItem}
              items={filteredCharacters}
              onDrop={onDropHandler}
              onDragEnter={dragEnterHandler}
              onDragOver={dragOverHandler}
            />
          ) : (
            "Loading"
          )}

          {isNext && <button onClick={handleLoad}>Load More</button>}
        </div>
      </main>
      <Favorites
        favorites={favorites}
        setFavorites={setFavorites}
        draggedItem={draggedItem}
        characters={filteredCharacters}
        setCharacters={setFilteredCharacters}
        setDraggedItem={setDraggedItem}
      />
    </div>
  );
}
