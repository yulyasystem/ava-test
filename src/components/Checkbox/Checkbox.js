export function Checkbox({ id, value, isChecked, onChange }) {
  return (
    <li>
      <input
        key={id}
        type='checkbox'
        value={value}
        onChange={onChange}
        checked={isChecked}></input>
      {value}
    </li>
  );
}
