import React from "react";
import { CSSProperties } from "react";
import { Rnd } from "react-rnd";


interface BaseTemplatePageProps {
  orientation: "portrait" | "landscape";
  children?: React.ReactNode;
}

const BaseTemplatePage: React.FC<BaseTemplatePageProps> = ({ orientation, children }) => {

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
      {children && (
        <Rnd
          default={{
            x: 50,
            y: 50,
            width: 300,
            height: 400,
          }}
          minWidth={100}
          minHeight={100}
          bounds="parent"
          style={{
            border: "1px solid #000",
            backgroundColor: "lightgray",
          }}
        >
          {children}
        </Rnd>
      )}
    </div>
  );
};

export default BaseTemplatePage;
