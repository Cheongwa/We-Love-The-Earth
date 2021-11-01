import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import EditTool from '../components/HistoryEditor/EditTool'

const EditHistoryScreen = () => {
    return (
        <View>
            <View style={tw`h-1/2 border m-2 items-center justify-evenly`}>
                <Text>HistoryEntry</Text>
            </View>
            <View style={tw`h-1/2 border m-2 items-center justify-evenly`}>
                <EditTool/>
            </View>
        </View>
    )
}

export default EditHistoryScreen

const styles = StyleSheet.create({})
