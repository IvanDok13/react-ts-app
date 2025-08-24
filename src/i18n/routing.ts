import { AppLocales } from '@const/const';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: Object.values(AppLocales),
  defaultLocale: AppLocales.EN,
});
