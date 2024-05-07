import PropTypes from "prop-types";

const AvgResponseTime = props => {
  const { value } = props;
  return value === 1.0 || value === 0.1 ? `${value}` : `${value}`;
};

AvgResponseTime.propTypes = {
  value: PropTypes.number
};

export default AvgResponseTime;
