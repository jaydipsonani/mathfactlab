import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  tick() {
    const { onEverySecondChanged } = this.props;

    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
    onEverySecondChanged(this.state.seconds);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { questionKey, rightAnswerTime } = this.props;
    // style={{ visibility: "hidden" }}

    return (
      <div key={questionKey}>
        {process.env.REACT_APP_ENV === "development" ||
        process.env.REACT_APP_ENV === "staging" ||
        sessionStorage.getItem("is_show_score") === "true" ? (
          <>
            <span
              style={{
                zIndex: "100",
                color: "black",
                position: "absolute",
                left: "10px"
              }}
            >
              Time Duration: <b> {this.state.seconds}</b> Available Time : <b> {rightAnswerTime && rightAnswerTime}</b>
            </span>

            <span
              style={{
                zIndex: "100",
                color: "black",
                position: "absolute",
                top: "30px",
                left: "10px"
              }}
            >
              {process.env.REACT_APP_ENV === "development" ? `Question index -  ${questionKey}` : ""}
            </span>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
