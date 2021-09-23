import * as React from "react";
import { AbstractControl } from "react-reactive-form";

const TextArea = ({ handler , meta: { label, placeholder } }: AbstractControl) => (
  <div>
    <div>
      <label className="form-control-label">{label}:</label>
    </div>
    <div >
      <textarea className="form-control" {...handler()} />
    </div>
  </div>
);

export default TextArea;
