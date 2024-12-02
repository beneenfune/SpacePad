import Image from "next/image";
import styles from "./page.module.css";
import { FaRocket } from 'react-icons/fa'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <header className={styles.header}>
            Welcome to SpacePad <FaRocket className={styles.rocketIcon} />
          </header>
          <div className={styles.h2}>
            Create Space around your lecture notes for easy note-taking on your iPad.
          </div>
          <div className={styles.body}>
            Upload your PDF or PPT lecture slides and customize them with extra space for note-taking. 
            With SpacePad, you can choose the placement and size of each lecture page, adjusting the orienntation to landscape or portrait to fit your note-taking preference.
          </div>
        </ol>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Image
          src="/images/home-steps.png"
          alt="Steps for how to use SpacePad"
          layout="intrinsic"  // maintains the original size
          width={500}
          height={300}
          />
        </div>

        <div className={styles.ctas}>
          <Link href="/format">
            <div className={styles.primaryButton}>
              <Image
                className={`${styles.logo} ${styles['white-icon']}`} // Apply the white-icon class
                src="/icons/pdf-icon.png" 
                alt="Lecture slides icon"
                width={40}  // Desired width
                height={40} // Desired height
              />
              Upload Here
            </div>
          </Link>
          
        </div>
      </main>
    </div>
  );
}
