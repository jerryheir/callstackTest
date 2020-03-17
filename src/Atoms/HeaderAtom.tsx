import React from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import { Icon } from "native-base";
import { connect } from 'react-redux';
import { colors } from '../Styles/Colors';
import Menu from "react-native-material-menu";

const FILTER_ARRAY = require('../config/sorting.json');
const ROWS_RENDERED = [ "5", "10", "15", "20" ];

interface Props {
  openModal: (event: any) => void;
}

interface State {

}

class Home extends React.Component<Props, State> {
  menu: any;
  menu0: any;
  menu1: any;
  constructor(props: Props){
    super(props);
    this.menu = null;
  }
  setMenuRef = (ref: any) => this.menu = ref;
  hideMenu = (format: String) => { this.menu.hide();};
  showMenu = () => this.menu.show();
  setMenuRef0 = (ref: any) => this.menu0 = ref;
  hideMenu0 = (format: any) => { this.menu0.hide(); };
  showMenu0 = () => this.menu0.show();
  setMenuRef1 = (ref: any) => this.menu1 = ref;
  hideMenu1 = (format: any) => { this.menu1.hide(); };
  showMenu1 = () => this.menu1.show();
  render() {
    const { openModal } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTopView}>
          <TouchableOpacity activeOpacity={.7} onPress={openModal} style={styles.inputStyle}>
            <Text style={styles.headerSearchText}>Search Repositories</Text>
            <Icon type="Feather" name="search" />
          </TouchableOpacity>
          <Menu ref={this.setMenuRef0} button={<Icon type="Feather" name="menu" onPress={this.showMenu0} />}>
            <TouchableOpacity style={[styles.dropDownItemView, { width: 180 }]} onPress={this.hideMenu0}>
              <Text style={styles.dropDownText}>{'Log Out'}</Text>
            </TouchableOpacity>
          </Menu>
        </View>
        <View style={styles.headerTopView}>
          <View>
            <Text style={[styles.resultText, { textAlign: 'left' }]}>Rows per page</Text>
            <Menu
            ref={this.setMenuRef}
            button={<TouchableOpacity style={styles.dropDownButton} onPress={this.showMenu}>
                <Text style={styles.dropDownText}>{'5'}</Text>
                <Icon type="Feather" name="chevron-down" style={styles.dropDownIcon} />
            </TouchableOpacity>}
            >
                {
                  ROWS_RENDERED.map((value, key)=>(
                    <TouchableOpacity key={key} style={styles.dropDownItemView} onPress={()=>this.hideMenu(value)}>
                      <Text style={styles.dropDownText}>{value}</Text>
                    </TouchableOpacity>
                  ))
                }
            </Menu>
          </View>
          <View>
            <Text style={styles.resultText}>70 results (14 pages)</Text>
            <View style={styles.paginationView}>
              <TouchableOpacity activeOpacity={.7} style={styles.pagButton}>
                <Icon type="Feather" name="chevron-left" style={styles.pagIcon} />
              </TouchableOpacity>
              <View style={[styles.pagButton, { backgroundColor: colors.white }]}>
                <Text style={styles.pagText}>1</Text>
              </View>
              <TouchableOpacity activeOpacity={.7} style={styles.pagButton}>
                <Icon type="Feather" name="chevron-right" style={styles.pagIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.headerTopView}>
          <View>
            <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}></Text>
          </View>
          <View>
              <Text style={[styles.resultText]}>Filter List</Text>
              <Menu
              ref={this.setMenuRef1}
              button={<TouchableOpacity style={[styles.dropDownButton, { height: 50, width: 220 }]} onPress={this.showMenu1}>
                  <Text style={[styles.dropDownText, { fontSize: 14 }]}>{'ID (Ascending)'}</Text>
                  <Icon type="Feather" name="chevron-down" style={styles.dropDownIcon} />
              </TouchableOpacity>}
              >
                  {
                    FILTER_ARRAY.map((value: any, key: string | number | undefined)=>(
                      <TouchableOpacity key={key} style={[styles.dropDownItemView, { height: 44, minWidth: 250, maxWidth: 300 }]} onPress={()=>this.hideMenu1(value)}>
                        <Text style={[styles.dropDownText, { fontSize: 14 }]}>{value.display}</Text>
                      </TouchableOpacity>
                    ))
                  }
              </Menu>
            </View>
        </View>
      </View>
    );
  }
};

const mapStateToProps = (state: any) => ({

})

export default connect(mapStateToProps, {})(Home);
 
const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: colors.white
  },
  headerTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11
  },
  inputStyle: {
    height: 50, 
    width: '85%',
    borderRadius: 25,
    flexDirection: 'row',
    paddingHorizontal: 16, 
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray
  },
  headerSearchText: {
    color: colors.gray,
    fontSize: 21
  },
  paginationView: { 
    flexDirection: 'row' 
  },
  pagIcon: { 
    height: 30, 
    width: 30,
    marginRight: 3,
    color: colors.white
  },
  pagText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black
  },
  pagButton: {
    height: 56,
    width: 56,
    borderRadius: 28,
    borderColor: colors.primary,
    borderWidth: .5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginLeft: 11
  },
  resultText: {
    textAlign: 'right',
    color: colors.black,
    paddingBottom: 11
  },
  dropDownButton: {
      height: 56,
      width: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.white,
      borderColor: colors.primary,
      borderWidth: .5
  },
  dropDownText: { 
      fontSize: 18, 
      color: colors.primary 
  },
  dropDownIcon: { 
      fontSize: 32, 
      color: colors.primary 
  },
  dropDownItemView: {
      flex: 1,
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 21,
      minWidth: 100,
      maxWidth: 200,
      backgroundColor: colors.lightGray
  },
});