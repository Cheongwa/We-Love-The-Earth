import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import MyFont from '../MyFont';
import { useNavigation } from '@react-navigation/core'

const data = [
    {
        id: "1",
        title: "Plogging Options",
        screen: "PloggingOptions",
    },
    {
        id: "2",
        title: "Plogging Records",
        screen: "PloggingRecords",
    },
    {
        id: "3",
        title: "Finish",
        screen: "PloggingAfter",
    }
];

const PloggingMiddle = () => {
    const navigation = useNavigation()
    let [fontsLoaded] = MyFont();

    return (
        <View 
            style={tw`mt-4`}
        >
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                ItemSeparatorComponent={() => (
                    <View style={[tw`bg-gray-200`, {height: 0.5}]}></View>
                )}
                renderItem={({item}) => (
                    <TouchableOpacity style={tw`bg-gray-900 p-5 m-2 justify-evenly rounded-full`}
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <Text style={
                                (fontsLoaded ? { fontFamily: 'Roboto_500Medium', 
                                                 fontSize: 16, 
                                                 color: 'white', 
                                                 textAlign: 'center' } : null)
                        }>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default PloggingMiddle

const styles = StyleSheet.create({})
