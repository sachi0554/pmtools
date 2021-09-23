import * as React from "react";
import { AbstractControl } from "react-reactive-form";

const Checkbox = ({ handler }: AbstractControl) => (
  <div>
    <input {...handler("checkbox")} />
    <label>&nbsp;&nbsp;I agree to the terms and condition.</label>
  </div>
);

export default Checkbox;
