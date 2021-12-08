import React, { createContext, useContext, useEffect, useState } from "react";

export const CoreDataContext = createContext();

export default function CoreDataProvider(props) {
  // we have a thing called messenger
  // it is either the shared worker or the document
  const [messenger, setMessenger] = useState(null);

  // here i am setting the messenger to document.
  // in the real app there is logic about
  // "if there is shared worker setMessenger(sharedWorker)"
  // "if not setMessenger(document)"
  useEffect(() => {
    if (window) {
      setMessenger(document);
    }
  }, []);

  useEffect(() => {
    let timeout;
    // every 15 seconds new data is gotten.
    // i am just doing random data
    if (messenger) {
      sendMessage();
      timeout = setTimeout(() => {
        sendMessage();
      }, 15000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };

    function sendMessage() {
      const event = new Event("message");
      event.data = getData();
      messenger.dispatchEvent(event);
    }

    function getData() {
      return new Array(100).fill("").map((_, i) => ({
        id: "id" + i,
        col1: getRandomNumber(10),
        col2: getRandomNumber(15),
        col3: getRandomNumber(18),
        col4: getRandomNumber(100),
        col5: getRandomNumber(12889),
      }));
    }

    function getRandomNumber(num) {
      return Math.floor(Math.random() * num);
    }
  }, [messenger]);

  return (
    <CoreDataContext.Provider value={{ messenger }}>
      {props.children}
    </CoreDataContext.Provider>
  );
}

export function useCoreDataContext() {
  return useContext(CoreDataContext);
}
