import React from 'react';
import { 
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
import * as _ from "underscore";
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { toggleOrder, showModal, searchGithub, sortRepo } from "../Actions/mainAction";
import { styles } from "../Styles";
import { colors } from '../Styles/Colors';

interface Props {
    open: boolean | undefined;
    showModal: (e?: String) => void;
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
    result: Array<any>;
}

class Search extends React.Component<Props, State> {
    handleInputThrottled: ((search: string) => void) & _.Cancelable;
    constructor(props: Props) {
        super(props);
        this.handleInputThrottled = _.throttle(this.updateText, 50);
        this.state = {
            search: '',
            cache: [],
            loading: false,
            result: []
        }
    }
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
    handleSubmit = async () => {
        this.setState({ loading: true })
        const { search } = this.state;
        const { searchGithub, order, showModal, sorted, sortRepo } = this.props;
        if (!search || search.includes('*******')) return this.setState({ search: '', loading: false });
        await searchGithub(search, order);
        this.setState({ search: '', loading: false })
        showModal(search);
        await sortRepo(sorted);
    }
    updateText = (search: string) => {
        const { cache } = this.state;
        let result = (cache) && cache.filter(value =>{
            if (search){
                return value.search.trim().toLowerCase().slice(0, search.trim().toLowerCase().length) === search.trim().toLowerCase()
            }
        });
        this.setState({ search, result })
    }
  render() {
    const { search, cache, loading, result } = this.state;
    const { order, open, showModal, toggleOrder, searchGithub, sortRepo, sorted } = this.props;
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={()=>showModal()}
        >
            <View style={styles.searchContainer}>
                <View style={styles.searchInputStyle}>
                    <Icon 
                    type="MaterialIcons" 
                    name="chevron-left" 
                    style={styles.searchBackIcon} 
                    onPress={()=>!loading ? showModal() : {}} 
                    />
                    <TextInput
                    value={search}
                    autoFocus={true}
                    style={styles.smallTextInput}
                    placeholder='Search Repositories'
                    maxLength={30}
                    placeholderTextColor={colors.gray}
                    onChangeText={this.handleInputThrottled}
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
                    {(loading) && <View style={[styles.searchButtonStyle, { justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 0 }]}>
                        <ActivityIndicator size="large" color={colors.white} />
                    </View>}
                </View>
                <ScrollView>
                    {
                        (cache.length > 0 && result.length > 0) && result.map((val: any, key: number)=>{
                            const searchWords = val.search.split('*******')
                            return (
                                <TouchableOpacity
                                key={key} 
                                style={styles.searchItem}
                                onPress={async ()=>{
                                    await searchGithub(searchWords[0], searchWords[1]);
                                    this.setState({ search: '', loading: false })
                                    showModal(searchWords[0]);
                                    await sortRepo(sorted);
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