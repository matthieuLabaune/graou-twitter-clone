import React from 'react';
import {Button, Text, View, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import {Platform as Plateform} from "react-native-web";
import {AntDesign} from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
    const DATA = [
        {
            id: '1',
            title: 'First Item',
        },
        {
            id: '2',
            title: 'Second Item',
        },
        {
            id: '3',
            title: 'Third Item',
        },
        {
            id: '4',
            title: 'Fourth Item',
        },
        {
            id: '5',
            title: 'Fifth Item',
        },
        {
            id: '6',
            title: 'Sixth Item',
        },
        {
            id: '7',
            title: 'Seventh Item',
        },
        {
            id: '8',
            title: 'Eight Item',
        },
        {
            id: '9',
            title: 'Ninth Item',
        }, {
            id: '10',
            title: 'Tenth Item',
        },
    ];

    function gotoProfile() {
        navigation.navigate('Profile Screen')
    }

    function gotoSingleGraou() {
        navigation.navigate('Graou Screen')
    }

    function gotoNewGraou() {
        navigation.navigate('New Graou')
    }

    const renderItem = ({item}) => (
        <View style={styles.graouContainer}>
            <TouchableOpacity onPress={() => gotoProfile()}>
                <Image style={styles.avatar} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}></Image>
            </TouchableOpacity>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.flexRow} onPress={() => gotoSingleGraou()}>
                    <Text numberOfLines={1} style={styles.graouName}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.graouHandle}>@mattLab</Text>
                    <Text>&middot;</Text>
                    <Text numberOfLines={1} style={styles.graouHandle}>9m</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.graouContentContainer} onPress={() => gotoSingleGraou()}>
                    <Text style={styles.graouContent}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ea nihil praesentium quia unde?
                        Obcaecati provident quas quis sint voluptatibus.
                    </Text>
                </TouchableOpacity>
                <View style={styles.graouEngagment}>
                    <TouchableOpacity style={styles.flexRow}>
                        <EvilIcons name="comment" size={22} color="gray" style={{marginRight: 2}}/>
                        <Text style={styles.textGray}>666</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <EvilIcons name="retweet" size={22} color="gray" style={{marginRight: 2}}/>
                        <Text style={styles.textGray}>476</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <EvilIcons name="heart" size={22} color="gray" style={{marginRight: 2}}/>
                        <Text style={styles.textGray}>1076</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
                        <EvilIcons name={Plateform.OS === 'ios' ? 'share-apple' : 'share-google'} size={22} color="gray"
                                   style={{marginRight: 2}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={styles.graouSeparator}></View>}
            />
            <TouchableOpacity style={styles.floatingButton}
                              onPress={() => gotoNewGraou()}
            >
                <AntDesign name="plus" size={26} color="white"
                           style={{marginRight: 2}}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    graouContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12
    },
    graouSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    avatar: {
        width: 42,
        height: 42,
        marginRight: 8,
        borderRadius: 21
    },
    flexRow: {
        flexDirection: 'row'
    },
    graouName: {
        fontWeight: 'bold',
        color: '#222222'
    },
    graouHandle: {
        marginHorizontal: 9,
        color: 'gray'
    },
    graouContentContainer: {
        marginTop: 4
    },
    graouContent: {
        lineHeight: 20,
    },
    textGray: {
        color: 'gray'
    },
    graouEngagment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },
    ml4: {
        marginLeft: 16
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d9bf1',
        position: 'absolute',
        bottom: 20,
        right: 12
    }
})