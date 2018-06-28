import * as React from "react";
let style = require("./style.scss");

interface IProps {
  onChange: any;
  onSubmit: any;
}
const ImageLinkForm: React.SFC<IProps> = props => {
  return (
    <div className={style.wrap}>
      <div className={style.form}>
        <input
          className={style.input}
          type="text"
          onChange={props.onChange}
          placeholder={"Введите URL изображения"}
        />
        <button className={style.btn} onClick={props.onSubmit}>
          Распознать
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
