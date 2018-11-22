import { StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { Button, Icon } from 'react-native-elements';
import { getStudentFromApi, getSubjectsFromStudentFromApi } from '../API/myAPI'
import SubjectList from './SubjectList';

class HomePage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            studentId: 2,
            student: '',
            subjects: [],
            isLoading: false
        }
        this._loadSubjects = this._loadSubjects.bind(this)
    }
    componentDidMount() {
        this._loadSubjects();
    }
    
    _loadStudent() {
        this.setState({ isLoading: true })
        getStudentFromApi(this.state.studentId).then(data => {
            this.setState({
                student: data.username,
                isLoading: false
            })
        })
    }

    _loadSubjects() {
        this.setState({ isLoading: true })
        getSubjectsFromStudentFromApi(this.state.studentId).then(data => {
            this.setState({
                subjects: [...this.state.subjects, ...data],
                isLoading: false
            })
        })
    }

    _getSubjects() {
        this.setState({
            subjects: []
        }, () => {
            this._loadStudent()
            this._loadSubjects()
        })
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
        this.props.navigation.navigate('SubjectCreate', { studentid: this.state.studentId })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title_text}>Student {this.state.student} {this.state.studentId} </Text>
                <Button
                    style={{ height: 50, }}
                    title='Show My Subjects'
                    onPress={() => this._getSubjects()}
                    buttonStyle={{
                        backgroundColor: 'rgba(90, 154, 230, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0, borderRadius: 30
                    }}
                />
                <SubjectList
                    subjects={this.state.subjects}
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

export default HomePage;