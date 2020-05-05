import  * as React  from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// You can import from local files
import HomeScreen from './screens/HomeScreen';
import SubmitScreen from './screens/SubmitScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Submit" 
          component={SubmitScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


  

