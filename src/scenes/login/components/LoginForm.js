import React, { Component } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { NavigationActions } from 'react-navigation';

import metrics from '../../../config/metrics';
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

  async signIn() {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ isLoading: true });

    try {
      const response = await fetch('http://192.168.0.159:1337/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseJson = await response.json();

      if (response.status === 200 && responseJson.auth === true) {
        AsyncStorage.setItem('@GestorBolsista:token', response.jwt);

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });

        this.setState({ isLoading: false });

        navigation.dispatch(resetAction);
      } else {
        this.setState({ isLoading: false });

        Alert.alert(responseJson.msg);
      }
    } catch (err) {
      this.setState({ isLoading: false });

      Alert.alert('Não foi possível conectar ao servidor. :(');
    }
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
              loading={isLoading}
              disabled={!isValid}
            />
          </View>
        </View>
      </View>
    );
  }
}
