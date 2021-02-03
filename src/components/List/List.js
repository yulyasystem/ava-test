import "./List.scss";
import { Card } from "../Card/Card";

export function List({ items }) {
  return (
    <div className='list'>
      {items &&
        items.map((data, index) => {
          // console.log(data);
          return <Card name={data.name} key={index} url={data.url} />;
        })}
    </div>
  );
}
