import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import tw from 'tailwind-react-native-classnames'
import MyHistories from '../components/MySpace/MyHistories'
import MyProfile from '../components/MySpace/MyProfile'

const PloggingScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
                onPress={()=>navigation.navigate("HomeScreen")}
            />
            <View style={tw`h-1/2 m-2`}>
                <MyProfile></MyProfile>
            </View>
            <View style={tw`h-1/2 m-2`}>
                <MyHistories></MyHistories>
            </View>
        </View>
    )
}

export default PloggingScreen

const styles = StyleSheet.create({})
