import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class ProfileDetail extends Component {

    _logout = () => {
        const user = {
            username: '',
            password: '',
            email: '',
            role: '',
            jwtToken: ''
        }
        const action = { type: "LOGIN_LOGOUT", value: user }
        this.props.dispatch(action)
        const action2 = { type: 'COMPLETE_STUDENT', value: user }
            this.props.dispatch(action2)
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title_text}> {this.props.studentInfo.username}</Text>
                <Text style={styles.default_text}> {this.props.studentInfo.email}</Text>
                <Text style={styles.default_text}> {this.props.studentInfo.role}</Text>
                <View style={{margin:10}}>
                    <Button
                        title="logout"
                        block onPress={() => this._logout()}>
                        <Text>Login</Text>
                    </Button>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    default_text: {
        marginLeft: 5,
        fontSize: 20,
        marginRight: 15,
        marginTop: 5,
    }
})

const mapStateToProps = (state) => {
    return {
        studentInfo: state.student.studentInfo
    }
}

export default connect(mapStateToProps)(ProfileDetail);