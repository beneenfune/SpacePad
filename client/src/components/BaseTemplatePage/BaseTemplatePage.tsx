import React, { CSSProperties, useRef, useEffect, useState } from "react";
import { Rnd } from "react-rnd";

interface BaseTemplatePageProps {
  orientation: "portrait" | "landscape";
  children?: React.ReactNode;
}

const BaseTemplatePage: React.FC<BaseTemplatePageProps> = ({
  orientation,
  children,
}) => {
  const pageRef = useRef<HTMLDivElement>(null); // Ref to get page dimensions
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (pageRef.current) {
      const { offsetWidth, offsetHeight } = pageRef.current;
      setPageSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [orientation]); // Recalculate when orientation changes

  const pageStyle: CSSProperties = {
    width: orientation === "landscape" ? "842px" : "595px", // A4 Landscape or Portrait
    height: orientation === "landscape" ? "595px" : "842px", // A4 Landscape or Portrait
    backgroundColor: "white",
    border: "1px solid #000",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div ref={pageRef} style={pageStyle}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { pageSize })
          : child
      )}
    </div>
  );
};

export default BaseTemplatePage;
