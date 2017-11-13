import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import { Image } from 'react-native-animatable';

import imgLogo from '../../assets/imgs/logo.png';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  img: {
    flex: 1,
    height: null,
    width: width * 0.7,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#647064',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#647064',
  },
});

export default class Login extends Component {
  render() {
    return (
      <Container>
        <Container>
          <Image
            animation="bounceIn"
            duration={1200}
            delay={200}
            style={styles.img}
            source={imgLogo}
          />
          <Text style={styles.title}>
            Gestor Bolsistas
          </Text>
        </Container>
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
            <Container style={styles.buttonContainer}>
              <Button style={styles.button}>
                <Text>Entrar</Text>
              </Button>
            </Container>
          </Form>
        </Content>
      </Container>
    );
  }
}
