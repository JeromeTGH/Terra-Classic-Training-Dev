import React from 'react';
import AppRoutes from './components/AppRoutes';

const App = () => {
  return (
    <>
      <header>
        <h1>Terra Classic Training Dev</h1>
        <nav>
          <a href="/">Accueil</a> &nbsp;&nbsp;
          <a href="/terra1accountfinder">Terra1accountFinder</a> &nbsp;&nbsp;
          <a href="/latestblockinfo">LatestBlockInfo</a> &nbsp;&nbsp;
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
    </>
  );
};

export default App;