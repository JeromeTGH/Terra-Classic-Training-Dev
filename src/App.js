import React from 'react';
// import Terra1accountFinder from './components/Terra1accountFinder';
import LatestBlockInfo from './components/LatestBlockInfo';

const App = () => {
  return (
    <div>
      {/* <Terra1accountFinder /> */}
      <LatestBlockInfo />
      <br />
      <hr />
      <p><em>Nota : aucune navigation ou formulaire créé pour l'instant (phase d'apprentissage d'interactions avec LCD blockchain Terra Classic)</em></p>
    </div>
  );
};

export default App;