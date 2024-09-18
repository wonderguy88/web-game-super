import React from "react";
import "./index.css";

import useHook from "../../../store/hooks";

const betOptions = [0.5, 1, 5, 10, 25, 50, 100];

const PresetBet = () => {
  const {
    state: { betUnit },
    setState,
  } = useHook();

  const BetUnitComponent = ({ betOption, onChangeOption }) => {
    return (
      <div
        className={`bet-box ${betUnit === betOption ? "selected" : ""} `}
        onClick={() => onChangeOption(betOption)}
      >
        {betOption}
      </div>
    );
  };

  return (
    <>
      <div className="preset-content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          BET AMOUNT
        </div>
        <div className="box-content">
          {betOptions.map((betOption) => (
            <BetUnitComponent
              key={betOption}
              betOption={betOption}
              onChangeOption={(option) => {
                setState({ field: "betUnit", value: option });
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PresetBet;
