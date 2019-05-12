import React from "react";
import ReactDOM from "react-dom";
import ValidatorProvider, { Validator } from "./context";
import "./styles.css";
import Form from "./Form";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        Form validation
        <br />
        <ValidatorProvider>
          <Validator.Consumer>
            {({ errors, values, onEmailChange, isDisabled }) => (
              <Form
                onEmailChange={onEmailChange}
                errors={errors}
                values={values}
                isDisabled={isDisabled}
              />
            )}
          </Validator.Consumer>
        </ValidatorProvider>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
