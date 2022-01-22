import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Title, List} from 'react-native-paper';
import {Category1, Category2} from './CategoryTitle';
const {width, height} = Dimensions.get('screen');
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader';
import {API_KEY} from './Constant';
const Home = () => {
  const [allnewfeed, setnewsfeed] = useState([]);
  const [cate, setcate] = useState('arts');
  const [loading, setloading] = useState(false);
  const fetchnewsData = () => {
      setloading(true)
    axios
      .get(
        `https://api.nytimes.com/svc/topstories/v2/${cate}.json?api-key=${API_KEY}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setnewsfeed(response.data.results);
        setloading(false)
      })
      .catch(error => {
        console.log(error);
        setloading(false)
      });
  };

  const renderNewsFeed = () => {
    return allnewfeed.map((item, index) => {
      const d = new Date(item.published_date);
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      var dateis =
        d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
      return (
        <View key={index} style={styles.bodyData}>
          <Image
            style={{width: width / 4.5, height: width / 4.5}}
            source={{
              uri: item.multimedia[0].url,
            }}
          />
          <View style={{width: width - width / 2.5}}>
            <Text style={{fontSize: 18, color: 'black'}}>{item.title}</Text>
            <Text style={{marginVertical: 10}}>By: {item.byline}</Text>
            <Text>Published: {dateis}</Text>
          </View>
        </View>
      );
    });
  };

  useEffect(() => {
    fetchnewsData();
  }, [cate]);

  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <View>
          <Title style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            NYT News Feed
          </Title>
        </View>
        <View>
          
        </View>
      </View>
      <ProgressLoader
        visible={loading}
        isModal={true}
        isHUD={true}
        hudColor={'#000000'}
        color={'#FFFFFF'}
      />
      <ScrollView style={styles.categoryContainer}>
        <Text
          style={{marginLeft: 10, marginTop: 10, fontSize: 15, color: 'black'}}>
          Section
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              {Category1.map((item, index) => {
                return cate == item.name ? (
                  <Button
                    key={item.id}
                    onPress={() => setcate(item.name)}
                    labelStyle={{color: '#7063CF'}}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: '#7063CF',
                      width: 150,
                      marginHorizontal: 10,
                    }}
                    mode="outlined">
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.id}
                    onPress={() => setcate(item.name)}
                    labelStyle={{color: 'grey'}}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: 'grey',
                      width: 150,
                      marginHorizontal: 10,
                    }}
                    mode="outlined">
                    {item.label}
                  </Button>
                );
              })}
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              {Category2.map((item, index) => {
                return cate == item.name ? (
                  <Button
                    key={item.id}
                    onPress={() => setcate(item.name)}
                    labelStyle={{color: '#7063CF'}}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: '#7063CF',
                      width: 150,
                      marginHorizontal: 10,
                    }}
                    mode="outlined">
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.id}
                    onPress={() => setcate(item.name)}
                    labelStyle={{color: 'grey'}}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: 'grey',
                      width: 150,
                      marginHorizontal: 10,
                    }}
                    mode="outlined">
                    {item.label}
                  </Button>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bodyHeader}>
          <View style={styles.bodyMenu}>
            <TouchableOpacity
              style={{
                //borderWidth: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                backgroundColor: '#fff',
                borderRadius: 5,
                width: '45%',
                paddingVertical: 10,
              }}>
              <Text>LOCATION</Text>
              <Image
                style={{width: 20, height: 20, resizeMode: 'center'}}
                source={require('../Assets/down_arrow.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                //borderWidth: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                backgroundColor: '#fff',
                borderRadius: 5,
                width: '45%',
                paddingVertical: 10,
              }}>
              <Text>KEYWORDS</Text>
              <Image
                style={{width: 20, height: 20, resizeMode: 'center'}}
                source={require('../Assets/down_arrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{backgroundColor: '#50D3E4'}}
          showsVerticalScrollIndicator={false}>
          {renderNewsFeed()}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#5181FF',
  },
  categoryContainer: {
    marginHorizontal: 10,
    backgroundColor: '#ededed',
  },
  bodyHeader: {
    //borderWidth: 2,
  },
  bodyMenu: {
    backgroundColor: '#5CC2E8',
    //borderWidth: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyData: {
    //borderWidth: 2,
    margin: 10,
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default Home;
