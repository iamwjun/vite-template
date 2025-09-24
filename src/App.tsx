import "./App.css";

import { FilterByDimensions, IndicatorsForm } from "./components";
import type { Indicator } from "./components/IndicatorsForm";

const initialValues: {
  indicators: Indicator[];
} = {
  indicators: [
    {
      name: "指标001",
      id: 1,
      methods: ["less", "scss"],
      params: {
        lessParams: "less",
        scssParams: "scss",
      },
    },
    {
      name: "指标002",
      id: 2,
      methods: ["rust"],
      params: {
        rustParams: "rust",
      },
    },
    {
      name: "指标003",
      id: 3,
      methods: ["python"],
      params: {
        pythonParams: "python",
      },
    },
  ],
};

function App() {
  const onChange = (values: unknown) => {
    console.log(values);
  };

  return (
    <div style={{ width: "100%" }}>
      <FilterByDimensions onChange={onChange} />
      <IndicatorsForm initialValues={initialValues} />
    </div>
  );
}

export default App;
