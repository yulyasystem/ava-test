import { List } from "../List/List";
import "./Favorites.scss";

export function Favorites({
  favorites,
  setFavorites,
  draggedItem,
  characters,
  setCharacters,
  setDraggedItem,
}) {
  function onDropHandler(e) {
    e.preventDefault();

    const newDraggedItem = { ...draggedItem };
    newDraggedItem.isDraggable = true;

    const updatedCharacters = characters.map((character) => {
      if (character.name === draggedItem.name) {
        character.isDraggable = false;
      }
      return character;
    });

    setCharacters(updatedCharacters);
    setFavorites([...favorites, newDraggedItem]);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dragEnterHandler(e) {
    e.preventDefault();
  }

  return (
    <aside>
      <h4 className='heading'>Favorites</h4>
      {!!favorites.length && <p>To delete drag over list of characters</p>}
      <List
        items={favorites}
        setDraggedItem={setDraggedItem}
        onDrop={onDropHandler}
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
      />
    </aside>
  );
}
