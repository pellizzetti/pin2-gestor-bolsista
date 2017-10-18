import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';

import metrics from '../../config/metrics';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
  },
  form: {
    marginTop: 20,
  },
  footer: {
    height: 100,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: 'white',
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold',
  },
});

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };

    this.signIn = this.signIn.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
  }

  signIn() {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ isLoading: true });

    // Api.post('/auth/authenticate', { email, password })
    //   .then(response => AsyncStorage.setItem('@Gestor:token', response.token))
    //   .then(() => Api.get('/auth/user'))
    //   .then((response) => {
    //     global.user = response.user;
    //     return AsyncStorage.setItem('@RocketSpot:user', JSON.stringify(response.user));
    //   })
    //   .then(() => {
    //     const actionToDispatch = NavigationActions.reset({
    //       index: 0,
    //       actions: [NavigationActions.navigate({ routeName: 'Home' })],
    //     });

    //     navigation.dispatch(actionToDispatch);
    //   })
    //   .catch((err) => {
    //     this.setState({ isLoading: false });
    //     console.log('erro', err);
    //   });
  }

  focusNextField() {
    this.passwordInput.focus();
  }

  render() {
    const { email, password, isLoading } = this.state;
    const isValid = email !== '' && password !== '';
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
            editable={!isLoading}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={this.focusNextField}
            onChangeText={value => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <TextInput
            name="password"
            placeholder="Senha"
            editable={!isLoading}
            returnKeyType="done"
            ref={(input) => {
              this.passwordInput = input;
            }}
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View animation="bounceIn" duration={600} delay={400}>
            <Button
              onPress={() => this.signIn(email, password)}
              title="Entrar"
              color="#2c4e2d"
              disabled={!isValid}
            />
          </View>
        </View>
      </View>
    );
  }
}
