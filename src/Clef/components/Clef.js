import React, { Component } from "react";
import models from "../../models";

class Clef extends Component {
  constructor(props) {
    super(props);

    this.clef = new models.Clef();
  }

  componentDidMount() {
    this.clef = new models.Clef({ id: this.clef.id, ...this.props });
    this.props.addClef(this.clef);
  }

  componentWillUnmount() {
    this.props.deleteClef(this.clef);
  }

  render() {
    return <div />;
  }
}

Clef.defaultProps = {
  addClef: () => {},
  deleteClef: () => {}
};

export default Clef;
