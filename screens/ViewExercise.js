import React from 'react';
import { View, Text, Button, StyleSheet,Image, Platform, Dimensions,StatusBar } from 'react-native';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import LottieView from 'lottie-react-native';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 250;

const ViewExercise = ({route}) => {
  const itemData = route.params.itemData;

    return (
      <View style={styles.container}>
       <StatusBar barStyle='light-content'/>
       <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        minOverlayOpacity ={0.2}
        maxOverlayOpacity = {0.6}
        headerImage = {itemData.exerciseImg}
    >

        <TriggeringView style={styles.section}>
          <View>
              <Text style={styles.title}>{itemData.exerciseName}</Text>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex1Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex1} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex2Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex2} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex3Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex3} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex4Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex4} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex5Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex5} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex6Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex6} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex7Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex7} autoPlay loop />
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}> 
          <Text style={styles.title}>{itemData.Ex8Info}</Text>
          <View style ={styles.train}>
            <LottieView source={itemData.Ex8} autoPlay loop />
          </View>
        </View>
        
    </ImageHeaderScrollView>
      </View>
      
    );
};

export default ViewExercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  train:{
    flex:1, justifyContent:'center',alignItems:'flex-end',
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});

