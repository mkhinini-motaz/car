import 'react-native-gesture-handler';
import RootNavigator from "./navigation/RootNavigator";
import { QueryClient, QueryClientProvider } from 'react-query';
import Store from "./store/Store";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Store>
        <RootNavigator />
      </Store>
    </QueryClientProvider>
  );
}

export default App;
