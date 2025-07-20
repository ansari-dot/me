import React from "react";
import backgroundImg from '../assets/background.png';
import logo from '../assets/logo.png';
import styles from "./HeroBanner.module.css";

const HeroBanner = () => {
  return (
    <section
      className={styles.heroBanner}
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className={styles.heroContent}>
        <img src={logo} alt="Logo" className={styles.heroLogo} />
        <h2 className={styles.heroWelcome}>WELCOME TO</h2>
        <h1 className={styles.heroTitle}>SHEHRITY</h1>
        <div className={styles.heroSubtitle}>VIDEO TRAINING SCREENING</div>
        <button className={styles.heroCta}>Get Started Now</button>
      </div>
    </section>
  );
};

export default HeroBanner; 