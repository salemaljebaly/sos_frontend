import React from "react";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";
// import createEmotionCache from "./utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { BrowserRouter } from "react-router-dom";

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps {
//   emotionCache?: EmotionCache;
// }
// Create rtl cache
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin]
});

const container: any = document.getElementById("root");
const root = createRoot(container);
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    </ThemeProvider>
  </CacheProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
