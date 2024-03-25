import React, { useContext, useState } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Input, Icon, Text } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { AuthUserContext } from '../context/AuthUserProvider';
import MyButtom from '../components/MyButtom';
import Loading from '../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthUserContext);
  const { theme } = useTheme();

  const cadastrar = () => {
    if (nome === '' || email === '' || pass === '' || confPass === '') {
      Alert.alert('Preencha todos os campos');
    }
    else if (pass !== confPass) {
      Alert.alert('[ERRO]', 'As senhas não coincidem, tente novamente!');
    }
    else {
      auth().createUserWithEmailAndPassword(email, pass)
        .then(() => {
          let user = auth().currentUser;
          user.sendEmailVerification()
            .then(() => {
              Alert.alert('Quase lá!', 'Confirme seu cadastro no email informado!');
              // navigation.navigate('SignIn');
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SignIn' }],
                }),
              );
            })
            .catch((e) => console.log(e))
        })
        .catch((e) => {
          Alert.alert('Erro', e.code);
          switch (e.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Erro', 'Email já cadastrado.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/operation-not-allowed':
              Alert.alert('Erro', 'Problemas ao efetuar cadastro.');
              break;
            case 'auth/weak-password':
              Alert.alert('Erro', 'A senha informada é fraca.');
              break;
          }
        });
    }

  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
    },
    mainText: {
      marginVertical: 30,
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textAlign: 'center',
    },
    input: {
      fontSize: 16,
    },
    scroll: {
      width: '100%',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.mainText}>Criar uma conta</Text>
        <View>
          <Input style={styles.input}
            placeholder="Nome completo"
            keyboardType="default"
            returnKeyType="next"
            leftIcon={
              <Icon
                name="account"
                type="material-community"
                size={22}
                color={theme.colors.grey2}
              />
            }
            onChangeText={(t) => setNome(t)}
          />
          <Input style={styles.input}
            placeholder="email@example.com"
            keyboardType="email-address"
            returnKeyType="next"
            leftIcon={
              <Icon
                name="email-outline"
                type="material-community"
                size={22}
                color={theme.colors.grey2}
              />
            }
            onChangeText={(t) => setEmail(t)}
          />
          <Input style={styles.input}
            secureTextEntry={true}
            placeholder="Senha (mínimo 6 digitos)"
            keyboardType="default"
            returnKeyType="next"
            leftIcon={
              <Icon
                name="lock"
                type="material-community"
                size={22}
                color={theme.colors.grey2}
              />
            }
            onChangeText={(t) => setPass(t)}
          />
          <Input style={styles.input}
            secureTextEntry={true}
            placeholder="Confirme sua senha"
            keyboardType="default"
            leftIcon={
              <Icon
                name="lock"
                type="material-community"
                size={22}
                color={theme.colors.grey2}
              />
            }
            onChangeText={(t) => setConfPass(t)}
          />
          <MyButtom text="Cadastro" onClick={cadastrar} />
          {loading && <Loading />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
