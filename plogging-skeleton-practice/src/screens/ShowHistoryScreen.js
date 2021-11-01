import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import MyFont from '../components/MyFont'
import tw from 'tailwind-react-native-classnames'
import HistoryEntry from '../components/History/HistoryEntry'
const data = [
    {
        id: "1",
        title: "Share",
        screen: "HomeScreen",
    },
    {
        id: "2",
        title: "Edit",
        screen: "EditHistoryScreen",
    },
    {
        id: "3",
        title: "Delete",
        screen: "HistoryGrid",
    },
];

const ShowHistoryScreen = () => {
    const navigation = useNavigation();
    let [fontsLoaded] = MyFont();
    
    return (
      <View>
        <View style={tw`h-1/2 m-2 border`}>
            <HistoryEntry/>
        </View>
        <View style={tw`h-1/2 m-2 pt-24 items-center`}>
            <FlatList
            data={data}
            horizontal
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
                <TouchableOpacity 
                style={tw`w-24 h-24 p-2 m-2 bg-gray-300 justify-evenly items-center`}
                onPress={()=>navigation.navigate(item.screen)}  
                >
                    <Text 
                    style={
                        tw`p-2`, 
                        (fontsLoaded ? { fontFamily: 'Roboto_500Medium', fontSize: 18 } : null)
                    }
                    >
                    {item.title}
                    </Text>
                </TouchableOpacity>
            )}
            />
        </View>
      </View>
    )
    
}

export default ShowHistoryScreen

const styles = StyleSheet.create({})