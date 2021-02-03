import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { AllCharacters } from "./components/AllCharacters/AllCharacters";
import { SingleCharacter } from "./components/SingleCharacter/SingleCharacter";
import "./App.scss";

import { HOME_ROUTE, CHARACTER_ROUTE } from "./constants/routes";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path={HOME_ROUTE} component={AllCharacters} />
          <Route path={CHARACTER_ROUTE()} component={SingleCharacter} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
