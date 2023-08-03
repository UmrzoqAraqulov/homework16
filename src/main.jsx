import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GeneralContext from "./contexts/GeneralContext.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GeneralContext>
    <Provider store={store}>
      <App />
    </Provider>
  </GeneralContext>
);
