import React, { useContext, useState } from 'react';
import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useContext(AuthContext);

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Login Screen</Text>
            <TextInput onChangeText={setEmail} value={email} placeholder="Email" textContentType="emailAddress" keyboardType="email-address" autoCapitalize="none"></TextInput>
            <TextInput onChangeText={setPassword} value={password} placeholder="Password" autoCapitalize="none" secureTextEntry={true} ></TextInput>
            <Button onPress={() => login(email, password)} title="Se connecter"></Button>
            <Button onPress={() => navigation.navigate('Register Screen')} title="Enregistrer un nouveau compte" style={{marginTop:10}}></Button>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {isLoading && (
                <ActivityIndicator style={{ marginTop: 8 }} size="small" color="gray" />
            )}
        </View>
    );
};