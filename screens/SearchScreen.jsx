import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import axiosConfig from "../helpers/axiosConfig"
import RenderItem from "../components/RenderItem";
import {AuthContext} from "../context/AuthProvider";

export default function SearchScreen({route, navigation}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
    const flatListRef = useRef();
    const { user } = useContext(AuthContext);


    useEffect(() => {
        getAllTweets();
    }, [page]);

    useEffect(() => {
        if (route.params?.newTeetAdded) {
            getAllTweetsRefresh();
            flatListRef.current.scrollToOffset({ offest: 0})
        }
    }, [route.params?.newTeetAdded]);

    function getAllTweetsRefresh() {
        setPage(1);
        setIsAtEndOfScrolling(false);
        setIsRefreshing(false);

        // axiosConfig.defaults.headers.common[
        //     'Authorization'
        //     ] = `Bearer ${user.token}`;

        axiosConfig.get(`/tweets_all`)
            .then(response => {
                setData(response.data.data);
                setIsLoading(false);
                setIsRefreshing(false);
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                setIsRefreshing(false);
            });
    };

    function getAllTweets() {

        // axiosConfig.defaults.headers.common[
        //     'Authorization'
        //     ] = `Bearer ${user.token}`;

        axiosConfig.get(`/tweets_all?page=${page}`)
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

    function gotoNewGraou() {
        navigation.navigate('New Graou');
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="gray"/>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={props => <RenderItem {...props} />}
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
    graouSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
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