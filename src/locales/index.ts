
import enNav from './en/nav.json'
import viNav from './vi/nav.json'
import enFooter from './en/footer.json';
import viFooter from './vi/footer.json';
import enTerm from './en/term.json';
import viTerm from './vi/term.json';
import enCommon from './en/common.json';
import viCommon from './vi/common.json';
const languages = {
  en: {
    // ...enNav,
    // ...enCommon,
    nav:enNav,
    footer: enFooter,
    term: enTerm,
    common:enCommon
  },
  vi: {
    nav:viNav,
    footer: viFooter,
    term: viTerm,
    common:viCommon
    // ...viNav,
    // ...viCommon,
  },
};

export default languages;
