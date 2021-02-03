import { Link } from "react-router-dom";
import "./Card.scss";

import { CHARACTER_ROUTE } from "../../constants/routes";

function parseItemId(url) {
  const filteredArr = url.split("/").filter((item) => item);
  const id = filteredArr[filteredArr.length - 1];
  return id;
}

export function Card({ card, setDraggedItem }) {
  const { isDraggable, name, url } = card;
  const id = parseItemId(url);

  //   function handleDelete() {
  //     const charactersId = JSON.parse(localStorage.getItem("characters"));
  //     const filteredArr = charactersId.filter((item) => item !== id);
  //     localStorage.setItem("characters", JSON.stringify(filteredArr));
  //   }

  function dragStartHandler() {
    setDraggedItem(card);
  }

  function dragEndHandler() {
    setDraggedItem(null);
  }

  return (
    <Link
      draggable={isDraggable}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      to={CHARACTER_ROUTE(id)}
      className={isDraggable ? "card" : "card not-draggable"}>
      <h4>{name}</h4>
    </Link>
  );
}
