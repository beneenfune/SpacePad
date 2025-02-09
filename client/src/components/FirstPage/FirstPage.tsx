import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import styles from "./FirstPage.module.css"; // Assuming you have CSS for styling

interface FirstPageProps {
  pageSize?: { width: number; height: number };
  setImagePosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setImageSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
}

const FirstPage: React.FC<FirstPageProps> = ({
  pageSize,
  setImagePosition,
  setImageSize,
}) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [imgPath, setImgPath] = useState("/images/lecture-template.jpg");

  // State to handle position and size of the component
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  const loadImage = (src: string) => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = src;
  };

  useEffect(() => {
    loadImage(imgPath);
  }, [imgPath]);

  const aspectRatio = imageDimensions.width / imageDimensions.height;

  const scaledWidth = (pageSize?.width ?? 0) * (2 / 3);
  const scaledHeight = scaledWidth / aspectRatio;

  const minWidth = (pageSize?.width ?? 0) * (1 / 3);
  const minHeight = minWidth / aspectRatio;

  const finalWidth =
    scaledHeight <= (pageSize?.height ?? 0)
      ? scaledWidth
      : (pageSize?.height ?? 0) * aspectRatio;
  const finalHeight = finalWidth / aspectRatio;

  const initialX = ((pageSize?.width ?? 0) - finalWidth) / 2;
  const initialY = ((pageSize?.height ?? 0) - finalHeight) / 2;

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
    setSize({ width: finalWidth, height: finalHeight });

    // Update position and size when they change
    setImagePosition({ x: initialX, y: initialY });
    setImageSize({ width: finalWidth, height: finalHeight });
  }, [pageSize, initialX, initialY, finalWidth, finalHeight]);

  return (
    <div className={styles.pageContainer}>
      <Rnd
        position={position}
        onDragStop={(e, data) => {
          setPosition({ x: data.x, y: data.y });
          setImagePosition({ x: data.x, y: data.y });
        }}
        size={size}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
          setPosition(position);
          setImageSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        }}
        minWidth={minWidth}
        minHeight={minHeight}
        bounds="parent"
        lockAspectRatio={true}
        enableResizing={{
          bottomRight: true,
          topRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        background="transparent"
        disableDragging={false}
        resizeHandleStyles={{
          bottomRight: {
            background: "#6495ED",
            width: "10px",
            height: "10px",
            cursor: "se-resize", // South-East resize cursor
          },
          bottomLeft: {
            background: "#6495ED",
            width: "10px",
            height: "10px",
            cursor: "sw-resize", // South-West resize cursor
          },
          topRight: {
            background: "#6495ED",
            width: "10px",
            height: "10px",
            cursor: "ne-resize", // North-East resize cursor
          },
          topLeft: {
            background: "#6495ED",
            width: "10px",
            height: "10px",
            cursor: "nw-resize", // North-West resize cursor
          },
        }}
        style={{
          border: "2px solid #6495ED",
        }}
      >
        <div className={styles.pdfContent}>
          <img
            src={imgPath}
            alt="Draggable image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        </div>
      </Rnd>
    </div>
  );
};

export default FirstPage;
