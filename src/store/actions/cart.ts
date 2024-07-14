import {
    SET_CHOICE_TYPE_FIXED,
    CREATE_CHOICE_TYPE_WITH_OPTIONS,
    SET_CART_ADDRESS,
    SET_CART_PROMO_CODE,
    DELETE_CART_CHOICE_TYPE_WITH_OPTIONS,
    SET_ADDITIONAL_NOTE,
    EMPTY_CART,
    UPDATE_COUNT_CHOICE_TYPE_WITH_OPTIONS,
    SET_TYPE,
    SET_CART_SHOP,
    SET_SERVICE_AREA,
    CHANGE_SHOP
} from './types';
import Option from "../../classes/Option";
import PromoCode from "../../classes/PromoCode";
import ServiceArea from "../../classes/ServiceArea";

export interface CartChoiceTypeFixedPayload {
    product_id: number,
    product_count: number,
    shop_id: number,
}

export interface CartChoiceTypeWithOptionsPayload {
    product_id: number,
    product_count: number,
    shop_id: number,
    options: Option[],
}

export interface CartChoiceUpdateTypeWithOptionsPayload {

}

export function setCartShop(shopId: number) {
    return { type: SET_CART_SHOP, payload: shopId };
}

export function createChoiceTypeFixed(payload: CartChoiceTypeFixedPayload) {
    return { type: SET_CHOICE_TYPE_FIXED, payload };
}

export function createChoiceTypeWithOptions(payload: CartChoiceTypeWithOptionsPayload) {
    return { type: CREATE_CHOICE_TYPE_WITH_OPTIONS, payload };
}

export function deleteChoiceTypeWithOptions(product_id_in_cart: number) {
    return { type: DELETE_CART_CHOICE_TYPE_WITH_OPTIONS, payload: product_id_in_cart };
}

export function updateCountChoiceTypeWithOptions(payload: CartChoiceUpdateTypeWithOptionsPayload) {
    return { type: UPDATE_COUNT_CHOICE_TYPE_WITH_OPTIONS, payload };
}

export function setCartAddress(address: { lat: number, lng: number }) {
    return { type: SET_CART_ADDRESS, payload: address };
}

export function setCartPromoCode(promoCode: PromoCode) {
    return { type: SET_CART_PROMO_CODE, payload: promoCode };
}

export function setOrderType(type) {
    return { type: SET_TYPE, payload: type };
}

export function setAdditionalNote(additionalNote: string) {
    return { type: SET_ADDITIONAL_NOTE, payload: additionalNote };
}

export function setServiceArea(serviceArea: ServiceArea) {
    return { type: SET_SERVICE_AREA, payload: serviceArea };
}

export function emptyCart() {
    return { type: EMPTY_CART };
}

export function changeShop(shopId: number) {
    return { type: CHANGE_SHOP, payload: shopId };
}
