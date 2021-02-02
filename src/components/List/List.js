import "./List.scss";
import { Card } from "../Card/Card";

export function List({ items, setView }) {
  console.log(items);
  return (
    <div className='list'>
      {items &&
        items.map((data, index) => {
          console.log(data);
          return <Card setView={setView} name={data.name} key={index} />;
        })}
    </div>
  );
}
