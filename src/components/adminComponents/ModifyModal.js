import React from "react";
import { UserContext } from "../../context";
import "../../assets/css/modal.min.css";
import { Editor } from "@tinymce/tinymce-react";
import TextInput from "./TextInput";
import RadioTrueFalseInput from "./RadioTrueFalseInput";
import MultipleSelectInput from "./MultipleSelectInput";
import ImageService from "../../ImageService";
import tinymce from "tinymce/tinymce";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

// importing the plugin js.
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/lists";
import "tinymce/plugins/charmap";
import "tinymce/plugins/hr";
import "tinymce/plugins/anchor";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/help";

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
                        file_picker_types: "image",
                        image_title: true,
                        convert_urls: false,
                        images_upload_url: "http://127.0.0.1:8000/images/",
                        images_upload_credentials: true,
                        file_picker_callback: handleFilePick,
                        images_upload_handler: handleFileUpload,
                        plugins: [
                          "advlist autolink lists link image",
                          "charmap print preview anchor help",
                          "searchreplace visualblocks code",
                          "insertdatetime media table paste wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic |" +
                          "alignleft aligncenter alignright | " +
                          "bullist numlist outdent indent | link image | help",
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

function handleFilePick(cb, value, meta) {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.onchange = function () {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      let id = "blobid" + new Date().getTime();
      let blobCache = tinymce.activeEditor.editorUpload.blobCache;
      let base64 = reader.result.split(",")[1];
      let blobInfo = blobCache.create(id, file, base64);
      blobCache.add(blobInfo);
      cb(blobInfo.blobUri(), { title: file.name });
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function handleFileUpload(blobInfo, success, failure, progress) {
  let formData = new FormData();
  formData.append("image", blobInfo.blob());
  ImageService.uploadImage(formData, "tyest", "wila")
    .then((r) => {
      success(r.image);
    })
    .catch((err) => {
      console.log(err);
    });
}
