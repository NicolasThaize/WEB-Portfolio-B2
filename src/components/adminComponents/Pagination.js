import React from "react";
import { UserContext } from "../../context";
import CrudButtons from "./CrudButtons";

class Pagination extends React.Component {
  static contextType = UserContext;

  // Props explanation:
  // fields: The fields that will be showned (by object key, ex: {['id','title','author']})
  // array: The array that will be processed into pagination (ex: [{},{},{}])
  // crud: The array that will be processed to know which crud button needs to be rendered and what it does when pressed
  // (if method specified: button exists, ex: {{show: this.showFunc, modify: this.mofifyFunc, delete: this.deleteFunc}})
  // Full example of usage:
  // <Pagination
  //       array={articles}
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
  //     crud={{show: this.showFunc}}
  // />

  state = {
    objects: this.props.array,
    numberOfPages: 0,
    currentPage: 1,
    shownObjects: [],
    fields: this.props.fields,
  };

  static getDerivedStateFromProps(props, state) {
    state.objects = props.array;
    return (state.fields = props.fields);
  }

  /**
   * To update objects if data is reloaded in parent component
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.array !== this.state.objects) {
      let current = [],
        maxIndex = 5;
      if (this.state.objects.length < 5) {
        // To avoid undefined index
        maxIndex = this.state.objects.length;
      }
      for (let index = 0; index < maxIndex; index++) {
        current.push(this.state.objects[index]);
      }
      this.setState({
        shownObjects: current,
        numberOfPages: Math.ceil(this.state.objects.length / 5),
      });
    }
  }

  componentDidMount() {
    let current = [],
      maxIndex = 5;
    if (this.state.objects.length < 5) {
      // To avoid undefined index
      maxIndex = this.state.objects.length;
    }
    for (let index = 0; index < maxIndex; index++) {
      current.push(this.state.objects[index]);
    }

    this.setState({
      shownObjects: current,
      numberOfPages: Math.ceil(this.state.objects.length / 5),
    });
  }

  setArticlePages = (page = 1) => {
    let current = [],
      maxIndex = page * 5;
    if (this.state.objects[page * 5] === undefined) {
      maxIndex = this.state.objects.length;
    }
    let index = page * 5 - 5;
    for (index; index < maxIndex; index++) {
      current.push(this.state.objects[index]);
    }
    if (this.state.objects.length <= 5) {
      current = this.state.objects;
    }
    this.setState({ shownObjects: current });
  };

  render() {
    const { shownObjects, fields, numberOfPages } = this.state;
    const pages = new Array(numberOfPages).fill(0);
    return (
      <div>
        {shownObjects.map((object) => (
          <div key={object.id}>
            {fields.map((field) => (
              <p key={object.id + field.name}>
                {field.label}
                {object[field.name]}
              </p>
            ))}
            <CrudButtons
              showFunc={
                this.props.crud.show
                  ? () => this.props.crud.show(object)
                  : undefined
              }
              modifyFunc={
                this.props.crud.modify
                  ? () => this.props.crud.modify(object)
                  : undefined
              }
              deleteFunc={
                this.props.crud.delete
                  ? () => this.props.crud.delete(object)
                  : undefined
              }
            />
          </div>
        ))}

        {pages.map((page, index) => (
          <button key={index} onClick={() => this.setArticlePages(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    );
  }
}

export default Pagination;
