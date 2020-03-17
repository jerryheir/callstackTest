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

interface Props {
  
}

interface State {

}

class Home extends React.Component<Props, State> {
  renderItem = ({ item, index }: any) => {
    return (
      <ListItemAtom 
      item={item}
      />
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <HeaderAtom openModal={()=>{}} />
        <View style={styles.contentContainerStyle}>
          <FlatList 
          data={["Hello", "Hey"]}
          renderItem={this.renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={<ListEmptyAtom />}
          keyExtractor={(item, index)=>index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const mapStateToProps = (state: any) => ({

})

export default connect(mapStateToProps, {})(Home);
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.lightGray
  }
});