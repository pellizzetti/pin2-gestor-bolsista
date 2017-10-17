import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  UIManager,
} from 'react-native';
import { Image, View } from 'react-native-animatable';

import imgLogo from '../../assets/imgs/logo.png';
import metrics from '../../config/metrics';
import LoginForm from './LoginForm';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;

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
  bottom: {
    backgroundColor: '#1976D2',
  },
});

export default class LogIn extends Component {
  render() {
    const formStyle = false ? { height: 0 } : { marginTop: 40 };
    return (
      <View style={styles.container}>
        <Image
          animation="bounceIn"
          duration={1200}
          delay={200}
          ref={ref => (this.logoImgRef = ref)}
          style={styles.logoImg}
          source={imgLogo}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior="padding"
          style={[formStyle, styles.bottom]}
        >
          <LoginForm />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
