import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButtom from '../components/MyButtom';

export default function Home({navigation}) {
  //State (uma variável que pode mudar o valor durante a execução do app)
  const [contador, setContador] = useState(0);
  //const[getContador, setContador] = useState(0);

  console.log(navigation);

  function incrementar() {
    setContador(contador + 1);
  }

  function decrementar() {
    setContador(contador - 1);
  }

  //Ciclo de vide dos componentes React

  //Chamado ao criar o componente
  useEffect(() => {
    console.log('Na contrução do componente.');

    //Chamado quando o componente é destruído
    return console.log('Ao destruir o componente.');
  }, []);

  //Chamado ao atualizar o componente
  useEffect(() => {
    console.log('Na atualização do componenente.');
  }, [contador]);

  return (
    <View>
      <Text style={styles.texto}>Contador: {contador}</Text>
      <MyButtom onClick={incrementar} text="Incrementar" />
      <MyButtom onClick={decrementar} text="Decrementar" />
      <MyButtom
        onClick={() => navigation.navigate('SignIn')}
        text="Ir para SignIn"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f00',
    textAlign: 'center',
  },
});
