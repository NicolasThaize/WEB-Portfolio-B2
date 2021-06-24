import React from "react";
import { UserContext } from "../../context";
import "../../assets/css/modal.min.css";
import { Editor } from "@tinymce/tinymce-react";
import TextInput from "./TextInput";
import RadioTrueFalseInput from "./RadioTrueFalseInput";
import MultipleSelectInput from "./MultipleSelectInput";

class ShowModal extends React.Component {
  static contextType = UserContext;

  state = {
    selected: this.props.selected,
    fields: this.props.fields,
    values: {},
    multiSelectValues: this.props.multiSelectValues,
    errors: this.props.errors,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors === undefined) {
      return (state.errors = "");
    }
    return (state.errors = props.errors);
  }

  // Props explanation:
  // Full example of usage:
  // <ShowModal
  //       selected={article}
  //       fields={[
  //       {
  //         "name":  "id",
  //         "label":  "ID: "
  //       },
  //       {
  //         "name":  "title",
  //         "label":  "Title: "
  //       },
  //       {
  //         "name":  "author",
  //         "label":  "Author: "
  //       }
  //     ]}
  //     toggle={this.toggleModal}
  //     multiSelectValues={[
  //        {
  //          "id": 1,
  //          "remains": "blabla"
  //        },
  //        {
  //          "id": 2,
  //          "remains": "blabla"
  //        },
  //     ]}
  // />

  handleEditorChange = (e, name) => {
    let value = e.target.getContent();
    let newInputs = this.state.selected;
    newInputs[name] = value;
    this.setState({ values: newInputs, selected: newInputs });
  };

  /**
   * Once a option is selected or not add or remove the value from selectedChallenges array
   * @param e
   */
  handleSelectChange = (e) => {
    let selected = [];
    for (const option of e.target.options) {
      if (option.selected) {
        selected.push({ id: parseInt(option.value) });
      }
    }
    let newInputs = this.state.selected;
    newInputs[e.target.name] = selected;
    this.setState({ values: newInputs, selected: newInputs });
  };

  handleChange = (e) => {
    let value = e.target.value;

    // is_public needs to be a boolean
    if (e.target.name === "is_public") {
      value = e.target.value === "true";
    }
    let newInputs = this.state.selected;
    newInputs[e.target.name] = value;
    this.setState({ values: newInputs, selected: newInputs });
  };

  render() {
    const { selected, fields, multiSelectValues, errors } = this.state;
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.toggle}>
            &times;
          </span>
          <div>
            {fields.map((field) => {
              if (field.type === "editor") {
                return (
                  <div key={field.name}>
                    <Editor
                      initialValue={selected[field.name]}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image",
                          "charmap print preview anchor help",
                          "searchreplace visualblocks code",
                          "insertdatetime media table paste wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic |" +
                          "alignleft aligncenter alignright | " +
                          "bullist numlist outdent indent | help",
                      }}
                      onBlur={(e) => this.handleEditorChange(e, field.name)}
                    />
                  </div>
                );
              }
              if (field.type === "text") {
                return (
                  <div key={field.name}>
                    <TextInput
                      label={field.label}
                      name={field.name}
                      value={selected[field.name]}
                      handleChange={this.handleChange}
                    />
                  </div>
                );
              }

              if (field.type === "radio") {
                return (
                  <div key={field.name}>
                    <RadioTrueFalseInput
                      label={field.label}
                      name={field.name}
                      value={selected[field.name]}
                      handleChange={this.handleChange}
                    />
                  </div>
                );
              }

              if (field.type === "categories") {
                return (
                  <div key={field.name}>
                    <MultipleSelectInput
                      label={field.label}
                      name={field.name}
                      value={selected[field.name]}
                      handleChange={this.handleSelectChange}
                      values={multiSelectValues}
                    />
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label>
                    <strong>{field.label}</strong>
                    <input
                      value={selected[field.name].toString()}
                      type={field.type}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          {errors ? <p className="basicError">{errors}</p> : undefined}
          <button
            type="button"
            onClick={() => this.props.returnToParent(selected)}
          >
            tete
          </button>
        </div>
      </div>
    );
  }
}

export default ShowModal;
