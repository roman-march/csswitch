import React from "react";
import CSSwitch from "csswitch";

import "./App.css";

function App() {
  const [state, setState] = React.useState(0);

  return (
    <main className="root">
      <CSSwitch as="span" switchKey={state}>
        {state === 0 && (
          <div className="item" onClick={() => setState(1)}>
            State #0
          </div>
        )}
        {state === 1 && (
          <div className="item" onClick={() => setState(2)}>
            State #1
          </div>
        )}
        {state === 2 && (
          <div className="item" onClick={() => setState(0)}>
            State #2
          </div>
        )}
      </CSSwitch>
    </main>
  );
}

export default App;
