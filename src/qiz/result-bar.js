import React from "react";

export default function ResultBar(props) {
  return (
    <div
      style={{
        height: "30px",
        width: "100%",
        position: "absolute",
        bottom: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        display: "inline-flex",
      }}
    >
      <div
        style={{
          height: "30px",
          width: props.lowestPossible + "vw",
          backgroundColor: "black",
        }}
      ></div>
      <div
        style={{
          height: "30px",
          width: (props.currentScore - props.lowestPossible) + "vw",
          backgroundColor: "#717171",
        }}
      ></div>
      <div
        style={{
          height: "30px",
          width:
            props.maxPossible -
            (props.currentScore - props.lowestPossible) +
            "vw",
          backgroundColor: "#A0A0A0",
        }}
      ></div>
    </div>
  );
}
