import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./SingleCharacter.scss";

import { HOME_ROUTE } from "../../constants/routes";
import { SINGLE_CHARACTER_API } from "../../constants/api";

export function SingleCharacter() {
  const { id } = useParams();

  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(SINGLE_CHARACTER_API(id))
      .then((response) => {
        return response.json();
      })
      .then(getIntermediateResults)
      .then((data) => {
        setCharacter(data);
      });
  }, []);

  async function getIntermediateResults(data) {
    const { species, starships, films } = data;

    const allData = await Promise.all([
      getData(films),
      getData(species),
      getData(starships),
    ]);

    return { ...data, films: allData[0], species: allData[1], starships: allData[2] };
  }

  function getData(urls) {
    if (!urls.length) {
      return [];
    }

    return Promise.all(urls.map((url) => fetch(url))).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    );
  }

  return (
    <div className='single-character'>
      <Link to={HOME_ROUTE} className='back'>
        ← Back
      </Link>
      {Object.keys(character).length ? (
        <div className='single-character'>
          <h3>{character.name}</h3>

          <div>
            <b>Films: </b>
            {character.films.length
              ? character.films.map((film, index) => (
                  <p key={index}> {film.title + ","}</p>
                ))
              : "No films"}
          </div>
          <div>
            <b>Species: </b>
            {character.species.length
              ? character.species.map((species, index) => (
                  <p key={index}> {species.name + ","}</p>
                ))
              : "No species"}
          </div>
          <div>
            <b>Starships: </b>
            {character.starships.length
              ? character.starships.map((starship, index) => (
                  <p key={index}> {starship.name}</p>
                ))
              : "No starships"}
          </div>
        </div>
      ) : (
        <p className='loading'>loading...</p>
      )}
    </div>
  );
}
