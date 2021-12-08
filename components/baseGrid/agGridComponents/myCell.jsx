import React from "react";

export default function myCell(props) {
  return (
    <div
      style={{
        color: props.value === 0 ? "black" : props.value > 0 ? "green" : "red",
      }}
    >
      Value: {props.value}
    </div>
  );
}
