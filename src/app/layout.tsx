import { Metadata } from 'next';
import { Providers } from './providers';
import './styles/global.css';

export const metadata: Metadata = {
  title: 'React: Next JS',
  icons: {
    icon: 'https://www.svgrepo.com/show/276269/location-pokemon.svg',
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
