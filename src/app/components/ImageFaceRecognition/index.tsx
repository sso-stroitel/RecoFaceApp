import * as React from "react";
let style = require("./style.scss");

// React.SFC<{imageURL: any, box: any}>
interface IProps {
  topRow: number;
  rightCol: number;
  bottomRow: number;
  leftCol: number;
}

const ImageFaceRecognition = ({ imageURL, boxes }: any) => {
  return (
    <div className={style.container}>
      <div className={style.wrap}>
        <img
          className={style.img}
          id="inputimage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />
        {boxes.map((box: IProps) => {
          return (
            <div
              key={box.topRow}
              className={style.box}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageFaceRecognition;
