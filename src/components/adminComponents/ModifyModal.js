import React from "react";
import {UserContext} from "../../context";
import "../../assets/css/modal.min.css";
import {Editor} from "@tinymce/tinymce-react";
import TextInput from "./TextInput";
import RadioTrueFalseInput from "./RadioTrueFalseInput";

class ShowModal extends React.Component{
  static contextType = UserContext;

  state = {
    selected: this.props.selected,
    fields: this.props.fields,
    values: {}
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
  // />


  handleEditorChange = () => {

  }

  handleChange = (e) => {
    let value = e.target.value;

    // is_public needs to be a boolean
    if (e.target.name === 'is_public'){
      value = e.target.value === 'true';
    }

    let newInputs = this.state.selected;
    newInputs[e.target.name] = value
    this.setState({values: newInputs, selected: newInputs});
  }

  render() {
    const { selected, fields } = this.state;
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.toggle}>&times;</span>
          <div>
            {fields.map(field => {
              if (field.type === "editor"){
                return (
                  <div key={field.name}>
                    <Editor
                      initialValue={selected[field.name]}
                      tagName={field.name}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image',
                          'charmap print preview anchor help',
                          'searchreplace visualblocks code',
                          'insertdatetime media table paste wordcount'
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic |' +
                          'alignleft aligncenter alignright | ' +
                          'bullist numlist outdent indent | help'
                      }}
                      onChange={this.handleEditorChange}
                    />
                  </div>
                )
              }
              if (field.type === "text"){
                return (
                  <div key={field.name}>
                    <TextInput label={field.label} name={field.name} value={selected[field.name]} handleChange={this.handleChange}/>
                  </div>
                )
              }

              if (field.type === "radio") {
                return (
                  <div key={field.name}>
                    <RadioTrueFalseInput label={field.label} name={field.name} value={selected[field.name]} handleChange={this.handleChange}/>
                  </div>
                  )
              }

              return (
                <div key={field.name}>
                  <label>
                    <strong>{field.label}</strong>
                    <input value={selected[field.name].toString()} type={field.type} onChange={this.handleChange}/>
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowModal;
