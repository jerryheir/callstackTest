import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import * as Keychain from 'react-native-keychain';
import Login from '../Components/Login'
import Home from '../Components/Home';

class Routes extends React.Component {
    async componentDidMount(){
        /*const data = await Keychain.getGenericPassword();
        if (data){
            const response = await this.props.runLogin({ "username": data.username, "password": data.password })
            if (response && response._data && response._data.reg_status === "SUBSCRIBED"){
                this.setState({ routeName: 'Landing' })
            } else { this.setState({ routeName: 'Login' }) }
        } else {
            this.setState({ routeName: 'Login' })
        }*/
    }
    state = {
        routeName: 'Login'
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
                }
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
        /*if (this.state.routeName === ''){
            return (
                <View style={phonePortraitStyles.darkCenteredContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            )
        }*/
        return (
            <Route />
        )
    }
}

export default Routes;
