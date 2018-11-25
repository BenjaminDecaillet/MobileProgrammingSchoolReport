import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import SubjectList from './SubjectList';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
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

    _displayFormAddSubject = () => {
        this.props.navigation.navigate('SubjectCreate', { studentid: this.props.studentInfo.id })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title_text}>{this.props.studentConnected.username} Subjects </Text>
                <SubjectList
                    fillSubjects={this._fillSubjects}
                    navigation={this.props.navigation}
                />

                {this._displayLoading()}
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Icon
                        raised
                        reverse
                        reverseColor='#FFF'
                        name='plus'
                        type='font-awesome'
                        color='#82e0aa'
                        onPress={() => this._displayFormAddSubject()}
                    />
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
    }
})

const mapStateToProps = (state) => {
    return {
        subjectsList: state.subjects.subjectsList,
        subject: state.subjects.subject,
        studentConnected: state.student.studentConnected,
        studentInfo: state.student.studentInfo
    }
}

export default connect(mapStateToProps)(HomePage);