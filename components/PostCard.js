import React, {useContext, useState, useEffect} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';
import {TouchableOpacity} from 'react-native';


const PostCard = ({item, onDelete, onPress}) => {
  
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(item.userID)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
      {/*console.log('User Data', documentSnapshot.data());*/}
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Card>
      <UserInfo>
        <UserImg source={{uri: userData ? userData.userImg || 
        'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' 
        : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'}}/>
        <UserInfoText>
        <TouchableOpacity onPress ={onPress}>
            <UserName>{userData ? userData.fname || 'Unknown' : 'Unknown'} {userData ? userData.lname || 'User' : 'User'}</UserName>
          </TouchableOpacity>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? <PostImg source={{uri: item.postImg}}/>:<Divider/>}

      <InteractionWrapper>
        {user.uid == item.userID ?
        <Interaction onPress={() => onDelete(item.id)}>
          <AntDesign name="delete" size={25} />
        </Interaction>
        : null }
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
