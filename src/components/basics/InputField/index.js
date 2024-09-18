import React from "react";
import Select from "react-select";
import { DropdownButton, Dropdown } from "react-bootstrap";

import "./index.css";

import useHook from "../../../store/hooks";
import calculateWinning from "../../../utils/calculateWinning";

import LossSound from "../../../assets/sounds/loss.wav";
import WinSound from "../../../assets/sounds/win.wav";

import options from "./data";

const InputField = () => {
  const {
    state: { wheelNumber, betsData, cash, latestNumbers, showDetail },
    setState,
  } = useHook();

  const onSpin = () => {
    if (betsData.length && wheelNumber) {
      const newWin = calculateWinning(betsData, wheelNumber);
      const totalBet = betsData.reduce((total, one) => total + one[2], 0);
      setState({ field: "winAmount", value: newWin });
      setState({ field: "previousBetsData", value: betsData });
      setState({ field: "showResult", value: true });

      const LossSndPlay = new Audio(LossSound);
      const WinSndPlay = new Audio(WinSound);
      if (newWin > 0) {
        WinSndPlay.play();
      } else {
        LossSndPlay.play();
      }

      setTimeout(() => {
        setState({
          field: "cash",
          value: cash + newWin - totalBet,
        });
        setState({
          field: "latestNumbers",
          value: [...latestNumbers, wheelNumber],
        });
        setState({ field: "betsData", value: [] });
        setState({ field: "wheelNumber", value: undefined });
        setState({ field: "winAmount", value: 0 });
        setState({ field: "showResult", value: false });
      }, 3000);
    } else {
      alert("Please input necessary data");
    }
  };

  return (
    <>
      <div className={`wheel-number ${showDetail ? "expanded" : "default"}`}>
        <div className="wheel-number-main">
          <div className="wheel-number-title">WHEEL NUMBER</div>
          <div className="wheel-number-content">
            <div className="wheel-number-input">
              <Select
                value={{ label: wheelNumber, value: wheelNumber }}
                isSearchable={false}
                onChange={(val) => {
                  setState({ field: "wheelNumber", value: `${val.value}` });
                }}
                options={options}
              />

              {/* <input
              type="number"
              className="input-field"
              min={0}
              max={36}
              value={wheelNumber == "" ? "" : Number(wheelNumber)}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) {
                  onSpin();
                }
              }}
              onChange={(e) => {
                e.persist();
                let inputValue = e.target.value;
                if (inputValue > 36) {
                  inputValue = 36;
                  e.target.value = 36;
                } else if (inputValue < 0) {
                  inputValue = 0;
                  e.target.value = 0;
                }
                if (`${inputValue}` !== "00") {
                  inputValue = Number(inputValue);
                }

                setState({ field: "wheelNumber", value: `${inputValue}` });
              }}
            /> */}
            </div>
            <div className="spin-button">
              <button onClick={onSpin}>GO</button>
            </div>
          </div>
        </div>
        <div className="wheel-number-caret">
          <Dropdown.Toggle
            variant="secondary"
            onClick={() => {
              setState({
                field: "showDetail",
                value: !showDetail,
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default InputField;
