import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { postLogin } from '../API/myAPI';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            fieldsEmpty: false,
            ErrorAuthentication: false,
            isAuthenticated: false
        }
    }

    _login = () => {
        if (this.state.username !== '' && this.state.password !== '') {
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            postLogin(this.state.username, this.state.password)
                .then(data => {
                    const jwtToken = data.headers.get('Authorization');
                    if (jwtToken !== null) {
                        const user = {
                            username: this.state.username,
                            password: this.state.password,
                            jwtToken: jwtToken
                        }
                        //console.log(user)
                        const action = { type: "LOGIN_LOGOUT", value: user }
                        this.props.dispatch(action)
                        this.setState({ ErrorAuthentication: false, isAuthenticated: true },
                            function () {
                                if (this.state.isAuthenticated) {
                                    this.props.navigation.navigate('HomePage')
                                }
                                else {
                                    this.setState({ ErrorAuthentication: true })
                                }
                            });
                    }
                });
        }
        else {
            this.setState({ fieldsEmpty: true })
        }
    }

    _logout = () => {
        console.log('user logout ' + this.props.studentConnected.username)
        const action = { type: "LOGIN_LOGOUT", value: '' }
        this.props.dispatch(action)
    }

    _emptyFields = (fieldName) => {
        if (this.state[fieldName] == '' && this.state.fieldsEmpty) {
            return (
                <FormValidationMessage>{fieldName} required</FormValidationMessage>
            )
        }
    }

    _errorAuthentication = () => {
        if (this.state.ErrorAuthentication) {
            return (
                <FormValidationMessage>Error during authentication</FormValidationMessage>
            )
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View>
                    <FormLabel>Username</FormLabel>
                    <FormInput
                        placeholder="Username"
                        autoCapitalize='none'
                        onChangeText={(username) => this.setState({ username: username })} />
                    {this._emptyFields('username')}
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize='none'
                        onChangeText={(password) => this.setState({ password: password })} />
                    {this._emptyFields('password')}
                    {this._errorAuthentication()}
                </View>
                <View>
                    <View style={{ margin: 10 }} >
                        <Button
                            title="login"
                            block onPress={() => this._login('username')}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    wrapper: {
        flex: 1,
        marginTop: 20,
    },
    input: {
        margin: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1
    }
};

const mapStateToProps = (state) => {
    return {
        studentConnected: state.student.studentConnected
    }
}

export default connect(mapStateToProps)(Login);