import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import tw from 'tailwind-react-native-classnames'

const EditProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={tw`m-2 items-center justify-evenly h-full border`}>
            <Text>My Profile</Text>
            <TouchableOpacity
                style={tw`bg-gray-300 absolute right-2 bottom-2 p-4`}
                onPress={()=>navigation.navigate("MySpaceScreen")}
            >
            <Text>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})
