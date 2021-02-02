import { useState } from "react";
import { SingleCharacter } from "../SingleCharacter/SingleCharacter";
import { AllCharacters } from "../AllCharacters/AllCharacters";
import { Favorites } from "../Favorites/Favorites";
import "./Main.scss";

export function Main() {
  const [isSingleCharacterView, setIsSingleCharacterView] = useState(false);
  const [characterId, setCharacterId] = useState(0);
  const [characterData, setCharacterData] = useState({});

  return (
    <div className='main-view'>
      <main className='main'>
        {isSingleCharacterView ? (
          <SingleCharacter
            characterId={characterId}
            characterData={characterData}
            setView={setIsSingleCharacterView}
          />
        ) : (
          <AllCharacters
            setCharacterId={setCharacterId}
            setView={setIsSingleCharacterView}
            setCharacterData={setCharacterData}
          />
        )}
      </main>
      {!isSingleCharacterView && <Favorites />}
    </div>
  );
}
