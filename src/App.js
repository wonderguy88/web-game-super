import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";

import Footer from "./components/Footer";
import TableComponent from "./components/CustomTable";
import Info from "./components/infos";
import Controls from "./components/control";

import { Provider } from "./store";
import reducer, { initialState } from "./store/reducers";
import useHook from "./store/hooks";

import "./App.css";
const App = () => {
  const [scale, setScale] = useState(window.innerWidth / window.outerWidth);
  const boardRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResize = () => {
    if (boardRef.current) {
      const scale1 = boardRef.current.clientWidth / window.outerWidth;
      const deltaScale = (0.3 * (scale1 - 0.48)) / 0.52;

      setScale(0.7 + deltaScale);
    }
  };

  const ModalComponent = () => {
    const {
      state: { showResult, betsData, winAmount },
    } = useHook();
    return (
      <Modal
        show={showResult}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme="dark"
      >
        <Modal.Body data-bs-theme="dark" style={{ textAlign: "center" }}>
          <b style={{ fontSize: "larger" }}>WIN</b>
          <h1>{winAmount} $</h1>
          <div className="result-modal-win">
            <b>NET WIN</b>
            <p>
              {winAmount - betsData.reduce((total, one) => total + one[2], 0)} $
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Provider initialState={initialState} reducer={reducer}>
      <div className="main">
        <div className="board" style={{ scale: `1 ${scale}` }} ref={boardRef}>
          <div className="content">
            <div className="info">
              <Info />
            </div>
            <div className="table">
              <TableComponent />
            </div>
            <div className="control">
              <Controls />
            </div>
          </div>
        </div>
      </div>
      <ModalComponent />
      <Footer />
    </Provider>
  );
};

export default App;

//STILL NEED TO CREATE FUNCTIONALITY FOR

//Basket, or a five number bet, and allows players to bet on the zero, double zero, 1, 2, and 3. Payout – 6:1.
