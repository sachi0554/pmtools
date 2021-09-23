import * as React from "react";
import { AbstractControl } from "react-reactive-form";

// React SFC to render Input element
const TextInput = ({
  handler,
  meta: { label, placeholder }
}: AbstractControl) => (
  <div>
    <label className="form-control-label">{label}:</label>
    <input className="form-control form-control" placeholder={placeholder}  {...handler()} />
  </div>
);

export default TextInput;
