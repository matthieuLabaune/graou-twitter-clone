import React, {useContext, useState} from 'react';
import {ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axiosConfig from "../helpers/axiosConfig"
import {AuthContext} from "../context/AuthProvider";

export default function NewGraou({navigation}) {

    const [graou, setGraou] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    function sendGraou() {
        if (graou.length === 0) {
            Alert.alert('Veuillez entrer au moins UN charactère !')
            return;
        }
        setIsLoading(true);

        axiosConfig.defaults.headers.common[
            'Authorization'
            ] = `Bearer ${user.token}`;

        axiosConfig.post(`/tweets/`, {
            body: graou
        })
            .then(response => {
                navigation.navigate('Home1', {
                    newTeetAdded: response.data
                });
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.graouButtonContainer}>
                <Text style={graou.length > 250 ? styles.textRed : styles.textGray}>
                    Characters left: {280 - graou.length}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {isLoading && (
                        <ActivityIndicator size="small" color="gray" style={{marginRight: 8}}/>
                    )}
                    <TouchableOpacity style={styles.graouButton} onPress={() => sendGraou()}
                                      disabled={isLoading}
                    >
                        <Text style={styles.graouButtonText}>GRrawwwW </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.graouBoxContainer}>
                <Image style={styles.avatar} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}></Image>
                <TextInput style={styles.input} onChangeText={setGraou} value={graou} placeholder="What's happening?"
                           placeholderTextColor="gray" multiline maxLength={280}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textGray: {
        color: 'gray',
    },
    textRed: {
        color: 'red'
    },
    ml4: {
        marginLeft: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 10
    },
    graouButtonContainer: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    graouButton: {
        backgroundColor: '#1d9bf1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    graouButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    avatar: {
        width: 42,
        height: 42,
        marginRight: 8,
        marginTop: 10,
        borderRadius: 21
    },
    graouBoxContainer: {
        flexDirection: 'row',
        paddingTop: 10
    },
    input: {
        flex: 1,
        fontSize: 18,
        lineHeight: 28,
        padding: 10
    }
});