import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";
import "./Slider.scss";

export function Slider({ min, max, step, value, label, onChange }) {
  return (
    <div className='slider'>
      <label>{label}</label>
      <InputRange
        formatLabel={(value) =>
          value > 0 ? `${Math.abs(value)} ABY` : `${Math.abs(value)} BBY`
        }
        minValue={min}
        maxValue={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
