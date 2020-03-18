import React from 'react';
import { 
    StyleSheet, 
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    View, 
    Modal,
    TextInput,
    Switch,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { toggleOrder, showModal, searchGithub, sortRepo } from "../Actions/mainAction";
import { colors } from '../Styles/Colors';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    open: boolean | undefined;
    showModal: () => void;
    order: String;
    toggleOrder: (foo: boolean) => void;
    searchGithub: Function;
    sortRepo: Function;
    sorted: any;
}

interface State {
    search: string | undefined;
    cache: Array<any>;
    loading: Boolean;
}

class Search extends React.Component<Props, State> {
    async componentDidMount(){
        const storedKeys = await AsyncStorage.getAllKeys();
        const keys = storedKeys.filter(val=> val.includes('*******'));
        const result = await AsyncStorage.multiGet(keys);
        const cache = result.map(value=>{
            const str = value[1];
            if (str){
                return {
                    search: value[0],
                    ...JSON.parse(str)[0]
                }
            }
        })
        this.setState({ cache })
    }
    state: State = {
        search: '',
        cache: [],
        loading: false
    }
    handleSubmit = async () => {
        this.setState({ loading: true })
        const { search } = this.state;
        const { searchGithub, order, showModal, sorted, sortRepo } = this.props;
        if (!search) return;
        await searchGithub(search, order);
        this.setState({ search: '', loading: false })
        showModal();
        await sortRepo(sorted);
    }
    updateText = (search: string) => {
        this.setState({ search })
    }
  render() {
    const { search, cache, loading } = this.state;
    const { order, open, showModal, toggleOrder, searchGithub } = this.props;
    const word = search ? search : '';
    let result = (cache) && cache.filter(value =>{
        return value.search.trim().toLowerCase().slice(0, word.trim().toLowerCase().length) === word.trim().toLowerCase()
    });
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={showModal}
        >
            <View style={styles.searchContainer}>
                <View style={styles.inputStyle}>
                    <Icon 
                    type="MaterialIcons" 
                    name="chevron-left" 
                    style={styles.searchBackIcon} 
                    onPress={!loading ? showModal : undefined} 
                    />
                    <TextInput
                    value={search}
                    autoFocus={true}
                    style={styles.smallTextInput}
                    placeholder='Search Repositories'
                    maxLength={30}
                    placeholderTextColor={colors.gray}
                    onChangeText={this.updateText}
                    />
                </View>
                <View style={[styles.searchItem, { marginHorizontal: 0 }]}>
                    <View style={styles.switchView}>
                        <Switch 
                        thumbColor={colors.white} 
                        trackColor={{ false: colors.white, true: colors.primary }} 
                        ios_backgroundColor={order === 'asc' ? colors.primary : colors.gray}
                        value={order === 'asc' ? true : false}
                        onValueChange={toggleOrder}
                        />
                        <Text style={styles.switchText}>{order === 'asc' ? "Ascending" : "Descending"}</Text>
                    </View>
                    {(!loading) && <TouchableOpacity style={styles.searchButtonStyle} onPress={this.handleSubmit}>
                        <Text style={styles.searchButtonText}>SEARCH</Text>
                        <Icon type="Feather" name="search" style={styles.searchButtonIcon} />
                    </TouchableOpacity>}
                    {(loading) && <View style={[styles.searchButtonStyle, { justifyContent: 'center', paddingHorizontal: 32 }]}>
                        <ActivityIndicator size="large" color={colors.white} />
                    </View>}
                </View>
                <ScrollView>
                    {
                        (cache.length > 0 && word.length > 0) && result.map((val: any, key: number)=>{
                            const searchWords = val.search.split('*******')
                            return (
                                <TouchableOpacity
                                key={key} 
                                style={styles.searchItem}
                                onPress={async ()=>{
                                    await searchGithub(searchWords[0], searchWords[1]);
                                    this.setState({ search: '', loading: false })
                                    showModal();
                                }}
                                >
                                    <View>
                                        <Text style={styles.searchText}>{searchWords[0]}</Text>
                                        <Text>{searchWords[1] === "asc" ? "Ascending" : "Descending"}</Text>
                                    </View>
                                    <Icon type="MaterialIcons" name="access-time" />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </Modal>
    );
  }
};

const mapStateToProps = (state: any) => ({
    open: state.main.open,
    order: state.main.order,
    sorted: state.main.sorted
})

export default connect(mapStateToProps, { showModal, toggleOrder, searchGithub, sortRepo })(Search);
 
const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 62,
  },
  searchBackIcon: {
      fontSize: 42
  },
  smallTextInput: {
    fontSize: 21,
    width: '100%'
  },
  inputStyle: {
    height: 50, 
    borderRadius: 25,
    flexDirection: 'row',
    paddingHorizontal: 16, 
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray
  },
  searchItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: colors.gray,
    borderBottomWidth: .5,
    marginHorizontal: 16
  },
  searchText: {
    fontSize: 16,
    fontWeight: '600'
  },
  searchButtonStyle: {
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingHorizontal: 21,
    paddingVertical: 11,
    alignItems: 'center'
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    paddingRight: 16
  },
  searchButtonIcon: {
      color: colors.white,
      fontSize: 21,
      height: 21,
      width: 21
  },
  switchView: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  switchText: {
      paddingLeft: 16,
      fontSize: 16
  }
});