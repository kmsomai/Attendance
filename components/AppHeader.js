import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function  AppHeader (){
  return(
    <View style= {styles.textContainer}>
      <Text style={styles.text}>
        STUDENT    ATTENDENCE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer:{
    flex:1,
    backgroundColor: 'blue',
  },
  text:{
    color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

