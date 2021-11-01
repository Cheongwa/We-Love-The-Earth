import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/core'

const MyProfile = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`items-center justify-evenly h-full border`}>
            <Text>My Profile</Text>
            <TouchableOpacity
                style={tw`bg-gray-300 absolute right-2 bottom-2 p-4`}
                onPress={()=>navigation.navigate("EditProfileScreen")}
            >
            <Text>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({})
