import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';

import BlueWave from '../../assets/images/wave.png';
import loading from '../../assets/gifs/loading.gif';

import Input from '../../components/Input';
import { useUserMethods } from '../../hooks/user/methods';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Scroll,
  Page,
  DeleteModalConfirmation,
  ViewModal,
  StyledViewModal,
  TextModal,
  ViewModalButton,
  ModalButton,
  TextButtonModal,
  AdivisedText,
  AdivisedTextArea,
  Container,
  HeaderImage,
  Button,
  TextButton,
  LoadingGif,
  Title,
  UserContainerList,
  UserInfoContainerList,
  UserList,
  UserInfoHeader,
  ButtonIcon,
  Icon,
  UserInfoText,
  CompanyInfoArea,
  CompanyText,
  DocumentText,
} from './styles';

import { database } from '../../services/connection';
import InputMask from '../../components/InputMask';

interface UserFormData {
  name: string;
  document: number;
  type: 'individual' | 'business';
}

export default function SignIn() {
  const [userInfo, setUserInfo] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [companyType, setCompanyType] = useState('');

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState('');

  const formRef = useRef(null);
  const { post, remove } = useUserMethods();

  useEffect(() => {
    database.collection('users').onSnapshot(query => {
      const list = [];
      query.forEach(doc => {
        list.push({ ...doc.data().data, id: doc.id });
      });
      setUserInfo(list);
    });
    setDisabledButton(false);
  }, []);

  useEffect(() => {
    const formatedType = companyType.toLowerCase().trim();
    setCompanyType(formatedType);
  }, [companyType]);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      formRef.current.setErrors({});
      setDisabledButton(true);
      let min = 0;
      try {
        const formatedType = data.type.toLowerCase().trim();
        if (formatedType === 'business') {
          min = 14;
        } else if (formatedType === 'individual') {
          min = 11;
        }
        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome é obrigatório')
            .min(5, 'O nome deve conter mais de 5 letras')
            .max(30, 'O nome deve conter menos de 30 letras'),
          type: Yup.string()
            .required('Insira se ela é individual ou business')
            .max(10, 'O nome deve conter menos de 30 letras')
            .test('tipo', 'Os tipos não batem', function (type: string) {
              return (
                type.toLowerCase().trim() === 'business' ||
                type.toLowerCase().trim() === 'individual'
              );
            }),
          document: Yup.number()
            .required(`Insira ${min} digitos`)
            .test('digito', 'Os digittos não batem', function (type) {
              console.log(String(type).length);
              return min === String(type).length;
            }),
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
          formRef.current.setErrors(errors);
          setDisabledButton(false);
          return;
        }
        Alert.alert('Erro ao enviar', 'Envie seus dados novamente.');
      }
      setDisabledButton(false);
    },
    [setDisabledButton, post],
  );

  const handleDeleteModalUser = useCallback(
    (id: string) => {
      setDeletedItemId(id);
      setModalIsVisible(true);
    },
    [setDeletedItemId, setModalIsVisible],
  );

  const handleConfirmDeleteUser = useCallback(async () => {
    setModalIsVisible(false);
    await remove(deletedItemId);
  }, [remove, setModalIsVisible, deletedItemId]);

  const onRefresh = React.useCallback(() => {
    wait(60000).then(() => setRefreshing(false));
  }, []);

  const replaceCPF = useCallback((cpf: string) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }, []);

  const replaceCNPJ = useCallback((cnpj: string) => {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5',
    );
  }, []);

  return (
    <Scroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Page>
        <DeleteModalConfirmation
          visible={modalIsVisible}
          animationType="slide"
          transparent
        >
          <ViewModal>
            <StyledViewModal>
              <TextModal>Você deseja mesmo excluir esse usuário ?</TextModal>
              <ViewModalButton>
                <ModalButton
                  onPress={() => handleConfirmDeleteUser()}
                  backgroundColor="blue"
                >
                  <TextButtonModal>Sim</TextButtonModal>
                </ModalButton>
                <ModalButton
                  onPress={() => setModalIsVisible(!modalIsVisible)}
                  backgroundColor="red"
                >
                  <TextButtonModal>Não</TextButtonModal>
                </ModalButton>
              </ViewModalButton>
            </StyledViewModal>
          </ViewModal>
        </DeleteModalConfirmation>

        <HeaderImage source={BlueWave} />
        <Container>
          <Title style={{ fontSize: 30, fontWeight: 'bold' }}>Hey,</Title>
          <Title>Insira seus dados</Title>
          <Form style={{ marginTop: 10 }} ref={formRef} onSubmit={handleSubmit}>
            <Input
              placeholder="Nome"
              name="name"
              icon="user"
              maxLength={30}
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Input
              placeholder="individual/business"
              name="type"
              icon="briefcase"
              autoCapitalize="none"
              maxLength={10}
              onChangeText={text => setCompanyType(text)}
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <InputMask
              placeholder={companyType === 'business' ? 'CNPJ' : 'CPF'}
              name="document"
              icon="file-text"
              type={companyType === 'business' ? 'cnpj' : 'cpf'}
              keyboardType="numeric"
            />
            <Button
              disabled={disabledButton}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              {!disabledButton && <TextButton>Registrar</TextButton>}

              {disabledButton && (
                <>
                  <TextButton style={{ fontSize: 12, marginLeft: 3 }}>
                    Enviando
                  </TextButton>
                  <LoadingGif source={loading} />
                </>
              )}
            </Button>
          </Form>

          <AdivisedTextArea>
            <AdivisedText>Veja alguns usuários</AdivisedText>
            <FeatherIcon name="chevron-down" size={23} />
          </AdivisedTextArea>
          <UserContainerList>
            {userInfo.length === 0 && (
              <UserInfoText style={{ color: '#31353a' }}>
                Nenhum registro
              </UserInfoText>
            )}
            <UserList
              nestedScrollEnabled
              data={userInfo}
              keyExtractor={info => info.id}
              renderItem={({ item }) => (
                <UserInfoContainerList backgroundColor={item.type}>
                  <UserInfoHeader>
                    <UserInfoText>{item.name}</UserInfoText>
                    <ButtonIcon onPress={() => handleDeleteModalUser(item.id)}>
                      <Icon name="x-circle" color="#fff" size={20} />
                    </ButtonIcon>
                  </UserInfoHeader>
                  <CompanyInfoArea>
                    <CompanyText>{item.type}</CompanyText>
                    <DocumentText>
                      {item.type === 'business'
                        ? replaceCNPJ(item.document)
                        : replaceCPF(item.document)}
                    </DocumentText>
                  </CompanyInfoArea>
                </UserInfoContainerList>
              )}
            />
          </UserContainerList>
        </Container>
      </Page>
    </Scroll>
  );
}
