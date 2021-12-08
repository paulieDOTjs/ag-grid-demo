import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { frameworkComponents } from "./agGridComponents/frameworkComponents";
import { useState } from "react";

export default function BaseGrid(props) {
  // reference to grid in baseGrid component.
  // this is used to apply universal functions to all instances of agGrid
  const [grid, setGrid] = useState();

  // the on gridReady function is run by agGrid when it is "ready"
  // we pass it up to any parent component that has an onGridReady and also set it locally
  function onceGridReady(gridIns) {
    if (props.onGridReady) {
      props.onGridReady(gridIns);
    }

    // we also utilize creating custom functions and properties
    // by just just attaching it to the grid.api object
    // this function is being called by the clearDataFunction below
    gridIns.api.clearData = () => gridIns.api.setRowData(null);

    // hold this grid instance in state
    setGrid(gridIns);
  }

  // the on onFirstDataRendered function is run by agGrid when it is "rendered"
  // we utilized this to apply custom functions like applyFilter
  // without waiting for the data to be rendered it would flash all data
  // then render again with the filters applied.
  // we also copied that same design of passing it up to through props
  // if a parent passes down a function they want applied to it
  function onFirstDataRendered(gridIns) {
    console.log("data is on the screen!");

    if (props.onFirstDataRendered) {
      props.onFirstDataRendered(gridIns);
    }
    if (gridIns.api.applyFilter) {
      gridIns.api.applyFilter(gridIns);
    }
  }

  const defaultColDef = {
    width: 100,
    editable: false,
  };

  function clearTable() {
    if (grid?.api?.clearData) {
      grid.api.clearData();
    }
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "1fr 40px",
      }}
    >
      <div
        className="ag-theme-alpine"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          {...props}
          // you can have custom components
          frameworkComponents={frameworkComponents}
          onGridReady={onceGridReady}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
      <div>
        <button onClick={() => clearTable()}>Clear Table</button>
      </div>
    </div>
  );
}
