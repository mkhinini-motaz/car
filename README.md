# car: the First Car Rental phone app

car is the phone app of First Car Rental, a system I built for a small car rental agency in Tunisia. The agency's staff use it to see cars, contracts and which cars are free. I wrote it by hand in React Native and TypeScript between July 2024 and June 2025 (37 commits), before I used coding agents. The API it calls is [carapi](https://github.com/mkhinini-motaz/carapi). I later rebuilt the whole system with Claude Code as [car-rental](https://github.com/mkhinini-motaz/car-rental), which is public.

## What it does

The app has a login stack and a drawer with four screens (`src/navigation`).

- **Login**: phone number and password. The access token is kept in AsyncStorage. A second screen resets the password with a one-time code (`src/screens/NewPasswordScreen.tsx`).
- **Home**: a card with the agency's contact details and a calendar of contracts (`src/components/home/ContractsCalendar.tsx`). The calendar marks each contract's days and uses `react-native-calendars`.
- **Cars**
  - A list of cars.
  - A car screen with its details (manufacturer, model, plate, and the dates the circulation tax, insurance and technical control end) and its contracts.
- **New reservation** (`src/screens/CreateReservationScreen.tsx`)
  - Choose a start and an end date and time, in 30-minute steps.
  - See each car with the free periods inside that range, and search the list.
  - Select free periods. The screen warns when two selected periods overlap. It does not send a booking: `src/api` only reads cars and contracts.
- **Settings**: choose the language.
- **Languages**: French, English, Arabic and two Tunisian variants. A script, `npm run add-translation`, asks for a key and adds it to every language file (`src/i18n/addTranslation.ts`).
- The Rented cars screen is a stub with placeholder items.

## Stack

- React Native 0.76, React 18, TypeScript 5
- React Navigation 6 (drawer, native stack, stack)
- React Query 3 for server data, React context for language and login
- NativeWind 2 with Tailwind 3 for styling
- `axios` 1, `react-native-calendars`, `react-native-date-picker`, `react-native-reanimated` 3
- Jest 29, ESLint 8, Prettier 2

## Layout

```
src/screens/      login, new password, home, cars, car, new reservation, settings
src/navigation/   root, login, home and drawer navigators
src/components/   home, car, Form, common
src/api/          calls to the API: auth, car, contract
src/classes/      TypeScript types for API objects
src/store/        language and login state
src/i18n/         translations and the add-translation script
android/, ios/    native projects
```

## Running it

```
npm install
npm start          # Metro bundler
npm run android
npm run ios
npm test
npm run lint
```

The `postinstall` script runs `npx typesync`. The app calls [carapi](https://github.com/mkhinini-motaz/carapi). The code is archived and not maintained, and it may need older Node or React Native tooling to build.

## Status

Archived. I rebuilt First Car Rental with Claude Code as [car-rental](https://github.com/mkhinini-motaz/car-rental).
