import React, { createContext } from 'react';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {

  async function storeUserSession(email, pass) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email,
          pass,
        }),
      );
    } catch (e) {
      console.error('AuthUserProvider, storeUserSession: ' + e);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }

  async function signIn(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      await storeUserSession(email, pass);
      return 'ok'; //retorna avisando que fez o login
    } catch (e) {
      return launchServerMessageErro(e); //retorna uma mensagem de erro
    }
  }

  async function Logout() {
    try {
      await EncryptedStorage.removeItem('user_session');
      await auth().signOut()
        .then(() => { RNRestart.restart()})
        .catch(() => { console.log('ERRO AO DESLOGAR'); });

    } catch (error) {
      console.log(error);
    }
  }


  //função utilitária
  function launchServerMessageErro(e) {
    console.log(e);
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      case 'auth/invalid-credential':
        return 'As credenciais informadas são inválidas!';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }
  return (
    <AuthUserContext.Provider value={{ signIn, retrieveUserSession, Logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};


