import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.cardContainer}>
      <div>
        <img className="img" src="https://avatars.githubusercontent.com/u/113414074?v=4" alt="Logo" />
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
            The application is built with TypeScript, React, Redux Toolkit and Next.js, and follows best practices for
            component structure and state management.
          </p>
        </div>
        <div className="logo">
          <a href="https://rs.school/" rel="noreferrer" target="_blank" data-testid="rss-github-link">
            RS School
            <img
              className={styles.rssImg}
              src="https://avatars.githubusercontent.com/u/11501370?s=200&v=4"
              alt="RSS logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
