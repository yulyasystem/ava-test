import { Checkbox } from "../Checkbox/Checkbox";
import { Slider } from "../Slider/Slider";

//styles and assets
import icon from "../../assets/filter-icon.svg";
import "./Filters.scss";

export function Filters({ filterValues, onChangeRange, onChangeCheckbox }) {
  return (
    <div className='filters'>
      <div className='filter-icon'>
        <img src={icon} alt={icon} />
        <p>Filters</p>
      </div>
      <div className='group-filter'>
        <div className='movie-filter'>
          <h4>Movies</h4>
          <ul>
            {filterValues.films.map((movie, index, array) => (
              <Checkbox
                items={array}
                key={movie.id}
                id={movie.id}
                value={movie.value}
                isChecked={movie.isChecked}
                onChange={onChangeCheckbox}
              />
            ))}
          </ul>
        </div>
        <div className='species-filter'>
          <h4>Species</h4>
          <ul>
            {filterValues.species.map((species, index, array) => (
              <Checkbox
                items={array}
                key={species.id}
                id={species.id}
                value={species.value}
                isChecked={species.isChecked}
                onChange={onChangeCheckbox}
              />
            ))}
          </ul>
        </div>
      </div>
      <Slider
        label={filterValues.age.label}
        min={filterValues.age.min}
        max={filterValues.age.max}
        value={filterValues.age.value}
        step={filterValues.age.step}
        onChange={onChangeRange}
      />
    </div>
  );
}
