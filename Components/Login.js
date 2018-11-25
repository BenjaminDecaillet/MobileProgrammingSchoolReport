import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { postLogin, getStudentByUsernameFromApi, getSubjectsFromStudentFromApi } from '../API/myAPI';
import { connect } from 'react-redux';

class Login extends Component {
    static navigationOptions = {
        tabBarVisible: false
    }

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            fieldsEmpty: false,
            ErrorAuthentication: false,
            isAuthenticated: false,
            isLoading: false
        }
    }
    componentDidMount() {
        console.log('login mounted')
    }

    _fillSubjects = (subjects) => {
        const action = { type: "INIT_SUBJECTS", value: subjects }
        this.props.dispatch(action)
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _login = () => {
        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({ isLoading: true })
            postLogin(this.state.username, this.state.password)
                .then(data => {
                    const jwtToken = data.headers.get('Authorization');
                    if (jwtToken !== null) {
                        const user = {
                            username: this.state.username,
                            password: this.state.password,
                            jwtToken: jwtToken
                        }
                        const action = { type: "LOGIN_LOGOUT", value: user }
                        this.props.dispatch(action)
                        this.setState({ username: '', password: '', ErrorAuthentication: false, isAuthenticated: true },
                            function () {
                                if (this.state.isAuthenticated) {
                                    getStudentByUsernameFromApi(this.props.studentConnected.username, this.props.studentConnected.jwtToken).then(data => {
                                        const action2 = { type: 'COMPLETE_STUDENT', value: data }
                                        this.props.dispatch(action2)
                                        getSubjectsFromStudentFromApi(this.props.studentInfo.id, this.props.studentConnected.jwtToken).then(data => {
                                            this._fillSubjects(data);
                                        })
                                    })
                                    this.props.navigation.navigate('Subjects')
                                }
                                else {
                                    this.setState({ ErrorAuthentication: true })
                                }
                            });
                    }
                });
            this.setState({
                isLoading: false
            })
        }
        else {
            this.setState({ fieldsEmpty: true })
        }
    }

    _logout = () => {
        const action = { type: "LOGIN_LOGOUT", value: undefined }
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
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username: username })} />
                    {this._emptyFields('username')}
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize='none'
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password: password })} />
                    {this._emptyFields('password')}

                </View>
                <View style={{ margin: 10 }}>
                    <Button
                        title="login"
                        block onPress={() => this._login()}>
                        <Text>Login</Text>
                    </Button>
                </View>
                {this._errorAuthentication()}
                {this._displayLoading()}
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
        studentConnected: state.student.studentConnected,
        studentInfo: state.student.studentInfo
    }
}

export default connect(mapStateToProps)(Login);