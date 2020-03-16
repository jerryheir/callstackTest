import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text
} from 'react-native';
import { connect } from 'react-redux';

interface Props {
  
}

interface State {

}

class Home extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Here it is</Text>
      </View>
    );
  }
};

const mapStateToProps = (state: any) => ({

})

export default connect(mapStateToProps, {})(Home);
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});