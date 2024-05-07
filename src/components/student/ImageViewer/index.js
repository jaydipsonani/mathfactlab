import React from "react";
import Viewer from "react-viewer/dist/index.js";

const ImageViewer = props => {
  const { visible, onClose, imageSrc } = props;

  return <Viewer visible={visible} onClose={onClose} images={[{ src: imageSrc }]} noFooter={true} zIndex={10000000} />;
};

export default ImageViewer;
