import React, { Component } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';

import metrics from '../../config/metrics';

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
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20,
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

    this.onLoginPress = this.onLoginPress.bind(this);
  }

  onLoginPress = (username, password) => {
    this.setState({ isLoading: true });
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  };

  render() {
    const { email, password, isLoading } = this.state;
    const isValid = email !== '' && password !== '';
    return (
      <View style={styles.container}>
        <View
          style={styles.form}
          ref={(ref) => {
            this.formRef = ref;
          }}
        >
          <TextInput
            name="email"
            ref={ref => (this.emailInputRef = ref)}
            placeholder="Email"
            keyboardType="email-address"
            editable={!isLoading}
            returnKeyType="next"
            blurOnSubmit={false}
            withRef
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={value => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <TextInput
            name="password"
            ref={ref => (this.passwordInputRef = ref)}
            placeholder="Password"
            editable={!isLoading}
            returnKeyType="done"
            secureTextEntry
            withRef
            onChangeText={value => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={ref => (this.buttonRef = ref)} animation="bounceIn" duration={600} delay={400}>
            <Button
              onPress={() => this.onLoginPress(email, password)}
              title="Log In"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </View>
    );
  }
}
