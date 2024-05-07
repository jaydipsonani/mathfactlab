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
    const { questionKey } = this.props;
    // style={{ visibility: "hidden" }}
    return (
      <div key={questionKey}>
        {process.env.REACT_APP_ENV === "development" ? (
          <span style={{ zIndex: "100", color: "black", position: "absolute" }}>Time Left: {this.state.seconds}</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}
