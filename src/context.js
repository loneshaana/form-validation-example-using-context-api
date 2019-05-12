import React from "react";
export const Validator = React.createContext();

const convertArrayToObjects = (arr: Array) => {
  const obj = {};
  arr.forEach((item, index) => {
    const k = Object.keys(item);
    k.forEach(i => {
      obj[i] = item[i];
    });
  });
  return obj;
};

const RuleMapping = (rules, name) => {
  const obj = convertArrayToObjects(rules);
  return {
    [name]: {
      ...obj
    }
  };
};

class ValidatorProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: { email: "" },
      values: { email: "" }
    };
  }

  componentDidMount() {
    this.validateEmail(this.state.values.email, "email", { email: [] });
  }
  onEmailChange = ({ target }, rules) => {
    const { value, name } = target;
    rules = RuleMapping(rules, name);
    const { values } = this.state;
    this.setState({ values: { ...values, email: value } });
    this.validateEmail(value, name, rules);
  };

  validateEmail = (value, name, rules) => {
    const err = {};
    const { errors } = this.state;
    if (value === "") {
      err["email"] = "Email is a required Field";
    } else if (
      rules[name]["minLength"] !== undefined &&
      value.length < rules[name]["minLength"]
    ) {
      err["email"] = "Email length should be " + rules[name]["minLength"];
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      err["email"] = "The Email Address Is Invalid";
    } else {
      err["email"] = "";
    }
    this.setState({ errors: { ...errors, ...err } });
  };

  isDisabled = () => {
    const { values, errors } = this.state;
    let flag = false;
    Object.keys(values).map(key => {
      if (values[key].length === 0 || errors[key].length > 0) {
        flag = true;
      }
    });
    return flag;
  };
  render() {
    return (
      <Validator.Provider
        value={{
          errors: this.state.errors,
          values: this.state.values,
          onEmailChange: this.onEmailChange,
          isDisabled: this.isDisabled
        }}
      >
        {this.props.children}
      </Validator.Provider>
    );
  }
}

export default ValidatorProvider;
