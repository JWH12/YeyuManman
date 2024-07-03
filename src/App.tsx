import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FestivalList from "./components/FestivalList";
import FestivalRead from "./components/FestivalRead";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header></Header>
          <div className="App">
            <Routes>
              <Route path="/" element={<FestivalList />} />
              <Route path="/Read" element={<FestivalRead />} />
            </Routes>
          </div>
          <Footer></Footer>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
