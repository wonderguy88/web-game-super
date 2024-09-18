import React from "react";

import useHook from "../../store/hooks";

import "./styles.css";

function toggleFullScreen(elem) {
  if (
    (document.fullScreenElement !== undefined &&
      document.fullScreenElement === null) ||
    (document.msFullscreenElement !== undefined &&
      document.msFullscreenElement === null) ||
    (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
    (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
  ) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

const Footer = () => {
  const {
    state: { cash, betsData, winAmount },
    setState,
  } = useHook();
  return (
    <footer>
      <div className="actions">
        {/* <span data-btn="menu"> </span>
        <span data-btn="son"> </span>
        <span data-btn="red"> </span> */}
        <span
          data-btn="amp"
          onClick={(e) => {
            toggleFullScreen(document.body);
            if (e.target.getAttribute("data-btn") == "amp") {
              e.target.setAttribute("data-btn", "amp-large");
            } else {
              e.target.setAttribute("data-btn", "amp");
            }
          }}
        >
          {" "}
        </span>
      </div>
      <div className="balance">
        BALANCE <span className="footer-info">${cash}</span>
      </div>
      <div className="total">
        TOTAL BET{" "}
        <span className="footer-info">
          {betsData.reduce((total, one) => total + one[2], 0)}
        </span>
      </div>
      <div className="win">
        WIN <span className="footer-info">${winAmount}</span>
      </div>
      <div style={{ paddingRight: "10px", fontSize: "12px" }}>
        American Roulette
      </div>
    </footer>
  );
};
export default Footer;
