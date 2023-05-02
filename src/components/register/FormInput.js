import { useState } from "react";
import "./formInput.css";
import Form from "react-bootstrap/Form";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="">
    <Form>
      <Form.Label id="formLabel">{label}</Form.Label>
      <Form.Control
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        action="POST"
      />
      <span>{errorMessage}</span>
    </Form>
    </div>
  );
};

export default FormInput;