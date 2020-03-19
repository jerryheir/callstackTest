import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HeaderAtom from '../Atoms/HeaderAtom';
import { styles } from "../Styles";
import ListItemAtom from '../Atoms/ListItemAtom';
import ListEmptyAtom from '../Atoms/ListEmptyAtom';
import Search from './Search';

interface Props {
  repos: Array<any>;
  viewRepos: Array<any>;
  navigation: any;
  loading: Boolean;
  profile: any;
}

class Home extends React.PureComponent<Props> {
  flatList: any;
  renderItem = ({ item, index }: any) => {
    return (
      <ListItemAtom 
        index={index}
        profile={this.props.profile}
        item={item}
        onPress={()=>this.props.navigation.navigate('Details', { item })}
        />
    )
  }
  scrollToTop = () => this.flatList.scrollToOffset({x: 0, y: 0, animated: true});
  render() {
    const { navigation, viewRepos, loading } = this.props;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <HeaderAtom 
        scrollToTop={this.scrollToTop} 
        navigation={navigation}
        />
        <View style={styles.contentContainerStyle}>
          <FlatList 
          ref={(ref)=>this.flatList=ref}
          onContentSizeChange={this.scrollToTop}
          data={viewRepos}
          renderItem={this.renderItem}
          contentContainerStyle={[styles.contentContainerStyle, { flex: 0 }]}
          ListEmptyComponent={<ListEmptyAtom loading={loading} />}
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
  viewRepos: state.main.viewRepos,
  loading: state.main.loading,
  profile: state.main.profile
})

export default connect(mapStateToProps, {})(Home);