import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CloseCircleOutlined } from "@ant-design/icons";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
    if (error && process.env.REACT_APP_SEND_ERROR_TO_API && process.env.REACT_APP_SEND_ERROR_TO_API === "true") {
      const body = {
        error: {
          message: error.toString(),
          componentStack: errorInfo.componentStack
        }
      };
      axios
        .post(`${process.env.REACT_APP_FIREBASE_API_URL}/send-error-email`, body, {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_FIREBASE_API_TOKEN}`
          }
        })
        .then(res => {})
        .catch(error => {
          // console.log("res error",error.response)
        });
    }
    this.setState({
      hasError: true,
      error,
      errorInfo
    });
    console.error("error", error);
    console.error("ErrorBoundary Info", errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-wrapper">
          <CloseCircleOutlined className="errorIcon" />
          <h2>Something went wrong!</h2>
        </div>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
export default ErrorBoundary;
