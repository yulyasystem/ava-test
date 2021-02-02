import { useState } from "react";

//styles and assets
import icon from "../../assets/filter-icon.svg";
import "./Filters.scss";

export function Filters() {
  const [isSingleCharacterView, setIsSingleCharacterView] = useState(false);
  return (
    <div className='filters'>
      <div className='filter-icon'>
        <img src={icon} />
        <p>Filters</p>
      </div>
    </div>
  );
}
