import React from 'react';
import { Button, Text, View } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Home Screen / Feed</Text>
            <Button title="New Graou" onPress={() => navigation.navigate('New Graou')} />
            <Button title="Graou Screen" onPress={() => navigation.navigate('Graou Screen')} />
            <Button title="Profile Screen" onPress={() => navigation.navigate('Profile Screen')} />
        </View>
    );
};