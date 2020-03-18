import React from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";
import FastImage from 'react-native-fast-image';
import { colors } from '../Styles/Colors';
import { Icon } from 'native-base';

interface Props {
  index: Number;
  item: any;
  profile: any;
  onPress: (e: any) => void;
}

interface State {}

class ListItemAtom extends React.Component<Props, State> {
  render() {
    const { item: { id, owner, name, stargazers_count, created_at }, profile, onPress } = this.props;
    return (
      <TouchableOpacity activeOpacity={.7} style={owner.login === profile.nickname ? styles.itemContainerOwner : styles.itemContainer} onPress={onPress}>
          <View style={styles.itemTopContainer}>
            <View style={styles.itemTopInnerView}>
                <FastImage
                source={owner.avatar_url ? { uri: owner.avatar_url, priority: FastImage.priority.high } : require('../Images/git-logo.png')}
                style={styles.itemImage}
                />
                <View>
                    <Text>Repo: <Text style={styles.itemRepoText}>{name.length > 15 ? name.substring(0, 15) + '...' : name}</Text></Text>
                    <Text>Owner: <Text style={[styles.itemRepoText, { color: colors.black }]}>{owner.login.length > 20 ? owner.login.substring(0, 20) + '...' : owner.login}</Text></Text>
                </View>
            </View>
            <View style={styles.itemStarView}>
                <Text style={styles.itemStarText}>{stargazers_count} </Text>
                <Icon type="MaterialIcons" name="star" style={styles.itemStar} />
            </View>
          </View>
          <View style={styles.itemBottomContainer}>
              <Text>{id}</Text>
              <Text style={styles.itemTimeText}>{moment(new Date(created_at)).format('YYYY-MM-DD')}</Text>
          </View>
      </TouchableOpacity>
    );
  }
};

const mapStateToProps = (state: any) => ({
  profile: state.main.profile
})

export default connect(mapStateToProps, {})(ListItemAtom);
 
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    height: 110,
    width: Dimensions.get('window').width - 32,
    borderRadius: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginTop: 11
  },
  itemContainerOwner: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    height: 110,
    width: Dimensions.get('window').width - 32,
    borderRadius: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginTop: 11,
    borderColor: colors.gold,
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.5,
    shadowOffset: { width: 0, height: 1.5 },
    elevation: 3
  },
  itemTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTopInnerView: {
    flexDirection: 'row'
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 4,
    marginRight: 16
  },
  itemStarView: {
    height: 21,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemStarText: {
    fontSize: 16
  },
  itemStar: {
      fontSize: 21,
      color: colors.gold
  },
  itemBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTimeText: {
    color: colors.gray,
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '600'
  },
  itemRepoText: {
      color: colors.primary,
      fontWeight: '600'
  }
});