import * as React from "react";
let style = require("./style.scss");

const Header: React.SFC = () => {
  return (
    <header className={style.header}>
      <h1 className={style.heading}>RecoFace</h1>
    </header>
  );
};

export default Header;
