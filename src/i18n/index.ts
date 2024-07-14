import fr from './fr.json'
import en from './en.json'
import tnar from './tnar.json'
import tnfr from './tnfr.json'
import ar from './ar.json'
import Translatable from "../classes/Translatable";

export const i18n = { fr, en, tnar, tnfr, ar, };

export const availableLangs = {
    fr: { code: 'fr', writeFrom: 'left' },
    en: { code: 'en', writeFrom: 'left' },
    tnfr: { code: 'tnfr', writeFrom: 'left' },
    tnar: { code: 'tnar', writeFrom: 'right' },
    ar: { code: 'ar', writeFrom: 'right' },
};

export const defaultLang = availableLangs.tnfr;

/**
 * @see {i18n folder} function requires a translations object,
 *
 * @param {string}  translationKey
 * @param {string}  languageCode
 * @param {object}  params
 *
 * @returns {string}
 */
export function translate(translationKey: string|Translatable, languageCode: keyof Translatable, params = {}): string {
    const translations = i18n[languageCode];
    if (! translations || typeof translations !== 'object') {
        return translationKey;
    }

    let translatedValue = translations[translationKey];
    if (! translatedValue && typeof translationKey === 'object') {
        translatedValue = translateFromObject(translationKey, languageCode);
    }

    if (! translatedValue) {
        return translationKey;
    }

    for (let [paramName, paramI18n] of Object.entries(params)) {
        if (typeof paramI18n === 'object') {
            translatedValue = translatedValue.replace('${' + paramName + '}', translateFromObject(paramI18n, languageCode));
            continue;
        }

        translatedValue = translatedValue.replace('${' + paramName + '}', paramI18n);
    }

    return translatedValue;
}

/**
 * @see {i18n folder} function requires a translations object,
 *
 * @param {object} translationsObject
 * @param {string} languageCode
 *
 * @returns {string}
 */
export function translateFromObject(translationsObject: Translatable, languageCode: keyof Translatable) {
    if (! translationsObject || Object.keys(translationsObject).length === 0) {
        return '';
    }

    return translationsObject[languageCode] || translationsObject[Object.keys(translationsObject)[0]];
}
