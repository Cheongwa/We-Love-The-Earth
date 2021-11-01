import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import tw from 'tailwind-react-native-classnames';
import MyFont from '../MyFont';

const data = [
    {
        id: "1",
        title: "Start",
        screen: "PloggingMiddle",
    },
];

const PloggingBefore = () => {
    const navigation = useNavigation()
    let [fontsLoaded] = MyFont();

    return (
        <View 
            style={tw`mt-4`}
        >
            <FlatList
                data={data}
                keyExtractor={(item)=> item.id}
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

export default PloggingBefore

const styles = StyleSheet.create({})
