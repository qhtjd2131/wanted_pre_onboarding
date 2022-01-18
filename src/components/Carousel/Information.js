import React from "react";

const Information = ({ title, subTitle, isCenter }) => {
    return (
      <div
        className={
          "information-box " + (isCenter ? "information-box-center" : "")
        }
      >
        <div className="info-title">{title}</div>
        <div className="info-subtitle">{subTitle}</div>
        <div className="info-line"></div>
        <div className="info-link">
           {"바로가기 >"}
        </div>
      </div>
    );
  };

  export default Information;