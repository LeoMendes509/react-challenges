import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.contentWrapper}>
        <h1>React Training</h1>
        <p>
          <b>Dashboard de Estudos em React</b> <br />
          Clique para explorar os desafios que desenvolvi, com foco em
          aprendizado, prática e evolução em React{" "}
        </p>

        {/* --- LEVEL BEGINNER --- */}
        <h3 className={styles.sectionTitle}>Level Beginner</h3>
        <div className={styles.buttonsGrid}>
          <Link to="/beginner/1" className={styles.challengeBtn}>
            1. Title Effect
          </Link>
          <Link to="/beginner/2" className={styles.challengeBtn}>
            2. Clock Cleanup
          </Link>
          <Link to="/beginner/3" className={styles.challengeBtn}>
            3. Auto Focus
          </Link>
          <Link to="/beginner/4" className={styles.challengeBtn}>
            4. Prev Value
          </Link>
        </div>

        {/* --- LEVEL INTERMEDIATE --- */}
        <h3 className={styles.sectionTitle}>Level Intermediate</h3>
        <div className={styles.buttonsGrid}>
          <Link to="/intermediate/5" className={styles.challengeBtn}>
            5. Theme Ctx
          </Link>
          <Link to="/intermediate/6" className={styles.challengeBtn}>
            6. User Ctx
          </Link>
          <Link to="/intermediate/7" className={styles.challengeBtn}>
            7. useToggle
          </Link>
          <Link to="/intermediate/8" className={styles.challengeBtn}>
            8. ToggleView
          </Link>
          <Link to="/intermediate/9" className={styles.challengeBtn}>
            9. useDebounce
          </Link>
          <Link to="/intermediate/10" className={styles.challengeBtn}>
            10. useListView
          </Link>
        </div>

        {/* --- LEVEL ADVANCED --- */}
        <h3 className={styles.sectionTitle}>Level Advanced</h3>
        <div className={styles.buttonsGrid}>
          <Link to="/advanced/11" className={styles.challengeBtn}>
            11. Shopping Cart
          </Link>
          <Link to="/advanced/12" className={styles.challengeBtn}>
            12. MultiContextView
          </Link>
          <Link to="/advanced/13" className={styles.challengeBtn}>
            13. useForm
          </Link>
          <Link to="/advanced/14" className={styles.challengeBtn}>
            14. Click Outside
          </Link>
        </div>

        {/* --- FINAL PROJECT --- */}
        <div className={styles.finalProjectSection}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className={styles.finalProjectLabel}>FINAL PROJECT</span>
            <small
              style={{ color: "#FFDEDE", marginTop: "5px", fontSize: "0.8rem" }}
            >
              Task Management System
            </small>
          </div>

          <Link to="/final-project" className={styles.finalBtn}>
            🏆 START MISSION
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
