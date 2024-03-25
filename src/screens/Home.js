/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignOutBtn from '../components/SignOutBtn';
import { COLORS } from '../assets/colors';
import { useTheme } from '@rneui/themed';


const Home = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: { backgroundColor: COLORS.primary },
      headerRight: () => <SignOutBtn />,
    })

  }, []);

  const { theme } = useTheme();


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    texto: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Home</Text>
    </View>
  );
};

export default Home;


