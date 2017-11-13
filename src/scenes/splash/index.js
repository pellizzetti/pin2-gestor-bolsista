import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#308240',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class SplashScreen extends Component {
  async componentWillMount() {
    try {
      const jwt = await AsyncStorage.getItem('@GestorBolsista:jwt');

      if (jwt !== null) {
        this.navigateTo('Home');
      } else {
        this.navigateTo('LogIn');
      }
    } catch (error) {
      Alert.alert(`Não foi possível buscar o token. :( - ${error}`);
    }
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
