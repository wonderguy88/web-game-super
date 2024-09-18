import React, { useEffect, useState } from "react";

import useHook from "../../../store/hooks";
import getHotAndColdNumbers from "../../../utils/getHotColdNumbers";

import "./styles.css";

const HotColdField = () => {
  const {
    state: { latestNumbers },
  } = useHook();
  const [hotData, setHotData] = useState([]);
  const [coldData, setColdData] = useState([]);

  useEffect(() => {
    const { hotNumbers, coldNumbers } = getHotAndColdNumbers(latestNumbers);
    setHotData(hotNumbers);
    setColdData(coldNumbers);
  }, [latestNumbers]);
  return (
    <div className="hotcoldfield">
      <div className="hotcoldfield-title">HOT AND COLD NUMBERS</div>
      <div className="hotcoldfield-content">
        <div
          className="hotcoldfield-chart"
          style={{ backgroundColor: "#c30000" }}
        >
          {latestNumbers.length > 0 &&
            [0, 0, 0, 0, 0].map((_, index) => (
              <div key={index}>
                {hotData[index] ? hotData[index].number : ""}
              </div>
            ))}
        </div>
        <div
          className="hotcoldfield-chart"
          style={{ backgroundColor: "#33a9e1" }}
        >
          {[0, 0, 0, 0, 0].map((_, index) => (
            <div key={index}>
              {coldData[index] ? coldData[index].number : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotColdField;
