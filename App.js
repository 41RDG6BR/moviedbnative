/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput,
  StatusBar,
  Modal
} from 'react-native';

function App() {
  const apiurl =  "http://www.omdbapi.com/?apikey=dfe6d885"
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {}
  })

  const search = () =>{
    axios(apiurl + "&s=" + state.s).then(({data})=>{
      let results = data.Search
      setState(prevState => {
        return { ...prevState, results: results}
      })
    })
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({data}) =>{
      let result = data;
      console.log(result)
      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  }

  let res = state.results.map(result => {
    if(result){
      return (
        <TouchableHighlight 
          key={result.imdbID} 
          onPress={() => openPopup(result.imdbID)}
        >
          <View style={styles.result}>
            <Image 
              source={{uri: result.Poster}}
              style={{
                width: '100%',
                height: 300
              }}
              resizeMode='cover'
            />
            <Text style={styles.heading}>{result.Title}</Text>
          </View>
        </TouchableHighlight>
      )
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      <TextInput 
        style={styles.searchBox}
        onChangeText={text => setState(prevState => {
          console.log(text)
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {res}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.Title != "undefined")}
      >
      <View style={styles.popup}>
        <Text style={styles.popup}>{state.selected.Title}</Text>
        <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
        <Text>{state.selected.Plot}</Text>
      </View>
      <TouchableHighlight
        onPress={() => setState(prevState => {
          return { ...prevState, selected: {}}
        })}
      >
      <Text style={styles.closeBtn}>Close</Text>
      </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20  
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'

  }, 
  popup: {
    padding: 20
  },
  poptitle:{
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
    backgroundColor: '#24B4C4'
  }
});

export default App;
