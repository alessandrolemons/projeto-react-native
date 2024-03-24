import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTheme, Input, Icon, Text } from '@rneui/themed';
import MyButtom from '../components/MyButtom';
import auth from '@react-native-firebase/auth';


const ForgotPass = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const { theme } = useTheme();

    const recuperarConta = () => {
        if (email === '') {
            Alert.alert('[ERRO]', 'Por favor, digite informe um email!');
        }
        else {
            auth().sendPasswordResetEmail(email)
                .then((r) => {
                    Alert.alert('Sucesso!', 'Email de recuperação enviado!', [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]);
                })
                .catch((error) => {
                    console.log('ForgotPassWord, recover: ' + error.code);
                    switch (error.code) {
                        //TODO: verificar validação desses erros
                        case 'auth/user-not-found':
                            Alert.alert('Erro', 'Email não cadastrado.');
                            break;
                        case 'auth/invalid-email':
                            Alert.alert('Erro', 'Email inválido.');
                            break;
                        case 'auth/user-disabled':
                            Alert.alert('Erro', 'Usuário desabilitado.');
                            break;
                    }
                });
        }
    };

    return (
        <View style={styles.container}>
            <Icon
                name="lock-question"
                type="material-community"
                size={50}
                color={theme.colors.grey2}
                style={styles.icon}
            />
            <Text style={styles.mainTitle}>ESQUECEU SUA SENHA?</Text>
            <Text style={styles.mainText}>Para recuperá-la, digite o seu email cadastrado!</Text>
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
            <MyButtom text="Recuperar" onClick={() => recuperarConta()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mainText: {
        fontSize: 14,
        marginBottom: 20,
    },
    icon: {
        marginBottom: 20,
    },
});

export default ForgotPass;
