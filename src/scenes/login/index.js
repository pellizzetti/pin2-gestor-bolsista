import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { Image, Text } from 'react-native-animatable';

import imgLogo from '../../assets/imgs/logo.png';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  logoImg: {
    flex: 1,
    height: null,
    width: width * 0.7,
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

export default class Login extends Component {
  render() {
    return (
      <Container>
          <Image
            animation="bounceIn"
            duration={1200}
            delay={200}
            style={styles.logoImg}
            source={imgLogo}
          />
          <Text style={styles.logoTitle}>
            Gestor Bolsistas
            </Text>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>E-mail</Label>
              <Input
                returnKeyType = {'next'}
                onSubmitEditing={event => this._inputPassword._root.focus()}/>
            </Item>
            <Item floatingLabel last>
              <Label>Senha</Label>
              <Input
                secureTextEntry
                getRef={password => this._inputPassword = password}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
