import { DrawerNavigator } from 'react-navigation';

import SplashScreen from '../scenes/splash';
import LogIn from '../scenes/login';
import Home from '../scenes/home';
import Report from '../scenes/report';

export default DrawerNavigator({
  SplashScreen: {
    screen: SplashScreen,
    // navigationOptions: () => ({
    //   header: false,
    // }),
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: () => ({
      header: false,
    }),
  },
  Home: {
    screen: Home,
  },
  Report: {
    screen: Report,
  },
});

// export default StackNavigator({
//   SplashScreen: {
//     screen: SplashScreen,
//     navigationOptions: () => ({
//       header: false,
//     }),
//   },
//   LogIn: {
//     screen: LogIn,
//     navigationOptions: () => ({
//       header: false,
//     }),
//   },
//   Home: {
//     screen: HomeNavigator,
//   },
// });
