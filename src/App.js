import React from "react";
import { ConfigProvider } from "antd";
import RouteList from "components/common/RouteList";

const customizeTheme = {
  fontFamily: "Lato, sans-serif",
  colorPrimary: "#2dca89",
  layoutBodyBackground: "#f5f6fa",
  layoutSiderBackground: "#fff",
  layoutHeaderBackground: "transparent",
  layoutHeaderHeight: "55px",
  layoutHeaderPadding: "0",
  colorHeading: "#2d405a",
  textColorSecondary: "#79828d",
  borderRadiusBase: "8px",
  borderColorBase: "#dde1e5",
  borderColorSplit: "#e8eff6",
  heightLg: "52px",
  heightBase: "40px",
  heightSm: "35px",
  selectSingleItemHeightLg: "52px",
  btnFontWeight: "600",
  btnPaddingHorizontalBase: "20px",
  btnPaddingHorizontalLg: "35px",
  btnPaddingHorizontalSm: "15px",
  inputPaddingHorizontal: "20px",
  checkboxSize: "20px",
  typographyTitleFontWeight: "bold",
  badgeHeight: "14px",
  badgeDotSize: "7px",

  Button: {
    fontWeight: 600
  },
  colorSecondary: "#2dca89",
  boxShadowBase: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  fontSizeBase: "14px",
  lineHeightBase: "1.5",
  inputBorderRadius: "4px",
  modalWidth: "400px",
  modalHeaderHeight: "50px",
  modalFooterHeight: "50px",
  modalContentPadding: "20px",
  modalMaskBg: "fade(#142550, 85%)",
  badgeTextColor: "#fff",
  badgeBorderRadius: "50%",
  selectBorderColor: "#ddd",
  selectBorderRadius: "4px",
  radioDotColor: "#2dca89",
  radioSize: "18px",
  checkboxCheckedColor: "#2dca89",
  checkboxBorderRadius: "4px"
};

const App = () => {
  return (
    <ConfigProvider theme={{ token: customizeTheme }}>
      <RouteList />
    </ConfigProvider>
  );
};

export default App;
