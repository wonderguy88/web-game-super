import React from "react";
import PresetBet from "../basics/PresetBets";
import "./index.css";
import { Container, Row, Col, Image } from "react-bootstrap";

import useHook from "../../store/hooks";

const Controls = () => {
  const {
    state: { betsData, previousBetsData },
    setState,
  } = useHook();

  const handleRebet = () => {
    setState({ field: "betsData", value: previousBetsData });
  };

  return (
    <>
      <div className="controls-content">
        <Row style={{ width: "100%" }}>
          <Col sm="1"></Col>
          <Col sm="5" style={{ alignContent: "center" }}>
            <div className="control-box">
              <PresetBet />
            </div>
          </Col>

          <Col sm="4" style={{ marginLeft: "1rem", alignContent: "end" }}>
            <div className="button-control-box">
              <button
                className="control-button"
                onClick={() => {
                  setState({ field: "betsData", value: [] });
                }}
                disabled={betsData.length == 0}
              >
                <span>CLEAR</span>
              </button>
              <button
                className="control-button"
                onClick={() => {
                  const tempData = [...betsData];
                  tempData.pop(); //remove the last bet
                  setState({ field: "betsData", value: tempData });
                }}
                disabled={betsData.length == 0}
              >
                <span>UNDO</span>
              </button>
              <button
                className="control-button"
                onClick={() => {
                  let tempData = [...betsData];
                  tempData = tempData.map((one) => [
                    one[0],
                    one[1],
                    2 * one[2],
                  ]);
                  setState({ field: "betsData", value: tempData });
                }}
                disabled={betsData.length == 0}
              >
                <span>DOUBLE</span>
              </button>
              <button
                className="control-button"
                onClick={handleRebet}
                disabled={previousBetsData.length == 0}
                // style={{
                //   visibility:
                //     previousBetsData.length > 0 ? "visible" : "hidden",
                // }}
              >
                <span>REBET</span>
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Controls;
