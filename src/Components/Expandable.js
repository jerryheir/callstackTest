import React from 'react';
import { 
    Animated, 
    StyleSheet, 
    View, 
    TouchableWithoutFeedback, 
    Text,
    Dimensions,
    FlatList
} from 'react-native';
import { Icon } from 'native-base';
import ExpandableAtom from './ExpandableAtom';

const WIDTH = Dimensions.get('window').width - 46;
const NEW_WIDTH = Dimensions.get('window').width - 23;
const HEIGHT = 60;
const NEW_HEIGHT = Dimensions.get('window').height - 100;

export default class Expandable extends React.Component {
  constructor(){
    super();
    this.state={
      animationValue : new Animated.ValueXY({ x: WIDTH, y: HEIGHT }),
      viewState: true,
      data: [
        {
            title: 'PRINT ID - 234567',
            seat: '13',
            from: 'CMS',
            to: 'Lekki'
        },
        {
            title: 'Charles',
            seat: '14',
            from: 'CMS',
            to: 'Lekki'
        },
        {
            title: 'Tade',
            seat: '15-17',
            from: 'CMS',
            to: 'Lekki'
        },
        {
            title: 'Taiwo',
            seat: '18',
            from: 'CMS',
            to: 'Lekki'
        }
      ]
    }
  }
 
  toggleAnimation = () => {
    if (this.state.viewState == true) {
        Animated.timing(this.state.animationValue, {
            toValue: { x: NEW_WIDTH, y: NEW_HEIGHT },
            timing: 1500
        }).start(()=>{
            this.setState({viewState : false})
        });
    } else {
        Animated.timing(this.state.animationValue, {
            toValue: { x: WIDTH, y: HEIGHT },
            timing: 1500
        }).start(this.setState({viewState: true}));
    }
  }

  renderItem = ({ item }) => {
    return (
        <ExpandableAtom 
        item={item}
        />
    )
  }
 
  render() {
    const animatedStyle = {
      height: this.state.animationValue.y,
      width: this.state.animationValue.x
    }
    const { viewState, data } = this.state;
    return (
        <View style={styles.mainContainer}>
           <Animated.View style={[styles.animatedBox, animatedStyle]}>
               <View style={styles.main}>
                <View style={styles.justRow}>
                    <Text style={styles.text}>Ride Requests</Text>
                    <Text style={styles.newText}>New</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.toggleAnimation}>
                        <Icon 
                        type="Feather"
                        name={viewState ? "chevron-up" : "chevron-down"}
                        style={styles.icon}
                        />
                </TouchableWithoutFeedback>
               </View>
               <FlatList 
               data={data}
               renderItem={this.renderItem}
               keyExtractor={(item, index)=>index.toString()}
               />
           </Animated.View> 
        </View>
    );
  }
};
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems : 'center',
    padding: 12,
    paddingBottom: 50,
    backgroundColor : '#c0c0c0'
  },
  main: {
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animatedBox: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingLeft: 21,
    borderRadius: 3
  },
  text:{
    color: '#26142a',
    fontSize: 24,
    fontWeight: 'bold'
  },
  justRow: {
    flexDirection: 'row'
  },
  newText: {
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0091EA'
  },
  icon: {
    color: '#26142a'
  }
});