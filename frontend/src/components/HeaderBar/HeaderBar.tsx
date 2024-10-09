"use client"; 

import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import styles from "./HeaderBar.module.css"; 

const HeaderBar = () => {
  return (
    <header className={styles.headerBar}>
      <Link href="/" className={styles.headerContent}>
        SpacePad
        <FaRocket className={styles.rocketIcon} />
      </Link>
    </header>
  );
};

export default HeaderBar;
