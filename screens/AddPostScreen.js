import React, {useState , useContext} from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {InputField, InputWrapper, AddImage, SubmitBtn, SubmitBtnText, StatusWrapper} from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


const AddPostScreen = () => {

  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post , setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () =>{
    const imageUrl = await uploadImage();
    console.log('image url: ',imageUrl);
    firestore().collection('posts')
    .add({
      userID: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('post added.');
      Alert.alert('Your post has been published successfully')
      setPost(null);
    })
    .catch((error) => {
      console.log("Something wrong with firestore", error);
    })

  }

  const uploadImage= async () =>{
      if (image == null){
        return null;
      }
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1);

      // Add timestamp to FileName when uploading to firebase could
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

      setUploading(true);
      setTransferred(0);

    // display in console the uploading state for firebase could
      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);

      task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

      });


      try{
        await task;

        const url = await storageRef.getDownloadURL();

        setUploading(false);
        setImage(null);
        
        return url;
      } catch(e) {
        console.log(e);
        return null;
      }
      setImage(null);
  }
    return (
      <View style={styles.container}>
        <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}
          <InputField
            placeholder ="whats on your mind?"
            multiline
            numberOfLines={3}
            value={post}
            onChangeText ={(content) => setPost(content)}
          />
          {uploading ? (
            <StatusWrapper>
              <ActivityIndicator size="large" color ="#000212"/>
            </StatusWrapper>

          ) :(
            <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
          )}

        </InputWrapper>
         <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
