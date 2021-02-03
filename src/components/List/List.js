import "./List.scss";
import { Card } from "../Card/Card";

export function List({ items, setDraggedItem, onDrop, onDragEnter, onDragOver }) {
  // fo from list to favorites list
  // items - favorites

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      className='list'>
      {items &&
        items.map((data, index) => {
          return <Card card={data} key={index} setDraggedItem={setDraggedItem} />;
        })}
    </div>
  );
}
