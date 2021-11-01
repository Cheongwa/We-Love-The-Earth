import React, {useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import MyFont from '../components/MyFont'
import { setCurrentPosition } from '../slices/ploggingSlice'
import { selectCurrentPosition } from '../slices/ploggingSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const HomeScreen = () => {
    let [fontsLoaded] = MyFont();
    const dispatch = useDispatch();
    const currentPosition = useSelector(selectCurrentPosition); 

    useEffect(() => {
        if(currentPosition===null){
            dispatch(setCurrentPosition({
                latitude: 35.91395373474155,
                longitude: 127.73829440215488,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }))
        }
    }, [])
    

    return (
        <SafeAreaView style={tw`bg-white h-full flex-1 pt-12 `}>
            <View style={tw`p-2 m-2 mb-4`}>
                <Text
                    style={ 
                        (fontsLoaded ? { fontFamily: 'Roboto_700Bold', fontSize: 36 } : null)
                    }
                >
                    PLOGGING
                </Text>  
                {/* Navigation Bar */}
            </View>
            <NavOptions />
            <View style={tw`bg-blue-50 h-1/2 border-t border-gray-300`}>
                <Text>1. Screen / Component Design </Text>
                <Text>  - Go-To Components</Text>
                <Text>  - Styles Tool</Text>
                <Text>  - What Package</Text>
                <Text>  - Folder</Text>
                <Text>2. Navigation</Text>
                <Text>  - Home Bar (Main Stack Navigator)</Text>
                <Text>  - Embedded Navigation </Text>
                <Text>  - Use-Flow </Text>
                <Text>3. Assets </Text>
                <Text>  - What Slices? </Text>
                <Text>  - Data Location at which Component? </Text>
                <Text>  - Loading Font </Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
