import {useCallback, useContext} from "react";
import StoreContext from "./context/StoreContext";
import I18nContext from "./context/I18nContext";
import {availableLangs} from "../i18n";
import AuthContext from "./context/AuthContext";
import {setClientToken} from "../support/auth";

export function useStoreContext() {
    return useContext(StoreContext);
}

export function useI18nContext() {
    return useContext(I18nContext);
}

export function useAuthContext() {
    return useContext(AuthContext);
}

export function useSelector(selector: (state: object) => any) {
    const { state } = useStoreContext();
    return selector(state);
}

export function useDispatch() {
    const { dispatch } = useStoreContext();
    return dispatch;
}

export function useLangWriteFrom() {
    const { lang } = useI18nContext();
    return availableLangs[lang].writeFrom;
}

export function useLangCode() {
    const { lang } = useI18nContext();
    return lang;
}

export function useLang() {
    const { lang } = useI18nContext();
    return { selectedLang: lang, selectedLangWriteFrom: availableLangs[lang].writeFrom };
}

export function useSetLang() {
    const { setLang } = useI18nContext();
    return setLang;
}

export function useUser() : Client {
    const { user } = useAuthContext();
    return user;
}

export function useSetUser() {
    const { setUser } = useAuthContext();
    return setUser;
}

export function useAuthenticateClient() {
    const setClient = useSetUser();
    return (client: Client) => {
        setClient(client);
        return setClientToken(client.access_token);
    }
}
