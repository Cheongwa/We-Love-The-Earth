import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Plogging/Map'
import PloggingMenu from '../components/Plogging/PloggingMenu'

const PloggingScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
                onPress={()=>navigation.navigate("HomeScreen")}
            />
            <View style={tw`h-2/3`}>
                <Map />
            </View>
            <View style={tw`h-1/3`}>
                <PloggingMenu />
            </View>
        </View>
    )
}

export default PloggingScreen

const styles = StyleSheet.create({})
