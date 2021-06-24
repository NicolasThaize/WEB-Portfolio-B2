import ModifyModal from "./ModifyModal";

class CreateModal extends ModifyModal {
  state = {
    selected: {},
    fields: this.props.fields,
    values: {},
    multiSelectValues: this.props.multiSelectValues,
  };
}

export default CreateModal;
