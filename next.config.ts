/** @type {import('next').NextConfig} */
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      new URL('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/**'),
      new URL('https://avatars.githubusercontent.com/u/113414074?v=4'),
      new URL('https://avatars.githubusercontent.com/u/11501370?s=200&v=4'),
    ],
  },
};

export default withNextIntl(nextConfig);
