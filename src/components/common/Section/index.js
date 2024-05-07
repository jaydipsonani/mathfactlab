import React from "react";
import { Card } from "antd";
import "assets/sass/components/layout-section.scss";

const Section = ({ className, bordered = false, children, footer, ...props }) => {
  return (
    <Card className="section" bordered={bordered} {...props}>
      {children}
      {footer && <div className="footer">{footer}</div>}
    </Card>
  );
};

export default Section;
