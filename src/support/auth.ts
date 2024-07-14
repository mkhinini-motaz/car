import AsyncStorage from "@react-native-async-storage/async-storage";

export function setUserToken(token: string): Promise<void> {
    return AsyncStorage.setItem('user_access_token', token);
}

export function getUserToken(): Promise<string | null> {
    return AsyncStorage.getItem('user_access_token');
}
