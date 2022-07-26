import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function RegisterScreen({navigation}) {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Register Screen</Text>
            <Button onPress={() => navigation.navigate('Login Screen')} title="Se connecter" style={{marginTop:10}}></Button>
        </View>
    );
};