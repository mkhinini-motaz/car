import { defaultLang, translate } from "../i18n";
import { LOCAL, LOCAL_CURRENCY } from "../constants";
import Translatable from "../classes/Translatable";

/**
 * @param amount                {number}
 * @param selectedLang          {string}
 * @param selectedLangWriteFrom {string}
 *
 * @returns {string}
 */

export function formatMoneyDisplay(amount: number, selectedLang: keyof Translatable = defaultLang.code, selectedLangWriteFrom = defaultLang.writeFrom) {
  let formatter = new Intl.NumberFormat(LOCAL, {
    currency: LOCAL_CURRENCY,
  });

  if (selectedLangWriteFrom === 'right') {
    return formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' +
      translate(LOCAL_CURRENCY, selectedLang, true);
  }

  return formatter.format(amount / 1000).replace(LOCAL_CURRENCY, '') + ' ' + translate(LOCAL_CURRENCY, selectedLang, true);
}

export const phoneMask = ['+', '2', '1', '6', ' ', /[234579]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/,];

export const otpMask = [/[0-9]/, ' ', ' ', ' ', /[0-9]/, ' ', ' ', ' ', /[0-9]/, ' ', ' ', ' ', /[0-9]/, ' ', ' ', ' ', /[0-9]/, ' ', ' ', ' ', /[0-9]/];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatDate = (unixTimestamp: number, separator = '/') => {
  const date = (new Date(unixTimestamp * 1000));
  const day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
  let month = (date.getMonth() + 1).toString();
  month = month.length > 1 ? month : '0' + month;

  return day + separator + month + separator + date.getFullYear().toString();
};

export const formatTime = (unixTimestamp: number) => {
  const date = (new Date(unixTimestamp * 1000));
  let hours = date.getHours().toString();
  hours = hours.length > 1 ? hours : '0' + hours;
  let minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : '0' + minutes;

  return hours + ':' + minutes;
};

export const formatDateTime = (unixTimestamp: number) => {
  return formatDate(unixTimestamp) + ' ' + formatTime(unixTimestamp);
};

export const strToDate = (date: string, delimiter: string = '-') => {
  const [day, month, year] = date.split(delimiter);
  return new Date(year + '-' + month + '-' + day);
};

export const diffInDays = (unixTimestampFrom: number, unixTimestampTo: number) => {
  return Math.round(((unixTimestampTo - unixTimestampFrom) / (60 * 60 * 24)) * 100) / 100;
};

type TimeoutId = ReturnType<typeof setTimeout>;

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>): void => {
    const context = this;
    if (context.timeoutId) {
      clearTimeout(context.timeoutId);
    }

    context.timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const formatLocalPhoneNumber = (phone: string) => {
  phone = phone.replace(' ', '');
  const match = phone.match(/(\+216)([0-9]{2})([0-9]{3})([0-9]{3})/)
  if (!match) {
    return phone;
  }

  return match[2] + ' ' + match[3] + ' ' + match[4];
};

export const addDaysToDate = (date: Date, numberOfDays: number) => {
  date.setMinutes(date.getMinutes() + numberOfDays);
  return date;
}

export const periodsAreEqual = (period1: [number, number], period2: [number, number]) => {
  return (period1[0] + period1[1]) === (period2[0] + period2[1]);
}

export const occursInPeriod = (period1: [number, number], period2: [number, number]) => {
  // starts within period
  if (period1[0] > period2[0] && period1[0] < period2[1]) {
    return true
  }
  // ends within period
  if (period1[1] > period2[0] && period1[1] < period2[1]) {
    return true
  }

  // starts before period, ends after it
  if (period1[0] <= period2[0] && period1[1] >= period2[1]) {
    return true
  }

  // starts before period's end endsAtColumn is null
  if (period1[0] <= period2[1] && ! period2[1]) {
    return true
  }

  return false;
}

export const doesntOccurInPeriod = (period1: [number, number], period2: [number, number]) => {
  return ! occursInPeriod(period1, period2);
}
