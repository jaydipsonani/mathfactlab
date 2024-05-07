import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  tick() {
    const { duration, timeoutFn, onEverySecondChanged } = this.props;
    if (this.state.seconds === duration) {
      timeoutFn();
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
      onEverySecondChanged(this.state.seconds);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { duration } = this.props;
    let timeLeft = duration - this.state.seconds;
    // style={{ visibility: "hidden" }}
    return this.props.showQuestionTimer ? (
      <span style={{ zIndex: "100", color: "black", position: "absolute" }}>
        {this.props.currentQuestionIndex} Time Left: {timeLeft}
      </span>
    ) : (
      ""
    );
  }
}
