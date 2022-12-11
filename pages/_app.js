import "../styles/globals.css";
import { StateProvider } from "../StateProvider";
import reducer, { initialState } from "../reducer";
import React, { useEffect, useState } from "react";
import { ContextProvider } from "../SocketContext";
function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </ContextProvider>
  );
}

export default MyApp;
