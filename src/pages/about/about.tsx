import styles from './about.module.css';

export default function About() {
  return (
    <>
      <div className={styles.cardContainer}>
        <div>
          <img className="img" src="public/img/aboutIK.jpg" alt="Logo" />
        </div>
        <div className={styles.textContainer}>
          <a href="https://github.com/IvanDok13" rel="noreferrer" data-testid="github-link">
            <div className={styles.name}>Ivan Dok </div>
          </a>

          <div className="text">
            <p>
              This is a React application that allows you to search for Pokémon by name. It uses the PokeAPI to fetch
              Pokémon data and displays it in a user-friendly interface.
            </p>
            <p>
              The application is built with TypeScript, React, and Vite, and follows best practices for component
              structure and state management.
            </p>
          </div>
        </div>
      </div>
      <div className="logo">
        <a href="https://rs.school/" rel="noreferrer" target="_blank" data-testid="rss-github-link">
          RS School
          <img src="public/svg/rsslogo.svg" alt="RSS logo" />
        </a>
      </div>
    </>
  );
}
