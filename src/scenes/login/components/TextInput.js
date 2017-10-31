import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native-animatable';

const IS_ANDROID = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 10,
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    color: '#578458',
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  },
});

export default class AuthTextInput extends Component {
  state = {
    isFocused: false,
  };

  render() {
    const { isEnabled, ...otherProps } = this.props;
    const { isFocused } = this.state;
    const color = isEnabled ? '#578458' : 'gray';
    const borderColor = isFocused ? '#647064' : '#b0c1b0';
    return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, { borderColor }]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={[styles.textInput, { color }]}
            maxLength={32}
            underlineColorAndroid="transparent"
            placeholderTextColor="#b0c1b0"
            selectionColor="#2c4e2d"
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}
