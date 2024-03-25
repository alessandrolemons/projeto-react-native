/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Input, Icon, Text, Image } from '@rneui/themed';
import MyButtom from '../components/MyButtom';
import Loading from '../components/Loading';
import { AuthUserContext } from '../context/AuthUserProvider';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


const SignIn = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const { signIn } = useContext(AuthUserContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    divSuperior: {
      flex: 5,
      alignItems: 'center',
    },
    divInferior: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
    },
    textEsqueceuSenha: {
      fontSize: 14,
      color: theme.colors.primary,
      alignSelf: 'flex-end',
      marginBottom: 10,
      marginRight: 10,
    },
    divOuHr: {
      width: '100%',
      height: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    divHr: {
      width: '30%',
      height: 1,
      borderBottomColor: theme.colors.grey4,
      borderBottomWidth: 2,
    },
    textOu: {
      marginHorizontal: 20,
      fontSize: 18,
      color: theme.colors.accent,
    },
    divCadastrarSe: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      color: theme.colors.accent,
    },
    textCadastreSe: {
      color: theme.colors.accent,
    },
    textNormal: {
      fontSize: 18,
      color: theme.colors.accent,
    },
    textCadastrarSe: {
      fontSize: 15,
      color: theme.colors.primary,
      marginLeft: 5,
    },
  });

  async function entrar() {
    setLoading(true);
    let msgError = await signIn(email, password);
    if (msgError === 'ok') {
      setLoading(false);

      if (!auth().currentUser.emailVerified) {
        Alert.alert('[ERRO] Email não verificado', 'Verifique seu email para continuar!');
        return;
      }

      navigation.navigate('Home');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );

    } else {
      Alert.alert(msgError);
      setLoading(false);
    }
  }

  const cadastrar = () => {
    navigation.navigate('SignUp');
  };

  const ForgotPass = () => {
    navigation.navigate('ForgotPass');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            containerStyle={{
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
            }}
            style={{ width: 200, height: 200 }}
            source={require('../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <Input
            placeholder="Email"
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
            onChangeText={t => setEmail(t)}
          />
          <Input
            secureTextEntry={showPass}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            leftIcon={
              showPass ? (
                <Icon
                  type="material-community"
                  name="lock"
                  size={22}
                  color={theme.colors.grey2}
                  onPress={() => setShowPass(false)}
                />
              ) : (
                <Icon
                  type="material-community"
                  name="lock"
                  size={22}
                  color={theme.colors.error}
                  onPress={() => setShowPass(true)}
                />
              )
            }
            onChangeText={t => setPassword(t)}
          />
          <Text
            style={styles.textEsqueceuSenha}
            onPress={() => ForgotPass()}>
            Esqueceu sua senha?
          </Text>
          <MyButtom text="ENTRAR" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textCadastreSe}>Não tem uma conta?</Text>
            <Text
              style={styles.textCadastrarSe}
              onPress={() => cadastrar()}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      <Loading visivel={loading} />
    </SafeAreaView>
  );
};

export default SignIn;
