import React from "react";

export const DetailItem = props => {
  return (
    <div>
      <b>{props.title} </b>
      {props.value}
    </div>
  );
};
