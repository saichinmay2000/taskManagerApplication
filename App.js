import { View } from 'react-native';
import AppNavigator from './routes/AppNavigator';
import { Text } from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
