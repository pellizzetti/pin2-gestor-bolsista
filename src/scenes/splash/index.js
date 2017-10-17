import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c95b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    AsyncStorage.getItem('@Gestor:user', (err, result) => {
      global.user = JSON.parse(result);

      if (result != null) {
        this.navigateTo('Home');
      } else {
        this.navigateTo('LogIn');
      }
    });
  }

  navigateTo(routeName) {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });

    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="white" size={70} />
      </View>
    );
  }
}
