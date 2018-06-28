import * as React from "react";
import Header from "./Header";
import ImageFaceRecognition from "./ImageFaceRecognition";
import ImageForm from "./ImageForm";
let Clarifai = require("clarifai");
let style = require("./style.scss");

export interface IState {
  input: string;
  imageURL: string;
  boxes: any[];
}
const regEx = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
const app = new Clarifai.App({
  apiKey: "eb0b7b7be9b74f38b6da9b81f2b14b76"
});

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: "",
      imageURL: "",
      boxes: []
    };
  }
  calсFaceLocations = (data: any) => {
    return data.outputs[0].data.regions.map((face: any) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputimage") as HTMLCanvasElement;
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  displayFaceBoxes = (boxes: any[]) => {
    this.setState({ boxes: boxes });
  };
  onChange = (event: any) => {
    this.setState({ input: event.target.value });
  };
  onSubmit = () => {
    if (regEx.test(this.state.input)) {
      this.setState({ imageURL: this.state.input });
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then((response: any) => {
        this.displayFaceBoxes(this.calсFaceLocations(response));
      });
    }
  };
  render() {
    return (
      <div className={style.container}>
        <Header />
        <ImageForm onChange={this.onChange} onSubmit={this.onSubmit} />
        <ImageFaceRecognition imageURL={this.state.imageURL} boxes={this.state.boxes} />
      </div>
    );
  }
}
export default App;
