import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import MyFont from '../MyFont';
import { useNavigation } from '@react-navigation/core'
import tw from 'tailwind-react-native-classnames';

const data = [
    {
        id: "1",
        title: "History #1",
        screen: "ShowHistoryScreen",
    },
    {
        id: "2",
        title: "History #2",
        screen: "ShowHistoryScreen",
    },
    {
        id: "3",
        title: "History #3",
        screen: "ShowHistoryScreen",
    },
    {
        id: "4",
        title: "History #4",
        screen: "ShowHistoryScreen",
    },
    {
        id: "5",
        title: "History #5",
        screen: "ShowHistoryScreen",
    },
    {
        id: "6",
        title: "History #6",
        screen: "ShowHistoryScreen",
    },
    {
        id: "7",
        title: "History #7",
        screen: "ShowHistoryScreen",
    },
    {
        id: "8",
        title: "History #8",
        screen: "ShowHistoryScreen",
    },
];

const HistoryGrid = () => {
    const navigation = useNavigation()
    let [fontsLoaded] = MyFont();

    return (
        <View style={styles.MainContainer, tw`bg-white h-full`}>
            <FlatList
                data={data}
                keyExtractor={(item, index)=> index}
                numColumns={2}
                renderItem={({item, index}) => (
                    <View style={{ flex: 1, flexDirection: 'column', borderWidth: 1, margin: 0.2, borderColor: 'black' }}>
                        <TouchableOpacity style={tw`bg-white p-5 h-36 justify-evenly`}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <Text style={
                                    (fontsLoaded ? { fontFamily: 'Roboto_500Medium', 
                                                    fontSize: 16, 
                                                    color: 'black', 
                                                    textAlign: 'center' } : null)
                            }>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

export default HistoryGrid

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
        marginTop: 30,
    },
})
