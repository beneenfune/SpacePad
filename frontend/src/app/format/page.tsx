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
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

export default function FormatPage() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleOrientationSelect = (orientation: string) => {
    setSelectedOrientation(orientation);
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
          <Typography>Landscape Orientation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Landscape Templates form */}
          <form>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className={styles.radioContainer}>
                <input
                  type="radio"
                  id={`template${item}`}
                  name="template"
                  value={`Template ${item}`}
                  checked={selectedTemplate === `Template ${item}`}
                  onChange={() => handleTemplateSelect(`Template ${item}`)}
                />
                <label htmlFor={`template${item}`}>Template {item}</label>
              </div>
            ))}
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Portrait Orientation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Portrait Templates */}
          <form>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className={styles.radioContainer}>
                <input
                  type="radio"
                  id={`template${item}`}
                  name="template"
                  value={`Template ${item}`}
                  checked={selectedTemplate === `Template ${item}`}
                  onChange={() => handleTemplateSelect(`Template ${item}`)}
                />
                <label htmlFor={`template${item}`}>Template {item}</label>
              </div>
            ))}
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography>Customize</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Customize the format further with advanced options here.
          </Typography>
          {/* Add more customization options if needed */}
        </AccordionDetails>
      </Accordion>

      {/* Preview Button */}
      <button
        type="button"
        className={styles.previewButton}
        onClick={() => alert('Previewing...')}
      >
        Preview
      </button>
    </div>
  );
}
