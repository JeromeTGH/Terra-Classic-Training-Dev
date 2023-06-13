import React from 'react';
// import Terra1accountFinder from './components/Terra1accountFinder'
import LastestBlockInfo from './components/LastestBlockInfo';

const App = () => {
  return (
    <div>
      {/* <Terra1accountFinder /> */}
      <LastestBlockInfo />
      <br />
      <hr />
      <p><em>Nota : aucune navigation ou formulaire créé pour l'instant (phase d'apprentissage d'interactions avec LCD blockchain Terra Classic)</em></p>
    </div>
  );
};

export default App;