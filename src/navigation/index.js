import { DrawerNavigator, StackNavigator } from 'react-navigation';

import SplashScreen from '../scenes/splash';
import LogIn from '../scenes/login';
import Home from '../scenes/home';
import Report from '../scenes/report';

const HomeNavigator = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Report: {
    screen: Report,
  },
});

export default StackNavigator({
  SplashScreen: { screen: SplashScreen },
  LogIn: { screen: LogIn },
  Home: { screen: HomeNavigator },
}, {
  headerMode: 'none',
});
