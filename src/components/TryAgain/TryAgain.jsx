import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import '../TryAgain/TryAgain.css'


const TryAgain = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handlePopupClick = (e) => {
    if (!popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = (e) => {
    setShowPopup(true);
  };

  const saveRefresh = () => {
    window.location.reload(false);
    saveAttempt();
  };
 


  const saveAttempt = () => {
    let attempts = JSON.parse(localStorage.getItem("attempts")) || [];
    let curDate = new Date();
    let dateToString = curDate.toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      second: "2-digit",
    });

    attempts.push({
      score: props.value,
      total: props.total,
      time: dateToString,
    });

    attempts.sort((a, b) => {
      return a.score > b.score
        ? -1
        : a.score === b.score
        ? a.time > b.time
          ? -1
          : 1
        : 1;
    });

    localStorage.setItem("attempts", JSON.stringify(attempts));
  };


  return (
    <div className="buttons-wrapper">
      <div className="history-btn">
      <div>
        <button onClick={openPopup}>Try Again</button>
      </div>
      <Link to="/history" className="btn-link">
        <button onClick={saveAttempt}>
          HISTORY
        </button>
      </Link>
      </div>
      {showPopup && (
        <div
          style={{
            visibility: showPopup ? "visible" : "hidden",
            opacity: showPopup ? "1" : "0",
          }}
          className="overlay"
          onClick={handlePopupClick}
        >
          <div className="popup" ref={popupRef}>
          <h4>Do you want to save this attempt?</h4>

          <span className="close" onClick={closePopup}>
              &#x2717;
            </span>

            <div className="buttons-wrapper popup-buttons">
              <Link to="/" className="btn-link">
                <button onClick={saveRefresh}>Yes</button>
              </Link>

            <Link to="/" className="btn-link">
                <button className="btn-history">No</button>
              </Link>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TryAgain;