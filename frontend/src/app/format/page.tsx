"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { FaRocket } from 'react-icons/fa';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HiPencilAlt } from "react-icons/hi";
import { BiLandscape } from "react-icons/bi";
import { MdOutlinePortrait } from "react-icons/md";
import Image from 'next/image';

export default function FormatPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  // Separate states for Landscape and Portrait templates
  const [selectedLandscapeTemplate, setSelectedLandscapeTemplate] = useState('');
  const [selectedPortraitTemplate, setSelectedPortraitTemplate] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('Landscape'); // Default option

  const handleTemplateSelect = (template: string, orientation: string) => {
    if (orientation === 'landscape') {
      setSelectedLandscapeTemplate(template);
    } else if (orientation === 'portrait') {
      setSelectedPortraitTemplate(template);
    }
  };

  const handleOrientationChange = (option: string) => {
    setSelectedOrientation(option);
  };
  
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.page}>
      <header className={styles.headerBar}>
        <Link href="/" className={styles.headerContent}>
          SpacePad
          <FaRocket className={styles.rocketIcon} />
        </Link>
      </header>

      <div className={styles.h2}>Choose Page Format</div>

      {/* Accordions for Landscape, Portrait, and Customize */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={styles.customTypography}>Landscape Templates <BiLandscape className={styles.landscapeIcon}/></Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Landscape Templates form */}
          <div className={styles.templateOptions}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.templateOption}>
                <label htmlFor={`landscape-template${item}`} className={styles.imageLabel}>
                  <input
                    type="radio"
                    id={`landscape-template${item}`}
                    name="landscapeTemplate"
                    value={`Landscape Template ${item}`}
                    checked={selectedLandscapeTemplate === `Landscape Template ${item}`}
                    onChange={() => handleTemplateSelect(`Landscape Template ${item}`, 'landscape')}
                  />
                  {/* Image component used for displaying template image */}
                  <Image
                    src={`/templates/landscape-${item}.jpg`}  
                    alt={`Landscape Template ${item}`}
                    width={100}
                    height={100}
                    className={selectedLandscapeTemplate === `Landscape Template ${item}` ? styles.selectedImage : styles.templateImage}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {/* Preview Button */}
            <button
              type="button"
              className={styles.previewButton}
              onClick={() => alert('Previewing...')}
            >
              Preview
            </button>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={styles.customTypography}>Portrait Templates <MdOutlinePortrait className={styles.portraitPersonIcon} /></Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Portrait Templates form */}
          <div className={styles.templateOptions}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.templateOption}>
                <label htmlFor={`portrait-template${item}`} className={styles.imageLabel}>
                  <input
                    type="radio"
                    id={`portrait-template${item}`}
                    name="portraitTemplate"
                    value={`Portrait Template ${item}`}
                    checked={selectedPortraitTemplate === `Portrait Template ${item}`}
                    onChange={() => handleTemplateSelect(`Portrait Template ${item}`, 'portrait')}
                  />
                  <Image
                    src={`/templates/portrait-${item}.jpg`}  
                    alt={`Portrait Template ${item}`}
                    width={100}
                    height={100}
                    className={selectedPortraitTemplate === `Portrait Template ${item}` ? styles.selectedImage : styles.templateImage}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {/* Preview Button */}
            <button
              type="button"
              className={styles.previewButton}
              onClick={() => alert('Previewing...')}
            >
              Preview
            </button>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography className={styles.customTypography}>Customize <HiPencilAlt className={styles.pencilIcon} /></Typography>
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
                  checked={selectedOrientation === 'Landscape'}
                  onChange={() => handleOrientationChange('Landscape')}
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
                  checked={selectedOrientation === 'Portrait'}
                  onChange={() => handleOrientationChange('Portrait')}
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
            {/* Preview Button */}
            <button
              type="button"
              className={styles.previewButton}
              onClick={() => alert('Continuing...')}
            >
              Continue
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
