import React, { PureComponent, useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api';

import Step from './Step';

export default function Wizard(props) {
  const [index, setIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  Wizard.Step = props => <Step {...props} />;

  function nextStep() {
    if (index !== props.children.length - 1) {
      setIndex(index + 1);
    }
  }

  function prevStep() {
    if (index !== 0) {
      setIndex(index - 1);
    }
  }

  async function onSubmit() {
    const { name, cpf, email, senha, bio } = props.initialValues;
    // Da para melhorar, mas por enquanto está "resolvendo" o problema
    try {
      if (
        !(
          name === '' ||
          cpf === '' ||
          email === '' ||
          senha === '' ||
          bio === ''
        )
      ) {
        const response = await api.post('/user', {
          name,
          cpf,
          email,
          password: senha,
          bio,
        });

        Alert.alert('Sucesso', 'Cadastrado com sucesso');
        navigation.navigate('Login');
        console.log('cadastrado com sucesso!', response.data);
      } else {
        Alert.alert('Erro', 'Por favor preencha todos os campos!');
      }
    } catch (error) {
      if (await error.response) {
        setErrorMsg(error.response.data.error);
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
        Alert.alert(
          'Erro',
          'Houve um erro interno. \nPor favor, tente mais tarde.'
        );
      }
      // errorMsg ? Alert.alert('Erro', errorMsg) : "";
      // da para fazer um 'esquema'
      Alert.alert('Erro', errorMsg);
      console.log('Erro fora dos ifs ', error); // depois de 2min que vai aparecer
    }
  }

  // console.log('values', this.props.initialValues);
  // const { children } = props;
  // const { index, values } = state;
  console.log(props.initialValues);
  return (
    <View style={{ flex: 1, backgroundColor: '#006bad' }}>
      {React.Children.map(props.children, (el, position) => {
        if (position === index) {
          return React.cloneElement(el, {
            currentIndex: index,

            nextStep: nextStep,
            prevStep: prevStep,
            onSubmit: onSubmit,
            isLast: index === props.children.length - 1,
          });
        }

        return null;
      })}
    </View>
  );
}
// export default Wizard;
