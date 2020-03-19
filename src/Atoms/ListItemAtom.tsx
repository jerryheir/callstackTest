import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "../Styles";
import moment from "moment";
import FastImage from 'react-native-fast-image';
import { colors } from '../Styles/Colors';
import { Icon } from 'native-base';

interface Props {
  index: Number;
  item: any;
  onPress: (e: any) => void;
  profile: any;
}

const ListItemAtom = (props: Props) => {
  const { item: { id, owner, name, stargazers_count, created_at }, onPress, profile } = props;
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
};

export default ListItemAtom;