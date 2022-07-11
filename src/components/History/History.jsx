import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContextMenu from "../ContextMenu/ContextMenu";
import "./History.css";

const History = () => {
  const [attempts, setAttempts] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const attemptItemRef = useRef(null);

  const deleteFromHistory = (id) => {
    let tmp = [...attempts];
    tmp = tmp.filter((_, index) => index !== id);
    setAttempts(tmp);
    localStorage.setItem("attempts", JSON.stringify(tmp));
  };
  const clearSelectedId = () => {
      setDeleteId(null)
  }

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setShowContextMenu(true);
    setDeleteId(index);
    setYAxis(`${e.pageY}px`);
    setXAxis(`${e.pageX}px`);
  };

  const handleSettingContextMenuState = (newContextState) => {
    setShowContextMenu(newContextState);
  };

  useEffect(() => {
    const tmpAttempts = JSON.parse(localStorage.getItem("attempts") || []);
    setAttempts(tmpAttempts);
  }, []);

  return (
    <div className="page">
      <div className="history-table">
        <h2>ATTEMPTS HISTORY</h2>

        <table className="">
          <thead>
            <tr>
              <th>RANK</th>
              <th>SCORE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length > 0 &&
              attempts.map((attempt, index) => (
                <tr className={deleteId===index && 'active'}
                  key={index}
                  onContextMenu={(e) => handleRightClick(e, index)}
                >
                  <th>{index + 1}</th>
                  <td>
                    {attempt.score} / {attempt.total}
                  </td>
                  <td>{attempt.time}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {showContextMenu && (
          <ContextMenu
            locationStyles={{ x: xAxis, y: yAxis }}
            attemptItemRef={attemptItemRef}
            id={deleteId}
            show={showContextMenu}
            showCallback={handleSettingContextMenuState}
            removeItem={deleteFromHistory}
            clearSelectedId={clearSelectedId}
          ></ContextMenu>
        )}
      </div>
      <div className="button-2">
        <Link to="/" className="">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default History;
