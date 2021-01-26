import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface BackgroundModelButtonProp {
  backgroundColor: 'red' | 'blue';
}

interface BackgroundUserListProp {
  backgroundColor: 'individual' | 'business';
}

export const Scroll = styled.ScrollView`
  flex:1;
`;

export const Page = styled.SafeAreaView`

`;

export const DeleteModalConfirmation = styled.Modal`

`;

export const ViewModal = styled.View`
  flex:1;
  margin-bottom:60px;
  justify-content:center;
  align-items: center;
  border-radius: 10px;
  align-self: center;
`;

export const StyledViewModal = styled.View`
  margin-bottom:30px;
  justify-content:center;
  align-items: center;
  width: 90%;
  height: 30%;
  border-radius: 10px;
  background-color: #1d75bd;
  align-self: center;
`;

export const TextModal = styled.Text`
  text-align: center;
  font-size: 15px;
  padding: 20px;
  color: #fff;
`;

export const ViewModalButton = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const ModalButton = styled.TouchableOpacity<BackgroundModelButtonProp>`
  background-color:${props => props.backgroundColor === 'blue' ? '#398efe' : '#ff0000'};
  flex:1;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
`;

export const TextButtonModal = styled.Text`
  text-align: center;
  color: #f3f3f6;
  font-size: 15px;
`;

export const Container = styled.View`
    flex:1;
    padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
    margin-top: 100px;
`;

export const Title = styled.Text`
  font-size: 25px;
  align-self: flex-start;
`;

export const HeaderImage = styled.Image`
  width: 100%;
  height: 200px;
  position: absolute;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  width: 90px;
  height: 40px;
  margin-top: 10px;
  background: #398efe;
  border-radius: 6px;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: #FFFFFF;
  font-size:18px;
  font-weight: bold;
`;

export const LoadingGif = styled.Image`
  height: 25px;
  width:25px;
  margin: 0 4px 0 2px;
`;

export const AdivisedTextArea = styled.View`
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
`;

export const AdivisedText = styled.Text`
  font-size: 18px;
  margin-right: 8px;
  margin-bottom: 2px;
`;

export const UserContainerList = styled.View`
  margin-top: 10px;
  border-radius: 15px;
  padding: 8px;
  background-color: #f3f3f6;
`;

export const UserList = styled.FlatList`
  flex: 1;
`;

export const UserInfoContainerList = styled.View<BackgroundUserListProp>`
  height: 50px;
  border-radius: 5px;
  background-color: ${props=>props.backgroundColor === 'individual' ? '#ff6a00' : '#00b2ff'};
  margin-top: 10px;
`;

export const UserInfoHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserInfoText = styled.Text`
  color: #fff;
  margin-left: 10px;
  margin-top: 3px;
`;

export const ButtonIcon = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  margin-right: 3px;
  margin-top: 3px
`;

export const Icon = styled(FeatherIcon)`

`;

export const CompanyInfoArea = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const CompanyText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
`;

export const DocumentText = styled.Text`
  font-style: italic;
  font-size: 10px;
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 8px;
`;

