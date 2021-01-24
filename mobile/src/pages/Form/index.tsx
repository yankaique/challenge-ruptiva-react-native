import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';
import { Alert } from 'react-native';
import { Container, Title, HeaderImage, Scroll } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import BlueWave from '../../assets/wave.png';
import getValidationErrors from '../../utils/getValidationErrors';
import { useUserMethods } from '../../hooks/user';

export default function SignIn() {
  const formRef = useRef(null);
  const { post } = useUserMethods();
  const handleSubmit = useCallback(async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        document: Yup.number().required('Insira seu CPF ou CNPJ'),
        type: Yup.string().required('Insira se ela é individual ou business'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, document, type } = data;

      await post({
        name,
        document,
        type,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro ao enviar',
        'Ocorreu um erro ao enviar seus dados, envie seus dados novamente.',
      );
    }
  }, []);

  return (
    <Scroll>
      <HeaderImage source={BlueWave} />
      <Container>
        <Title style={{ fontSize: 30, fontWeight: 'bold' }}>Hey,</Title>
        <Title>Insira seus dados</Title>
        <Form style={{ marginTop: 10 }} ref={formRef} onSubmit={handleSubmit}>
          <Input
            placeholder="Nome"
            name="name"
            icon="user"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <Input
            keyboardType="numeric"
            placeholder="CPF/CNPJ"
            name="document"
            icon="file-text"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <Input
            placeholder="Indivídual/Business"
            name="type"
            icon="briefcase"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Registrar
          </Button>
        </Form>
      </Container>
    </Scroll>
  );
}
