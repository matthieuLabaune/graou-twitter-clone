import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import {Platform as Plateform} from "react-native-web";
import {AntDesign} from '@expo/vector-icons';
import axiosConfig from "../helpers/axiosConfig"
import {formatDistanceToNowStrict} from "date-fns";

export default function HomeScreen({navigation}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);

    useEffect(() => {
        getAllTweets();
    }, [page])

    function getAllTweets() {
        axiosConfig.get(`/tweets?page=${page}`)
            .then(response => {
                if (page === 1) {
                    setData(response.data.data);
                } else {
                    setData([...data, ...response.data.data]);
                }

                if (!response.data.next_page_url) {
                    setIsAtEndOfScrolling(true);
                } else {
                    setIsAtEndOfScrolling(false);
                }

                setIsLoading(false);
                setIsRefreshing(false);
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                setIsRefreshing(false);
            });
    }

    function handleRefresh() {
        setPage(1);
        setIsAtEndOfScrolling(false)
        setIsRefreshing(true);
        getAllTweets();
    }

    function handleEnd() {
        setPage(page + 1);
    }

    function gotoProfile() {
        navigation.navigate('Profile Screen');
    }

    function gotoSingleGraou(tweetId) {
        navigation.navigate('Graou Screen', {
            tweetId: tweetId
        });
    }

    function gotoNewGraou() {
        navigation.navigate('New Graou');
    }

    const renderItem = ({item: tweet}) => (
        <View style={styles.graouContainer}>
            <TouchableOpacity onPress={() => gotoProfile()}>
                <Image style={styles.avatar} source={{uri: tweet.user.avatar}}></Image>
            </TouchableOpacity>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.flexRow} onPress={() => gotoSingleGraou(tweet.id)}>
                    <Text numberOfLines={1} style={styles.graouName}>{tweet.user.name}</Text>
                    <Text numberOfLines={1} style={styles.graouHandle}>@{tweet.user.username}</Text>
                    <Text>&middot;</Text>
                    <Text numberOfLines={1}
                          style={styles.graouHandle}>{formatDistanceToNowStrict(new Date(tweet.created_at))}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.graouContentContainer} onPress={() => gotoSingleGraou(tweet.id)}>
                    <Text style={styles.graouContent}>
                        {tweet.body}
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
            {isLoading ? (
                <ActivityIndicator size="large" color="gray"/>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.graouSeparator}></View>}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    onEndReached={handleEnd}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => !isAtEndOfScrolling && (<ActivityIndicator size="large" color="gray"/>)}
                />
            )}
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