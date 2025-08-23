import "./App.css";

import { FilterByDimensions } from "./components";

function App() {
  const onChange = (values: unknown) => {
    console.log(values);
  }

  return (
    <div style={{ width: '100%' }}>
      <FilterByDimensions onChange={onChange} />
    </div>
  );
}

export default App;
