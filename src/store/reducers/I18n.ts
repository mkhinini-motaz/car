import { SET_LANG, PERSIST_REHYDRATE } from '../actions/types';
import { availableLangs, defaultLang } from '../../i18n';
import { Action } from "./index";

export const initialI18nReducerState = {
    selectedLang: defaultLang.code,
    selectedLangWriteFrom: defaultLang.writeFrom,
    availableLangs,
};

export default (state = initialI18nReducerState, action: Action) => {
    if (action.type === SET_LANG) {
        const selectedLangWriteFrom = availableLangs[action.payload] ?
            availableLangs[action.payload].writeFrom :
            defaultLang.writeFrom;

        return { ...state, selectedLangWriteFrom, selectedLang: action.payload }
    }

    return state;
};
