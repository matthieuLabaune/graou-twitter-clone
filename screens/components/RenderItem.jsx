import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import {Platform as Plateform} from "react-native-web";
import {formatDistanceToNowStrict} from "date-fns";
import {useNavigation} from "@react-navigation/native";

export default function RenderItem({item: tweet}){
const navigation = useNavigation();

    function gotoProfile(userId) {
        navigation.navigate('Profile Screen', {
            userId: userId,
        });
    }

    function gotoSingleGraou(tweetId) {
        navigation.navigate('Graou Screen', {
            tweetId: tweetId
        });
    }

    return(
    <View style={styles.graouContainer}>
        <TouchableOpacity onPress={() => gotoProfile(tweet.user.id)}>
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
    )}

const styles = StyleSheet.create({
    graouContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12
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
})