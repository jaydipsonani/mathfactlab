import React from "react";
import { useSelector } from "react-redux";
import { Tabs, Typography } from "antd";
import Section from "components/common/Section";
import Container from "components/common/Container";
import "assets/sass/components/dashboard.scss";

const { Title } = Typography;
const { TabPane } = Tabs;

const TeacherSummary = ({ selectedTab, onChangeSwitch }) => {
  const {
    userDetails: {
      profile: { first_name, last_name }
    }
  } = useSelector(({ auth }) => auth);

  const today = new Date();
  const curHr = today.getHours();
  let greetingText;
  if (curHr < 12) {
    greetingText = "Good morning";
  } else if (curHr < 17) {
    greetingText = "Good afternoon";
  } else if (curHr < 21) {
    greetingText = "Good evening";
  } else {
    greetingText = "Good night";
  }
  return (
    <Container fluid>
      <Section>
        <div className="dashboard-page">
          <Title level={4} className={"subtitle-heading"}>
            Hi, {first_name} {last_name}
          </Title>
          <Title level={3} style={{ marginTop: "10px" }}>
            {greetingText}!
          </Title>
          <Tabs
            defaultActiveKey={selectedTab ? "2" : "1"}
            onChange={key => onChangeSwitch(key)}
            style={{ marginTop: "20px" }}
          >
            <TabPane tab="Summary" key="1">
              Summary
            </TabPane>
            <TabPane tab="Groups" key="2">
              Groups
            </TabPane>
            <TabPane tab="Students" key="3">
              Students
            </TabPane>
            <TabPane tab="Students" key="4">
              Students
            </TabPane>
            <TabPane tab="Activities" key="5">
              Activities
            </TabPane>
            <TabPane tab="Statistics" key="6">
              Statistics
            </TabPane>
            <TabPane tab="My settings" key="7">
              My settings
            </TabPane>
          </Tabs>
        </div>
      </Section>
    </Container>
  );
};

export default TeacherSummary;
