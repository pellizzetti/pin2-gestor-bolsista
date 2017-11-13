import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#647064',
  },
});

export default () => (
  <View style={styles.container}>
    <Text style={styles.title}>Add report</Text>
  </View>
);