import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from "native-base";
import { connect } from 'react-redux';
import { changeRowsRendered, move, runLogout, sortRepo, showModal } from "../Actions/mainAction";
import { colors } from '../Styles/Colors';
import { styles } from "../Styles";
import PickerAtom from './PickerAtom';

const FILTER_ARRAY = require('../config/sorting.json');
const ROWS_RENDERED = [ 5, 10, 15, 20 ];

interface Props {
  showModal: (event: any) => void;
  changeRowsRendered: Function;
  move: Function;
  runLogout: Function;
  sortRepo: Function;
  scrollToTop: Function;
  rowsRendered: Number;
  reposLength: Number;
  totalPageNumber: Number;
  pageNumber: Number;
  sorted: any;
  navigation: any;
}

class HeaderAtom extends React.PureComponent<Props> {
  logout = async (format: any) => {await this.props.runLogout(),this.props.navigation.navigate('Login')};
  runMove = (boolean: Boolean) => {this.props.move(boolean),this.props.scrollToTop()}
  changeRows = async (num: any)=>await this.props.changeRowsRendered(num);
  sort = async (object: any)=>{await this.props.sortRepo(object),this.props.scrollToTop()}
  render() {
    const { showModal, rowsRendered, reposLength, totalPageNumber, pageNumber, sorted } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTopView}>
          <TouchableOpacity activeOpacity={.7} onPress={showModal} style={styles.inputStyle}>
            <Text style={styles.headerSearchText}>Search Repositories</Text>
            <Icon type="Feather" name="search" />
          </TouchableOpacity>
          <PickerAtom list={["Log out"]} onPress={this.logout}>
            <Icon type="Feather" name="menu" />
          </PickerAtom>
        </View>
        <View style={styles.headerTopView}>
          <View>
            <Text style={[styles.resultText, { textAlign: 'left' }]}>Rows per page</Text>
            <PickerAtom list={ROWS_RENDERED} onPress={this.changeRows}>
              <View style={styles.dropDownButton}>
                  <Text style={styles.dropDownText}>{rowsRendered}</Text>
                  <Icon type="Feather" name="chevron-down" style={styles.dropDownIcon} />
              </View>
            </PickerAtom>
          </View>
          <View>
            <Text style={styles.resultText}>{reposLength} results ({totalPageNumber} pages)</Text>
            <View style={styles.paginationView}>
              <TouchableOpacity 
              activeOpacity={.7} 
              style={[styles.pagButton, { backgroundColor: (pageNumber <= 1) ? colors.white : colors.primary }]} 
              disabled={(pageNumber <= 1) ? true : false}
              onPress={()=>this.runMove(false)}>
                <Icon 
                type="Feather" 
                name="chevron-left" 
                style={[styles.pagIcon, { color: (pageNumber <= 1) ? colors.black : colors.white }]} />
              </TouchableOpacity>
              <View style={[styles.pagButton, { backgroundColor: colors.white }]}>
                <Text style={styles.pagText}>{pageNumber}</Text>
              </View>
              <TouchableOpacity 
              activeOpacity={.7} 
              style={[styles.pagButton, { backgroundColor: (totalPageNumber === pageNumber) ? colors.white : colors.primary }]} 
              disabled={(totalPageNumber === pageNumber) ? true : false}
              onPress={()=>this.runMove(true)}>
                <Icon 
                type="Feather" 
                name="chevron-right" 
                style={[styles.pagIcon, { color: (totalPageNumber === pageNumber) ? colors.black : colors.white }]} />
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
              <PickerAtom list={FILTER_ARRAY} onPress={this.sort}>
                <View style={[styles.dropDownButton, { height: 50, width: 250 }]}>
                    <Text style={[styles.dropDownText, { fontSize: 14 }]}>{sorted !== {} ? sorted.display : ' '}</Text>
                    <Icon type="Feather" name="chevron-down" style={styles.dropDownIcon} />
                </View>
              </PickerAtom>
            </View>
        </View>
      </View>
    );
  }
};

const mapStateToProps = (state: any) => ({
  rowsRendered: state.main.rowsRendered,
  reposLength: state.main.reposLength,
  totalPageNumber: state.main.totalPageNumber,
  pageNumber: state.main.pageNumber,
  sorted: state.main.sorted
})

export default connect(mapStateToProps, { changeRowsRendered, move, runLogout, sortRepo, showModal })(HeaderAtom);