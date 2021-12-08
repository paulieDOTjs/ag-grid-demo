import { useEffect, useState } from "react";

import BaseGrid from "../components/baseGrid/BaseGrid";
import Head from "next/head";
import { colDef } from "../lib/columnDefinitions/colDef";
import { useCoreDataContext } from "../lib/context/CoreDataProvider";

export default function Home() {
  const [grid, setGrid] = useState();
  const { messenger } = useCoreDataContext();

  useEffect(() => {
    if (messenger && grid) {
      messenger.addEventListener("message", handleEvent);
    }
    return () => {
      if (messenger) {
        messenger.removeEventListener("message", handleEvent);
      }
    };
    function handleEvent(e) {
      grid.api.setRowData(e.data);
    }
  }, [messenger, grid]);

  function onGridReady(gridIns) {
    if (window) {
      window.grid = gridIns;
    }
    setGrid(gridIns);
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseGrid columnDefs={colDef} onGridReady={onGridReady} />
    </div>
  );
}
