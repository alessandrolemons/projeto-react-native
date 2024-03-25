/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignOutBtn from '../components/SignOutBtn';
import {COLORS} from '../assets/colors';

const Home = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: { backgroundColor: COLORS.primary },
      headerRight: () => <SignOutBtn />,
    })

  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
