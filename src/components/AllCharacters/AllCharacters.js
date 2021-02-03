import { useState, useEffect } from "react";
import { Filters } from "../Filter/Filters";
import { List } from "../List/List";

import { ALL_CHARACTERS_API } from "../../constants/api";
import "./AllCharacters.scss";

export function AllCharacters({}) {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);

  const initialValues = {
    films: [
      { id: 0, value: "A New Hope", isChecked: false },
      { id: 1, value: "The Empire Strikes Back", isChecked: false },
    ],
    species: [
      { id: 2, value: "Human", isChecked: false },
      { id: 3, value: "Droid", isChecked: false },
    ],
    age: { label: "Age", min: -80, max: 100, step: 1, value: { min: -80, max: 100 } },
  };

  const [filterValues, setFilterValues] = useState(initialValues);

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
    }));

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
    // console.log(digitAge, min, max);
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

  function onChange(range) {
    setFilterValues({ ...filterValues, age: { ...filterValues.age, value: range } });
  }
  function handleLoad() {
    setPage(page + 1);
  }

  return (
    <div className='characters-wrapper'>
      <Filters
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        onChange={onChange}
      />
      <h2>All Characters List</h2>

      {filteredCharacters.length ? <List items={filteredCharacters} /> : "Loading"}

      {isNext && <button onClick={handleLoad}>Load More</button>}
    </div>
  );
}
