import "./Card.scss";
// function parseItemId(url) {
//   const filteredArr = url.split("/").filter((item) => item);
//   const id = filteredArr[filteredArr.length - 1];
//   return id;
// }

export function Card({ url, eye, name, setView, data, setCharacterData }) {
  //   const id = parseItemId(url);

  //   function handleDelete() {
  //     const charactersId = JSON.parse(localStorage.getItem("characters"));
  //     const filteredArr = charactersId.filter((item) => item !== id);
  //     localStorage.setItem("characters", JSON.stringify(filteredArr));
  //   }
  function handleCardClick() {
    setView(true);
    setCharacterData(data);
  }

  return (
    <div onClick={handleCardClick} className='card'>
      <h4>{name}</h4>
      {/* <p>Species: </p>
      <p>Movies: </p>
      <p>Spaceships: </p> */}
      {/* <p>My eye color: {eye} </p> */}
    </div>
  );
}
