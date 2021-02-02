import { useState, useEffect } from "react";
import { Filters } from "../Filter/Filters";
import { List } from "../List/List";

import { ALL_CHARACTERS_API } from "../../constants/api";
import "./AllCharacters.scss";

export function AllCharacters({ setView }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch(ALL_CHARACTERS_API(1))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCharacters(data.results);
      });
  }, []);
  return (
    <div className='characters-wrapper'>
      <Filters />
      <h2>All Characters List</h2>
      {<List setView={setView} items={characters} />}
    </div>
  );
}
