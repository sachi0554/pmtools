import * as React from "react";
import { AbstractControl } from "react-reactive-form";

const SelectBox = ({ handler,  meta: { label, placeholder, values }}: AbstractControl) => (
  <div>
    <label>{label}:</label>
    <select className="form-control"  {...handler()}>
      <option value="" disabled>
        Select  
      </option>
      {values.map((item:any) =>
       <option value={item}>{item}</option>  
      )}
    </select>
  </div>
);
export default SelectBox;
