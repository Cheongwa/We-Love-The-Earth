import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MyFont from './MyFont';
import tw from 'tailwind-react-native-classnames';

const data = [
    {
        id: "1",
        title: "Profile",
        component: <MaterialCommunityIcons name="human-greeting" size={54} color="black" />,
        screen: "MySpaceScreen",
    },
    {
        id: "2",
        title: "Plogging",
        component: <FontAwesome5 name="running" size={54} color="black" />,
        screen: "PloggingScreen",
    },
];

const NavOptions = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = MyFont();
  
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>(
        <TouchableOpacity 
          style={tw`h-48 w-32 p-2 m-2 bg-gray-100 justify-evenly items-center`}
          onPress={()=>navigation.navigate(item.screen)}  
        >
            <View style={tw`p-4`}>
              {item.component}
            </View>
            <Text 
              style={
                tw`p-2`, 
                (fontsLoaded ? { fontFamily: 'Roboto_500Medium', fontSize: 18 } : null)
              }
            >
              {item.title}
            </Text>
            <Icon 
              style={tw`p-2 bg-black rounded-full w-10 m-4`}
              name="arrowright" 
              color="white" 
              type="antdesign"
            />
        </TouchableOpacity>
      )}
    />
  )
  
}

export default NavOptions;

const styles = StyleSheet.create({})
