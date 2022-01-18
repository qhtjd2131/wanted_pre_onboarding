
import React from "react";

export const LeftButton = ({ ClickHandler }) => {
  return (
    <div className="button-wrapper button-left">
      <button onClick={ClickHandler}>{"<"}</button>
    </div>
  );
};

export const RightButton = ({ ClickHandler }) => {
  return (
    <div className="button-wrapper button-right">
      <button onClick={ClickHandler}>{">"}</button>
    </div>
  );
};
