import { StackNavigator } from 'react-navigation';

import SplashScreen from '../scenes/splash';
import LogIn from '../scenes/login';

export default StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: () => ({
      header: false,
    }),
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: () => ({
      header: false,
    }),
  },
});
