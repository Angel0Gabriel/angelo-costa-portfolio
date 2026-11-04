import {getRequestConfig} from 'next-intl/server';
import {content, isLocale} from '@/data/content';
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : 'en';
  return {locale, messages: content[locale].ui};
});
