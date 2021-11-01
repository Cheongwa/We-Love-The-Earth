import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import PloggingBefore from './PloggingBefore'
import PloggingAfter from './PloggingAfter'
import PloggingMiddle from './PloggingMiddle'
import PloggingOptions from './PloggingOptions'
import PloggingRecords from './PloggingRecords'

const PloggingMenu = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PloggingBefore"
                component={PloggingBefore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PloggingMiddle"
                component={PloggingMiddle}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PloggingAfter"
                component={PloggingAfter}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PloggingRecords"
                component={PloggingRecords}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PloggingOptions"
                component={PloggingOptions}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default PloggingMenu

const styles = StyleSheet.create({})
