import React, { Component } from "react";

class CellChange extends Component {
  render() {
    const { change } = this.props;

    if (Number(change) >= 0) {
      return <b style={{ color: "#009933" }}>{change}%</b>;
    } else {
      return <b style={{ color: "#ff0000" }}>{change}%</b>;
    }
  }
}

export { CellChange };
