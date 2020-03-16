import React from 'react'
import { Text, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet, } from 'react-native'
import Auth0 from 'react-native-auth0';
import { connect } from 'react-redux';
import { runLogin } from "../Actions/mainAction";
import { colors } from '../Styles/Colors';

const auth0 = new Auth0({ domain: 'dev-s20x--oa.auth0.com', clientId: 'ElxDuYqrFkdYqkWlUFAF3J4n6COOPFAA' });

interface Props {
  runLogin: Function,
  navigation: {
    navigate: Function
  }
}

interface State {
  loading: Boolean;
}

class Login extends React.Component<Props, State> {
    constructor(props: Props){
      super(props)
      this.state = {
        loading: false
      }
    }
    login = async () => {
      this.setState({ loading: true })
      const response = await this.props.runLogin();
      if (response === true){
        this.setState({ loading: false })
        this.props.navigation.navigate('Home');
      } else {
        this.setState({ loading: false })
      }
      /*auth0
      .webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials =>
        // Successfully authenticated
        // Store the accessToken
        this.setState({ accessToken: credentials.accessToken })
      )
      .catch(error => console.log(error));*/
      /*auth0.webAuth
      .clearSession({})
      .then(success => {
          Alert.alert(
              'Logged out!'
          );
          this.setState({ accessToken: null });
      })
      .catch(error => {
          console.log('Log out cancelled');
      });*/
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Image 
                source={require('../Images/git-logo.png')}
                style={styles.imageStyle}
                />
                {
                  (this.state.loading === false) && 
                  <TouchableOpacity 
                  activeOpacity={.7}
                  style={styles.buttonStyle}
                  onPress={this.login}
                  >
                    <Text style={styles.textStyle}>Sign in with Github</Text>
                    <Image 
                    source={require('../Images/git-signin.png')}
                    style={styles.miniImageStyle}
                    />
                  </TouchableOpacity>
                }
                {
                  (this.state.loading === true) &&
                  <ActivityIndicator 
                  size="large"
                  color={colors.white}
                  style={styles.activity}
                  />
                }
            </View>
        )
    }
}

const mapStateToProps = (state: any) => ({

})

export default connect(mapStateToProps, { runLogin })(Login);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 250,
    height: 250
  },
  miniImageStyle: {
    height: 30,
    width: 30
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    paddingRight: 21
  },
  buttonStyle: {
    height: 50,
    borderRadius: 5,
    marginTop: 42,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingHorizontal: 21,
    paddingVertical: 11,
    alignItems: 'center'
  },
  activity: {
    marginTop: 50,
    alignSelf: 'center'
  }
});
