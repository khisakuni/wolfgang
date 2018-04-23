import React, { Component } from "react";
import { Provider } from "react-redux";
import _ from "lodash";
import configureStore from "../store";
import Rendering from "./components/Rendering";

const store =
  process.env.NODE_ENV === "development"
    ? configureStore(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : configureStore();

class Score extends Component {
  constructor(props) {
    super(props);

    this.sheetComponents = this.sheetComponents.bind(this);
    this.renderSheets = this.renderSheets.bind(this);
    this.sheetIds = React.Children.map(this.sheetComponents(), () =>
      _.uniqueId("sheet_")
    );
  }

  sheetComponents() {
    return this.props.children;
  }

  renderSheets() {
    return React.Children.map(this.sheetComponents(), (sheetComponent, i) => {
      return React.cloneElement(sheetComponent, { id: this.sheetIds[i] });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Rendering>{this.renderSheets()}</Rendering>
      </Provider>
    );
  }
}

export default Score;
