import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import MyFont from '../MyFont'
import tw from 'tailwind-react-native-classnames'

const HistoryEntry = () => {
    const navigation = useNavigation();
    let [fontsLoaded] = MyFont();
    
    return (
      <View style={tw`items-center justify-evenly h-full`}>
        <Text>HistoryEntry</Text>
      </View>
    )
    
}

export default HistoryEntry

const styles = StyleSheet.create({})
