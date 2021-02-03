import { Link } from "react-router-dom";
import "./Card.scss";

import { CHARACTER_ROUTE } from "../../constants/routes";
import { getCharacterIdFromUrl } from "../../utils/getCharacterIdFromUrl";

export function Card({ card, setDraggedItem }) {
  const { isDraggable, name, url } = card;
  const id = getCharacterIdFromUrl(url);

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
