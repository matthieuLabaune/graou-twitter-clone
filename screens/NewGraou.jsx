import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function NewGraou({navigation}) {

    const [graou, setGraou] = useState('');

    function sendGraou(){
        navigation.navigate('Tab')
    }
    return (
        <View style={styles.container}>
            <View style={styles.graouButtonContainer}>
                <Text style={graou.length > 250 ? styles.textRed : styles.textGray}>
                    Characters left: {280 - graou.length}
                </Text>
                <TouchableOpacity style={styles.graouButton} onPress={() => sendGraou()}>
                    <Text style={styles.graouButtonText}>GRrawwwW </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.graouBoxContainer}>
                <Image style={styles.avatar} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}></Image>
                <TextInput style={styles.input} onChangeText={setGraou} value={graou} placeholder="What's happening?" placeholderTextColor="gray" multiline maxLength={280}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textGray: {
        color: 'gray',
    },
    textRed : {
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