import "./App.css";
import Home from "./Home";
import Console from "./Console";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, ListGroup } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReduxComponents from "./ReduxComponents.js";

import { Provider } from "react-redux";

function App() {
  return (
    <Container>
      <Router>
        <ListGroup horizontal>
          <ListGroup.Item variant="primary">
            <Link to="/">Home</Link>
          </ListGroup.Item>
          <ListGroup.Item variant="primary">
            <Link to="/console">Consola</Link>
          </ListGroup.Item>
          <ListGroup.Item variant="dark">
            <Link to="/configuration">Configuracion</Link>
          </ListGroup.Item>
        </ListGroup>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/console">
          <Console />
        </Route>

        <Route path="/configuration">
          <Provider store={ReduxComponents.store}>
            <ReduxComponents.Org />
          </Provider>
        </Route>

        <Route path="/rfc">
          <Provider store={ReduxComponents.store}>
            <ReduxComponents.Rfc />
          </Provider>
        </Route>

        <Route path="/analyst">
          <Provider store={ReduxComponents.store}>
            <ReduxComponents.Analyst />
          </Provider>
        </Route>
      </Router>
    </Container>
  );
}

export default App;
