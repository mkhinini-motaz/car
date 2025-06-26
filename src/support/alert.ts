import Translatable from "../classes/Translatable";
import {Alert} from "react-native";
import {translate} from "../i18n";

export const alertNetworkError = (selectedLang: keyof Translatable) => {
    Alert.alert(
        '',
        translate('network:error', selectedLang),
        [{text: translate('common:ok', selectedLang),}],
    );
};

export const alertEmptyCartConfirm = (selectedLang: keyof Translatable, shopName: string, onConfirm: () => {}) => {
    Alert.alert(
        translate('cart:empty:confirm:title', selectedLang),
        translate('cart:empty:confirm:content', selectedLang, { shopName }),
        [
            {
                text: translate('common:confirm', selectedLang),
                style: 'destructive',
                onPress: onConfirm,
            },
            {
                text: translate('common:cancel', selectedLang),
                style: 'cancel',
            },
        ],
        { cancelable: true, },
    );
};

export const alertPromptLocation = (selectedLang: keyof Translatable, shopName: string, onConfirm: () => {}) => {
    Alert.alert(
        translate('cart:address:missing:content', selectedLang, { shopName }),
        '',
        [
            {
                text: translate('common:location:choose', selectedLang),
                onPress: onConfirm,
            },
            {
                text: translate('common:cancel', selectedLang),
                style: 'cancel',
            },
        ],
        { cancelable: true, },
    );
};

export const alertConfirmOrderSubmit = (selectedLang: keyof Translatable, shopName: string, onConfirm: () => {}) => {
    Alert.alert(
        translate('cart:order:submit', selectedLang),
        translate('cart:order:submit:content', selectedLang, { shopName }),
        [
            {
                text: translate('common:cancel', selectedLang),
                style: 'destructive',
            },
            {
                text: translate('common:confirm', selectedLang),
                onPress: onConfirm,
            },
        ],
        { cancelable: true, },
    );
};

export const alertShopClosed = (selectedLang: keyof Translatable) => {
    Alert.alert(
        '',
        translate('shop:closed', selectedLang),
        [{text: translate('common:ok', selectedLang),}],
    );
};

export const alertUpdatePasswordSuccess = (selectedLang: keyof Translatable) => {
    Alert.alert(
        '',
        translate('form:password:update:success', selectedLang),
        [{text: translate('common:ok', selectedLang),}],
    );
};

export const alertConfirmConfirmOrderReplay = (selectedLang: keyof Translatable, shopName: string, onConfirm: () => {}) => {
    Alert.alert(
        translate('cart:order:replay:submit', selectedLang),
        translate('cart:order:replay:submit:content', selectedLang, { shopName }),
        [
            {
                text: translate('common:cancel', selectedLang),
                style: 'destructive',

            },
            {
                text: translate('common:confirm', selectedLang),
                onPress: onConfirm,
            },
        ],
        { cancelable: true, },
    );
};


export const alertConfirmLogout = (selectedLang: keyof Translatable, onConfirm: () => {}) => {
    Alert.alert(
        translate('common:logout:confirm', selectedLang),
        '',
        [
            {
                text: translate('common:cancel', selectedLang),
                style: 'cancel',

            },
            {
                text: translate('common:confirm', selectedLang),
                style: 'destructive',
                onPress: onConfirm,
            },
        ],
        { cancelable: true, },
    );
};


export const alertOccursInPeriod = (selectedLang: keyof Translatable) => {
    Alert.alert(
        translate('car:availability:occurs_in_period', selectedLang),
        '',
        [{text: translate('common:ok', selectedLang),}],
        { cancelable: true, },
    );
};
