import type { FC } from 'react';
import './not-found.module.css';

interface ErrorPageProps {
  history: {
    goBack: () => void;
    push: (path: string) => void;
  };
}

export const ErrorPage: FC<ErrorPageProps> = ({ history }) => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found, please reload</p>
      <div className="not-found-buttons">
        <button onClick={() => history.goBack()}>Back</button>
        <button onClick={() => history.push('/')}>Home</button>
      </div>
    </div>
  );
};
