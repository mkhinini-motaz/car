import { SET_LANG } from './types';
import Translatable from "../../classes/Translatable";

export function setLang(lang: keyof Translatable) {
    return { type: SET_LANG, payload: lang };
}
