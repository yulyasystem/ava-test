import { useState } from "react";
import { SingleCharacterView } from "../SingleCharacterView/SingleCharacterView";
import { AllCharacters } from "../AllCharacters/AllCharacters";
import { Favorites } from "../Favorites/Favorites";
import "./Main.scss";

export function Main() {
  const [isSingleCharacterView, setIsSingleCharacterView] = useState(false);
  const [characterId, setCharacterId] = useState(0);
  return (
    <div className='main-view'>
      <main className='main'>
        {isSingleCharacterView ? (
          <SingleCharacterView
            characterId={characterId}
            setView={setIsSingleCharacterView}
          />
        ) : (
          <AllCharacters
            setCharacterId={setCharacterId}
            setView={setIsSingleCharacterView}
          />
        )}
      </main>
      {!isSingleCharacterView && <Favorites />}
    </div>
  );
}
