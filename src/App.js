import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { SingleCharacter } from "./components/SingleCharacter/SingleCharacter";
import "./App.scss";

import { HOME_ROUTE, CHARACTER_ROUTE } from "./constants/routes";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path={HOME_ROUTE} component={Main} />
          <Route path={CHARACTER_ROUTE()} component={SingleCharacter} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
