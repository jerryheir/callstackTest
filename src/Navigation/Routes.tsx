import React from 'react';
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { searchGithub, getUser } from "../Actions/mainAction";
import Login from '../Components/Login'
import Home from '../Components/Home';
import Details from '../Components/Details';
import { colors } from '../Styles/Colors';
import { styles } from '../Styles';

interface Props {
  searchGithub: Function;
  getUser: Function;
}

interface State {
    routeName: String
}

class Routes extends React.Component<Props, State> {
    async componentDidMount(){
        const { searchGithub, getUser } = this.props;
        await searchGithub('a');
        const data = await Keychain.getGenericPassword();
        if (data){
            const result = await getUser(data.password);
            return this.setState({ routeName: (!result) ? 'Login' : 'Home' })
        }
        return this.setState({ routeName: 'Login' });
    }
    state = {
        routeName: ''
    }
    render() {
        const MainStack = createStackNavigator(
            {
                Login: {
                    screen: Login,
                    navigationOptions: {
                        gestureEnabled: false,
                    },
                },
                Home: {
                    screen: Home,
                    navigationOptions: {
                        gestureEnabled: false,
                    },
                },
                Details
            },
            {
                initialRouteName: this.state.routeName,
                navigationOptions: {
                    gestureEnabled: false,
                },
                headerMode: "none"
            }
        )
        const Route = createAppContainer(MainStack)
        if (this.state.routeName === ''){
            return (
                <View style={styles.routesContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            )
        }
        return (
            <Route />
        )
    }
}

const mapStateToProps = (state: any) => ({})

export default connect(mapStateToProps, { searchGithub, getUser })(Routes);
