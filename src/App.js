import { useEffect } from "react";
import { testFunction } from "./test";

function App() {

  useEffect(() => {
    testFunction();
  }, [])

  return (
    <div>
      Test
    </div>
  );
}

export default App;
