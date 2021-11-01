import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import MyFont from '../MyFont';
import { useNavigation } from '@react-navigation/core'
import HistoryGrid from '../History/HistoryGrid';
import HistoryEntry from '../History/HistoryEntry';
import { createStackNavigator } from '@react-navigation/stack';

const MyHistories = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HistoryGrid"
                component={HistoryGrid}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HistoryEntry"
                component={HistoryEntry}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default MyHistories

const styles = StyleSheet.create({})
