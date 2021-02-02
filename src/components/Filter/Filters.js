import { useState, useEffect } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Slider } from "../Slider/Slider";

//styles and assets
import icon from "../../assets/filter-icon.svg";
import "./Filters.scss";

export function Filters({ filterValues, setFilterValues, onChange }) {
  function handleCheckMovies({ target }) {
    let films = filterValues.films;
    films.forEach((film) => {
      if (film.value === target.value) {
        film.isChecked = target.checked;
      }
    });

    setFilterValues({ ...filterValues, films: films });
  }

  function handleCheckSpecies({ target }) {
    let species = filterValues.species;
    species.forEach((item) => {
      if (item.value === target.value) {
        item.isChecked = target.checked;
      }
    });

    setFilterValues({ ...filterValues, species: species });
  }

  return (
    <div className='filters'>
      <div className='filter-icon'>
        <img src={icon} alt={icon} />
        <p>Filters</p>
      </div>
      <div className='movie-filter'>
        <h4>Movies</h4>
        <ul>
          {filterValues.films.map((movie) => (
            <Checkbox
              key={movie.id}
              id={movie.id}
              value={movie.value}
              isChecked={movie.isChecked}
              onChange={handleCheckMovies}
            />
          ))}
        </ul>
      </div>
      <div className='species-filter'>
        <h4>Species</h4>
        <ul>
          {filterValues.species.map((species) => (
            <Checkbox
              key={species.id}
              id={species.id}
              value={species.value}
              isChecked={species.isChecked}
              onChange={handleCheckSpecies}
            />
          ))}
        </ul>
      </div>
      <Slider
        label={filterValues.age.label}
        min={filterValues.age.min}
        max={filterValues.age.max}
        value={filterValues.age.value}
        step={filterValues.age.step}
        onChange={onChange}
      />
    </div>
  );
}
