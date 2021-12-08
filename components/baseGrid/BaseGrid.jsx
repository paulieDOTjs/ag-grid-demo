import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useState } from "react";

export default function BaseGrid(props) {
  // reference to grid in baseGrid component.
  // this is used to apply universal functions to all instances of agGrid
  const [grid, setGrid] = useState();
  const [rendered, setRendered] = useState(false);

  // the on gridReady function is run by agGrid when it is "ready"
  // we pass it up to any parent component that has an onGridReady and also set it locally
  function onceGridReady(gridIns) {
    if (props.onGridReady) {
      props.onGridReady(gridIns);
    }
    setGrid(gridIns);
  }

  // the on onFirstDataRendered function is run by agGrid when it is "rendered"
  // we utilized this to apply custom functions like applyFilter
  // without waiting for the data to be rendered it would flash all data
  // then render again with the filters applied.
  // we also copied that same design of passing it up to through props
  // if a parent passes down a function they want applied to it
  function onFirstDataRendered(gridIns) {
    setRendered(true);
    if (props.onFirstDataRendered) {
      props.onFirstDataRendered(gridIns);
    }
    if (gridIns.api.applyFilter) {
      gridIns.api.applyFilter(gridIns);
    }
  }

  return (
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        {...props}
        onGridReady={onceGridReady}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
}
