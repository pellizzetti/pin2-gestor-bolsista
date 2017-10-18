import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, UIManager } from 'react-native';
import { Image, View, Text } from 'react-native-animatable';

import imgLogo from '../../assets/imgs/logo.png';
import metrics from '../../config/metrics';
import LoginForm from './LoginForm';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.7;

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30,
  },
  logoTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#647064',
  },
});

export default () => (
  <View style={styles.container}>
    <Image
      animation="bounceIn"
      duration={1200}
      delay={200}
      style={styles.logoImg}
      source={imgLogo}
    />
    <Text style={styles.logoTitle}>Gestor Bolsistas</Text>
    <KeyboardAvoidingView keyboardVerticalOffset={-100} behavior="padding">
      <LoginForm />
    </KeyboardAvoidingView>
  </View>
);
