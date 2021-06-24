import React from "react";

class MultipleSelectInput extends React.Component {
  state = {
    label: this.props.label,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.handleChange,
    multiSelectValues: this.props.values,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value === undefined) {
      return (state.value = "");
    }
    return (state.value = props.value);
  }

  render() {
    const { label, name, value, onChange, multiSelectValues } = this.state;
    let ids = [];
    if (value !== undefined) {
      for (const id of value) {
        ids.push(id.id);
      }
    }
    return (
      <div>
        <label>
          {label}
          <select
            name={name}
            id={name}
            value={ids}
            onChange={onChange}
            multiple
          >
            {multiSelectValues.map((select) => (
              <option value={select.id} key={select.id}>
                {select.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default MultipleSelectInput;
