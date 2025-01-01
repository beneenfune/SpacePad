"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HiPencilAlt } from "react-icons/hi";
import { BiLandscape } from "react-icons/bi";
import { MdOutlinePortrait } from "react-icons/md";
import HeaderBar from "@/components/HeaderBar/HeaderBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PreviewButton from "@/components/PreviewButton/PreviewButton";
import BackButton from "@/components/BackButton/BackButton";
import {
  PageFormat,
  usePageFormatContext,
} from "../../context/PageFormatContext";

export default function FormatPage() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const router = useRouter();

  // Access context
  const { format, setFormat } = usePageFormatContext(); // Added context here
  const [selectedOrientation, setSelectedOrientation] =
    useState<PageFormat>("landscape"); // Default to landscape
  const [selectedLandscapeTemplate, setSelectedLandscapeTemplate] = useState<
    string | null
  >(null);
  const [selectedPortraitTemplate, setSelectedPortraitTemplate] = useState<
    string | null
  >(null);

  const handleOrientationChange = (option: PageFormat) => {
    setSelectedOrientation(option);
    setFormat(option); // Update context when user selects orientation
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleContinue = () => {
    // Passing the selectedOrientation as a query parameter
    router.push(
      `/customize?orientation=${selectedOrientation}&template=${selectedLandscapeTemplate}`
    );
  };

  const handleTemplateSelect = (template: string, orientation: string) => {
    if (orientation === "landscape") {
      setSelectedLandscapeTemplate(template);
    } else {
      setSelectedPortraitTemplate(template);
    }
  };

  // Function to handle preview button click
  const handlePreview = () => {
    alert(`Previewing ${selectedLandscapeTemplate || "none"} template...`); // Action to perform on preview
  };

  return (
    <div className={styles.page}>
      <HeaderBar />
      <div className={styles.headerContainer}>
        <BackButton />
        <div className={styles.h2}>Choose Page Format</div>
      </div>
      <div className={styles.main}>
        {/* Accordion for Landscape */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={styles.dropdownHeader}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2 className={styles.customTypography}>
              Landscape templates{" "}
              <BiLandscape className={styles.landscapeIcon} />
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            {/* Landscape Templates form */}
            <div className={styles.templateOptions}>
              {["center", "left", "right"].map((item) => (
                <div key={item} className={styles.templateOption}>
                  <label
                    htmlFor={`landscape-template-${item}`}
                    className={styles.imageLabel}
                  >
                    <input
                      type="radio"
                      id={`landscape-template-${item}`}
                      name="landscapeTemplate"
                      value={`Landscape Template ${item}`}
                      checked={selectedLandscapeTemplate === item}
                      onChange={() => handleTemplateSelect(item, "landscape")}
                    />
                    {/* Image component used for displaying template image */}
                    <Image
                      src={`/templates/landscape-${item}.jpg`}
                      alt={`Landscape Template ${item}`}
                      width={100}
                      height={100}
                      className={
                        selectedLandscapeTemplate === item
                          ? styles.selectedImage
                          : styles.templateImage
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.buttonContainer}>
              <PreviewButton onPreview={handlePreview} />
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Accordion for Portrait */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className={styles.dropdownHeader}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h2 className={styles.customTypography}>
              Portrait templates{" "}
              <MdOutlinePortrait className={styles.portraitPersonIcon} />
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            {/* Portrait Templates form */}
            <div className={styles.templateOptions}>
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.templateOption}>
                  <label
                    htmlFor={`portrait-template${item}`}
                    className={styles.imageLabel}
                  >
                    <input
                      type="radio"
                      id={`portrait-template${item}`}
                      name="portraitTemplate"
                      value={`Portrait Template ${item}`}
                      checked={
                        selectedPortraitTemplate === `Portrait Template ${item}`
                      }
                      onChange={() =>
                        handleTemplateSelect(
                          `Portrait Template ${item}`,
                          "portrait"
                        )
                      }
                    />
                    <Image
                      src={`/templates/portrait-${item}.jpg`}
                      alt={`Portrait Template ${item}`}
                      width={100}
                      height={100}
                      className={
                        selectedPortraitTemplate === `Portrait Template ${item}`
                          ? styles.selectedImage
                          : styles.templateImage
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.buttonContainer}>
              <PreviewButton onPreview={handlePreview} />
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Accordions for Customize */}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className={styles.dropdownHeader}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <h2 className={styles.customTypography}>
              Customize template tool{" "}
              <HiPencilAlt className={styles.pencilIcon} />
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.h3}>Choose Page Orientation</div>
            <div className={styles.orientationOptions}>
              <div className={styles.orientationOption}>
                <label htmlFor="landscape" className={styles.imageLabel}>
                  <input
                    type="radio"
                    id="landscape"
                    name="orientation"
                    value="Landscape"
                    checked={selectedOrientation === "landscape"}
                    onChange={() => handleOrientationChange("landscape")}
                  />
                  <span className={styles.orientationText}>Landscape</span>
                  <Image
                    src="/icons/landscape.png"
                    alt="Landscape Icon"
                    width={40}
                    height={40}
                    className={styles.icon}
                  />
                </label>
              </div>
              <div className={styles.orientationOption}>
                <label htmlFor="portrait" className={styles.imageLabel}>
                  <input
                    type="radio"
                    id="portrait"
                    name="orientation"
                    value="Portrait"
                    checked={selectedOrientation === "portrait"}
                    onChange={() => handleOrientationChange("portrait")}
                  />
                  <span className={styles.orientationText}>Portrait</span>
                  <Image
                    src="/icons/portrait.png"
                    alt="Portrait Icon"
                    width={25}
                    height={36}
                    className={styles.portraitIcon}
                  />
                </label>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              {/* Continue Button */}
              <button
                type="button"
                className={styles.previewButton}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
