import React from 'react';
import { 
    StyleSheet, 
    SafeAreaView, 
    Text,
    View
} from 'react-native';
import moment from "moment";
import FastImage from 'react-native-fast-image';
import { colors } from '../Styles/Colors';
import { Icon } from 'native-base';

const Details = (props: any) => {
    const { navigation } = props;
    const { id, owner, watchers_count, open_issues_count, name, stargazers_count, created_at } = navigation.getParam('item', {})
    return (
        <SafeAreaView style={styles.detailsContainer}>
            <View style={styles.detailsHeader}>
                <Icon type="MaterialIcons" name="chevron-left" style={styles.detailsHeaderIcon} onPress={()=>props.navigation.goBack()} />
                <Text style={[styles.detailsMainText, { fontWeight: 'bold', fontSize: 21 }]} onPress={()=>props.navigation.goBack()}>Details</Text>
            </View>
            <FastImage 
            source={owner.avatar_url ? { uri: owner.avatar_url, priority: FastImage.priority.high } : require('../Images/git-logo.png')}
            style={styles.detailsImage}
            />
            <Text style={styles.detailsMainText}>{id}</Text>
            <Text style={[styles.detailsMainText, { color: colors.primary, fontWeight: 'bold' }]}>{name}</Text>
            <Text style={[styles.detailsMainText, { fontWeight: 'bold' }]}>{owner.login}</Text>
            <View style={styles.detailsRowView}>
                <View style={styles.itemStarView}>
                    <Text style={[styles.itemStarText, { paddingHorizontal: 0 }]}>{stargazers_count} </Text>
                    <Icon type="MaterialIcons" name="star" style={styles.itemStar} />
                </View>
                <Text style={styles.itemStarText}>{watchers_count} watchers</Text>
                <Text style={styles.itemStarText}>{open_issues_count} open issues</Text>
            </View>
            <Text style={[styles.detailsTimeText]}>{moment(new Date(created_at)).format('Do MMM, YYYY')}</Text>
        </SafeAreaView>
    );
};

export default Details;
 
const styles = StyleSheet.create({
    detailsHeader: {
        position: 'absolute',
        top: 42,
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    detailsHeaderIcon: {
        fontSize: 42
    },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsImage: {
    height: 200,
    width: 200,
    borderRadius: 8,
    marginBottom: 42
  },
  detailsRowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 32
  },
  itemStarView: {
    height: 21,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemStarText: {
    fontSize: 16,
    paddingHorizontal: 16
  },
  itemStar: {
      fontSize: 21,
      color: colors.gold
  },
  detailsMainText: {
      fontSize: 16,
      paddingVertical: 8,
      color: colors.black,
      textAlign: 'center'
  },
  detailsTimeText: {
      color: colors.gray, 
      fontSize: 16,
      textAlign: 'right', 
      fontStyle: 'italic', 
      padding: 32 
    }
});