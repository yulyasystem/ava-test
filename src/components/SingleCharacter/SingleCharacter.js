import { useState, useEffect } from "react";
import "./SingleCharacter.scss";

export function SingleCharacter({ characterData, setView, setCharacterData }) {
  const { name, species, starships, films } = characterData;
  const [character, setCharacter] = useState({});

  function getData(urls) {
    if (!urls.length) {
      return [];
    }

    return Promise.all(urls.map((url) => fetch(url))).then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    );
  }

  useEffect(async () => {
    const allData = await Promise.all([
      getData(films),
      getData(species),
      getData(starships),
    ]);

    setCharacter({ films: allData[0], species: allData[1], starships: allData[2] });
    setCharacterData({ films: allData[0], species: allData[1], starships: allData[2] });
  }, []);

  useEffect(() => {
    console.log(character);
  }, [character]);

  function handleBack() {
    setView(false);
  }

  return (
    <>
      {Object.keys(character).length ? (
        <div className='single-character'>
          <button className='back' onClick={handleBack}>
            ← Back
          </button>
          <h3>{name}</h3>

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
    </>
  );
}
