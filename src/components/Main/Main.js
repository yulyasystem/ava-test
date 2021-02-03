import { AllCharacters } from "../AllCharacters/AllCharacters";
import { Favorites } from "../Favorites/Favorites";
import "./Main.scss";

export function Main() {
  return (
    <div className='main-view'>
      <main className='main'>
        <AllCharacters />
      </main>
      <Favorites />
    </div>
  );
}
