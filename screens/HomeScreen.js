import React , {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import {Container} from '../styles/FeedStyles';
import PostCard from '../components/PostCard';
import DrawerContent from './DrawerContent'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
//import { FlatList } from 'react-native-gesture-handler';


const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);//while our data fetching from database
  const [deleted, setDeleted] = useState(false);


  const fetchPosts = async() => {
      try {
        const list = [];
        await firestore().collection('posts').orderBy('postTime', 'desc')
        .get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              const {userID, post, postImg, postTime, likes, comments} = doc.data();
              list.push({
                  id: doc.id,
                  userID,
                  userName: 'Unknown',
                  userImg: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                  postTime: postTime,
                  post,
                  postImg,
                  liked: false,
                  likes,
                  comments,
              });
            }) 
        })
        setPosts(list);

        if(loading) {
          setLoading(false);
        }
        console.log('Posts HomeScreen: ', posts);
      } catch(e) {
        console.log(e);
      }
    }

   useEffect(() => {
    fetchPosts();
  }, []);

// rerender when we delete post then setDeleted to false so when we delete another post 
//we will start the process from zero again
  useEffect(() => {
    fetchPosts();
    setDeleted(false);
   navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading,deleted]);

  const handleDeletePost = (postId) => {
    Alert.alert('Delete post','Are you sure?',
    [
      {
        text:'Cancel',
        onPress: () => console.log('cancel deleting post'),
        style : 'cancel'
      },
      {
        text: 'Confirm',
        onPress: () => deletePost(postId),
      },
    ],
    {cancelable: false}
    );
  }

  const deletePost = (postId) => {
    console.log('PostID: ',postId);

    firestore().collection('posts').doc(postId)
    .get().then(documentSnapshot => {
      if(documentSnapshot.exists) {
        const {postImg} = documentSnapshot.data();
        if(postImg != null){
          const storageRef = storage().refFromURL(postImg);
          const imageRef = storage().ref(storageRef.fullPath);

          imageRef.delete().then(() => {
            console.log(`${postImg} has been deleted successfully`);
            deleteFirestoreData(postId);
            setDeleted(true);
          })
          .catch((e) => {
            console.log('Error while deleting image in the post',e);
          })
          // if the image not available in the post
        } else{
           deleteFirestoreData(postId);
           setDeleted(true);
        }
      }
    })
  }

  const deleteFirestoreData = (postId) => {
    firestore().collection('posts').doc(postId)
    .delete().then(() => {
      Alert.alert('Post deleted','Your post has been deleted successfully');
    })
    .catch(e => console.log('Error deleting post', e))
  }

    return (
      <Container>
       <FlatList
         data={posts}
         renderItem={({item})=> <PostCard item={item} onDelete ={handleDeletePost} onPress={() => navigation.navigate('HomeProfile', {userID: item.userID})}/>}
         keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false}
       />
      </Container>
    );
};

export default HomeScreen;

