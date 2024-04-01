/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignOutBtn from '../components/SignOutBtn';
import { COLORS } from '../assets/colors';
import { useTheme } from '@rneui/themed';
import { Icon } from '@rneui/base';


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
      gap: 10,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingBottom: 80,
    },
    texto: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Icon
        name="wrench"
        type="material-community"
        size={60}
        color={theme.colors.secondary}
      />
      <Text style={styles.texto}>*Home*</Text>
      <Text>Em construção!</Text>
    </View>
  );
};

export default Home;


