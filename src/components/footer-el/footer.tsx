import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerCopyright}>
          <span className={styles.footerText}>© 2025 Data sourced from the: </span>
          <a className={styles.footerText} href="https://pokeapi.co/">
            Pokemon api
          </a>
        </div>
        <div className={styles.footerInfo}>
          <a className={styles.footerGithubLink} href="https://github.com/IvanDok13" aria-label="Github link">
            <span className={styles.footerText}>IvanDok</span>
          </a>
        </div>
        <div className={styles.footerInfo}>
          <a className={styles.footerGithub} href="https://rs.school/" aria-label="RSSchool link" />
        </div>
      </div>
    </footer>
  );
}
