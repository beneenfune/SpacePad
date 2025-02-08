import React from "react";
import { CSSProperties } from "react";

interface BaseTemplatePageProps {
  orientation: "portrait" | "landscape";
}

const BaseTemplatePage: React.FC<BaseTemplatePageProps> = ({ orientation }) => {

    const pageStyle: CSSProperties = {
    width: orientation === "landscape" ? "842px" : "595px", // A4 Landscape or Portrait
    height: orientation === "landscape" ? "595px" : "842px", // A4 Landscape or Portrait
    backgroundColor: "white", // Blank white background
    border: "1px solid #000", // Border to visualize the page
    position: "relative", // Allow future PDF positioning
    overflow: "hidden", // Prevent PDF overflow outside the boundaries
  };

  return (

    <div style={pageStyle}>
      {/* Placeholder for your PDF content */}
      <p style={{ textAlign: "center", paddingTop: "50%" }}>
        Lecture Page 1 here
      </p>
    </div>
  );
};

export default BaseTemplatePage;
