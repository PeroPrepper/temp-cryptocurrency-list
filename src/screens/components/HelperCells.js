import React from "react";

export const CellChange = props => {
  if (Number(props.change) >= 0) {
    return <b style={{ color: "#009933" }}>{props.change}%</b>;
  } else {
    return <b style={{ color: "#ff0000" }}>{props.change}%</b>;
  }
};
