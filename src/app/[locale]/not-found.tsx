import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="notFound">
      <div className="notFoundText">
        <h1>404</h1>
        <p>{t('title')}</p>
      </div>
      <div className="buttons">
        <button type="button" onClick={() => window.history.back()} className="backButton">
          {t('back')}
        </button>
        <Link href="/" className="homeButton">
          {t('home')}
        </Link>
      </div>
    </div>
  );
}
