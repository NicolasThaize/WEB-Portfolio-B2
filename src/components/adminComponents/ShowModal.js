import React from "react";
import {UserContext} from "../../context";
import "../../assets/css/modal.min.css";

class ShowModal extends React.Component{
  static contextType = UserContext;

  state = {
    selected: this.props.selected,
    fields: this.props.fields
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

  render() {
    const { selected, fields } = this.state;
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.props.toggle}>&times;</span>
          <div>
            {fields.map(field => (
              <div key={field.name}>
                <p><strong>{field.label}</strong>{selected[field.name].toString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowModal;
