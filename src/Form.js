import React from "react";

class Form extends React.Component {
  render() {
    const { values, onEmailChange, errors, isDisabled } = this.props;
    return (
      <div>
        <input
          name="email"
          autoComplete="off"
          type="email"
          value={values.email || ""}
          required={true}
          onChange={e =>
            onEmailChange(e, [
              {
                noSpecialChars: true,
                minLength: 5
              }
            ])
          }
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <div>
          <button disabled={isDisabled()}>Submit</button>
        </div>
      </div>
    );
  }
}
export default Form;
