/* eslint-disable eqeqeq */
import React from "react";

import { red, black, even, odd } from "../../../consts/BetTable";
import useHook from "../../../store/hooks";

import "./index.css";

const DATA_SET = {
  color: [
    { color: "#a60000", data: red },
    { color: "#0b0b0b", data: black },
  ],
  even: [
    { color: "#045a98", data: odd },
    { color: "#001831", data: even },
  ],
};

const RouteltteField = (props) => {
  const {
    title,
    value,
    unit,
    numberInfo,
    onChangeCash,
    inputDisabled = true,
    numberArrays = [],
    field,
  } = props;
  const {
    state: { latestNumbers },
  } = useHook();

  const ColorSection = ({ data, color }) => {
    const percent =
      (latestNumbers.filter(
        (one) => data.includes(`${one}`) || data.includes(Number(one))
      ).length /
        latestNumbers.length) *
      100;

    if (percent > 0) {
      return (
        <div
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        >
          {Math.round(percent)}%
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div
      className={
        numberInfo !== "2"
          ? numberInfo === "1"
            ? "contain-latest"
            : "contain"
          : "contain-hot-cold"
      }
    >
      <div className="main-field">
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="bet-title"
        >
          {title}
        </div>
        <div className="info-content">
          <div className="value">
            {numberInfo == 1 ? (
              <div className="latest-numbers-content">
                {[0, 0, 0, 0, 0, 0, 0, 0].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      color: red.includes(Number(numberArrays[index]))
                        ? "red"
                        : black.includes(Number(numberArrays[index]))
                        ? "black"
                        : "green",
                    }}
                  >
                    {numberArrays[index]}
                  </div>
                ))}
              </div>
            ) : numberInfo == 2 ? (
              <div className="number-frequency">
                {latestNumbers.length > 0 && (
                  <>
                    <ColorSection
                      data={DATA_SET[field][0].data}
                      color={DATA_SET[field][0].color}
                    />
                    <ColorSection data={["0", "00"]} color={"#426c06"} />
                    <ColorSection
                      data={DATA_SET[field][1].data}
                      color={DATA_SET[field][1].color}
                    />
                  </>
                )}
              </div>
            ) : (
              <>
                <span className="unit">{unit}</span>
                <div
                  className="info"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "55%",
                  }}
                >
                  <input
                    type="number"
                    value={value}
                    style={{
                      backgroundColor: "transparent",
                      color: "#ffffff",
                      fontWeight: "bold",
                      border: "none",
                      width: "90%",
                      textAlign: "center",
                      maxHeight: "50%",
                      margin: "auto",
                    }}
                    onChange={(e) => {
                      onChangeCash({
                        field: "cash",
                        value: Number(e.target.value),
                      });
                    }}
                    disabled={inputDisabled}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteltteField;
