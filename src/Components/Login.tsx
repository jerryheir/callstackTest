import React from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
import { runLogin } from "../Actions/mainAction";
import { styles } from "../Styles";
import { colors } from '../Styles/Colors';

interface Props {
  runLogin: Function;
  navigation: {
    navigate: Function
  }
}

interface State { loading: Boolean; }

class Login extends React.Component<Props, State> {
    constructor(props: Props){
      super(props)
      this.state = { loading: false }
    }
    login = async () => {
      this.setState({ loading: true })
      const response = await this.props.runLogin();
      if (response === true){
        this.props.navigation.navigate('Home');
      }
      this.setState({ loading: false })
    }
    render() {
      const { loading } = this.state;
        return (
            <View style={styles.loginContainer}>
                <Image 
                source={require('../Images/git-logo.png')}
                style={styles.loginImageStyle}
                />
                {
                  (loading === false) && 
                  <TouchableOpacity 
                  activeOpacity={.7}
                  style={styles.loginButtonStyle}
                  onPress={this.login}
                  >
                    <Text style={styles.loginTextStyle}>Sign in with Github</Text>
                    <Image 
                    source={require('../Images/git-signin.png')}
                    style={styles.miniImageStyle}
                    />
                  </TouchableOpacity>
                }
                {
                  (loading === true) &&
                  <ActivityIndicator 
                  size="large"
                  color={colors.primary}
                  style={styles.activity}
                  />
                }
            </View>
        )
    }
}

const mapStateToProps = (state: any) => ({})

export default connect(mapStateToProps, { runLogin })(Login);
