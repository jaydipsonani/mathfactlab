import React from "react";
import { Row, Col } from "antd";
import TeacherSummary from "./TeacherSummary";

function Dashboard(props) {
  const [selectedTab, setSelectedTab] = React.useState(true);

  const onChangeSwitch = () => {
    setSelectedTab(!selectedTab);
  };

  return (
    <Row>
      <Col xs={24} style={{ marginBottom: "30px" }}>
        <TeacherSummary selectedTab={selectedTab} onChangeSwitch={onChangeSwitch} />
      </Col>
    </Row>
  );
}

export default Dashboard;
