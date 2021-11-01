import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const Plant = () => {
    return (
        <View style={tw`pt-20 pb-36 items-center`}>
            <Image
                style={{
                    width: 200, 
                    height: 200, 
                    resizeMode: "contain",
                }} 
                source={require('../../assets/homeScreenPlant.jpg')}
            />
        </View>
    )
}

export default Plant

const styles = StyleSheet.create({})
