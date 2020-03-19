import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import moment from "moment";
import FastImage from 'react-native-fast-image';
import { styles } from "../Styles";
import { colors } from '../Styles/Colors';
import { Icon } from 'native-base';

const Details = (props: any) => {
    const { navigation } = props;
    const { id, owner, watchers_count, open_issues_count, name, stargazers_count, created_at } = navigation.getParam('item', {})
    return (
        <SafeAreaView style={styles.detailsContainer}>
            <View style={styles.detailsHeader}>
                <Icon type="MaterialIcons" name="chevron-left" style={styles.detailsHeaderIcon} onPress={()=>props.navigation.goBack()} />
                <Text style={[styles.detailsMainText, { fontWeight: 'bold', fontSize: 21, color: colors.primary }]} onPress={()=>props.navigation.goBack()}>Details</Text>
            </View>
            <FastImage 
            source={owner.avatar_url ? { uri: owner.avatar_url, priority: FastImage.priority.high } : require('../Images/git-logo.png')}
            style={styles.detailsImage}
            />
            <Text style={styles.detailsMainText}>{id}</Text>
            <Text style={[styles.detailsMainText, { color: colors.primary, fontWeight: 'bold' }]}>{name}</Text>
            <Text style={[styles.detailsMainText, { fontWeight: 'bold' }]}>{owner.login}</Text>
            <View style={styles.detailsRowView}>
                <View style={styles.itemStarView1}>
                    <Text style={styles.itemStarText}>{stargazers_count} </Text>
                    <Icon type="MaterialIcons" name="star" style={styles.itemStar} />
                </View>
                <Text style={styles.itemStarText1}>{watchers_count} watcher(s)</Text>
                <Text style={styles.itemStarText1}>{open_issues_count} open issue(s)</Text>
            </View>
            <Text style={[styles.detailsTimeText]}>{moment(new Date(created_at)).format('Do MMM, YYYY')}</Text>
        </SafeAreaView>
    );
};

export default Details;