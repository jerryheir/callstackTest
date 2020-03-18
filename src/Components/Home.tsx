import React from 'react';
import { 
    StyleSheet, 
    SafeAreaView, 
    View,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import HeaderAtom from '../Atoms/HeaderAtom';
import { colors } from '../Styles/Colors';
import ListItemAtom from '../Atoms/ListItemAtom';
import ListEmptyAtom from '../Atoms/ListEmptyAtom';
import Search from './Search';

interface Props {
  repos: Array<any>;
  viewRepos: Array<any>;
  navigation: any;
}

interface State {}

class Home extends React.Component<Props, State> {
  flatList: any;
  renderItem = ({ item, index }: any) => {
    return (
      <ListItemAtom 
      index={index}
      item={item}
      onPress={()=>this.props.navigation.navigate('Details', { item })}
      />
    )
  }
  render() {
    const { navigation, viewRepos } = this.props;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <HeaderAtom 
        scrollToTop={()=>this.flatList.scrollToOffset({x: 0, y: 0, animated: true})} 
        navigation={navigation}
        />
        <View style={styles.contentContainerStyle}>
          <FlatList 
          ref={(ref)=>this.flatList=ref}
          onContentSizeChange={()=>this.flatList.scrollToOffset({x: 0, y: 0, animated: true})}
          data={viewRepos}
          renderItem={this.renderItem}
          contentContainerStyle={[styles.contentContainerStyle, { flex: 0 }]}
          ListEmptyComponent={<ListEmptyAtom />}
          keyExtractor={(item, index)=>index.toString()}
          />
          <Search />
        </View>
      </SafeAreaView>
    );
  }
};

const mapStateToProps = (state: any) => ({
  repos: state.main.repos,
  viewRepos: state.main.viewRepos
})

export default connect(mapStateToProps, {})(Home);
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingBottom: 5
  }
});