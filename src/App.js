import React from 'react';
import AppRoutes from './AppRoutes';
import { Link, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <h1>Terra Classic Training Dev</h1>
        <nav>
          <Link to="/">Accueil</Link> &nbsp;&nbsp;
          <Link to="/account/terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v">Account (exemple)</Link> &nbsp;&nbsp;
          <Link to="/block/13246972">Block (exemple)</Link> &nbsp;&nbsp;
          <Link to="/validators">Liste de tous les validateurs</Link> &nbsp;&nbsp;
          <Link to="/validator/terravaloper12g4nkvsjjnl0t7fvq3hdcw7y8dc9fq69nyeu9q">Validateur (exemple)</Link> &nbsp;&nbsp;
          <Link to="/tx/7C28E727369EA9DDAA176B85FE422528D9574F6F846CC1961A1C5BEEFF14E864">Tx (exemple)</Link>
        </nav>
        <hr />
        <br />
      </header>
      <main>
        <AppRoutes />
      </main>
      <footer>
        <br />
        <hr />
        <p><em>Nota : esthétique et ergonomie non travaillées pour l'instant (phase d'apprentissage d'interactions avec le LCD de la blockchain Terra Classic)</em></p>
      </footer>
    </BrowserRouter>
  );
};

export default App;