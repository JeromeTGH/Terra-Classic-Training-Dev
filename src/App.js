import React from 'react';
import AppRoutes from './components/AppRoutes';
import { Link, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <h1>Terra Classic Training Dev</h1>
        <nav>
          <Link to="/">Accueil</Link> &nbsp;&nbsp;
          <Link to="/terra1accountfinder/terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v">Terra1accountFinder</Link> &nbsp;&nbsp;
          <Link to="/latestblockinfo">LatestBlockInfo</Link> &nbsp;&nbsp;
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
        <p><em>Nota : esthétique et ergonomie non travaillées pour l'instant (phase d'apprentissage d'interactions avec LCD blockchain Terra Classic)</em></p>
      </footer>
    </BrowserRouter>
  );
};

export default App;