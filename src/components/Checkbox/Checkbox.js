export function Checkbox({ id, value, isChecked, onChange, items }) {
  return (
    <li>
      <input
        key={id}
        type='checkbox'
        value={value}
        onChange={(e) => onChange(e, items)}
        checked={isChecked}></input>
      {value}
    </li>
  );
}
