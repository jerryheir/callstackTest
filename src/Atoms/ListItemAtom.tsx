import React from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../Styles/Colors';
import { Icon } from 'native-base';

interface Props {
  item: any
}

interface State {

}

class ListItemAtom extends React.Component<Props, State> {
  render() {
    return (
      <TouchableOpacity activeOpacity={.7} style={styles.itemContainer}>
          <View style={styles.itemTopContainer}>
            <View style={styles.itemTopInnerView}>
                <Image 
                source={require('../Images/git-logo.png')}
                style={styles.itemImage}
                />
                <View>
                    <Text>Repo: <Text style={styles.itemRepoText}>react-native-fbads</Text></Text>
                    <Text>Owner: <Text style={[styles.itemRepoText, { color: colors.black }]}>callstack-io</Text></Text>
                </View>
            </View>
            <View style={styles.itemStarView}>
                <Text style={styles.itemStarText}>88 </Text>
                <Icon type="MaterialIcons" name="star" style={styles.itemStar} />
            </View>
          </View>
          <View style={styles.itemBottomContainer}>
              <Text>{'ID-69101012'}</Text>
              <Text style={styles.itemTimeText}>{'24 Sept 2019'}</Text>
          </View>
      </TouchableOpacity>
    );
  }
};

const mapStateToProps = (state: any) => ({

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