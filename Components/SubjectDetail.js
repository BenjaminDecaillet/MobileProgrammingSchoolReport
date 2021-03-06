import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getSubjectDetailFromApi, deleteSubjectFromApi, getSubjectsFromStudentFromApi } from '../API/myAPI'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import GradeList from './GradeList';

class SubjectDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    _goBack() {
        getSubjectsFromStudentFromApi(this.props.studentInfo.id, this.props.studentConnected.jwtToken).then(data => {
            this.props.navigation.state.params.fillSubjects(data);
        })
        this.props.navigation.goBack();
    }

    _fillGrades = (grades) => {
        const action = { type: "INIT_GRADES", value: grades }
        this.props.dispatch(action)
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        getSubjectDetailFromApi(this.props.navigation.state.params.idSubject, this.props.studentConnected.jwtToken).then(data => {
            this.setState({
                isLoading: false
            })
            this._fillGrades(data.grades)
        })
    }

    _updateSubjectList = (name) => {
        const subjectUpdate = { id: this.props.navigation.state.params.idSubject, name: name };
        const action = { type: "UPDATE_SUBJECT", value: subjectUpdate }
        this.props.dispatch(action)
        const subject = this.props.subjectsList[this.props.subjectsList.findIndex(item => item.id === this.props.navigation.state.params.idSubject)]
        const action2 = { type: "INIT_CURRENTSUBJECT", value: subject }
        this.props.dispatch(action2)

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

    _deleteSubject() {
        deleteSubjectFromApi(this.props.navigation.state.params.idSubject, this.props.studentConnected.jwtToken);
        const subjectTemp = { id : this.props.navigation.state.params.idSubject}
        const action = { type: "TOGGLE_SUBJECT", value: subjectTemp }
        this.props.dispatch(action)
        this.props.navigation.goBack();
    }

    _updateSubject() {
        this.props.navigation.navigate('SubjectUpdate',
            {
                id: this.props.navigation.state.params.idSubject,
                name: this.props.currentSubject.name,
                updateSubjectList: this._updateSubjectList
            })
    }

    _displaySubjectAverage = () => {
        const subject = this.props.currentSubject
        if (subject != undefined) {
            let subjectAverage = 0;
            let value = 0;
            let weight = 0;
            subject.grades.forEach(grade => {
                value = value + (grade.value * grade.weight);
                weight = weight + grade.weight;
            });
            subjectAverage = value / weight;
            return (
                <Text style={styles.default_text}>Average : {subjectAverage.toFixed(2)}/5</Text>
            )
        }
    }

    _displayFormAddGrade = () => {
        this.props.navigation.navigate('GradeCreate', { displaySubjectAverage: this._displaySubjectAverage() })
    }

    _displaySubject() {
        const subject = this.props.currentSubject
        if (subject != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <View style={styles.header_container}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name='arrow-left'
                                type='font-awesome'
                                color='#000'
                                size={30}
                                iconStyle={styles.backIcon}
                                onPress={() => this._goBack()}
                            />
                            <Text style={styles.title_text}>{subject.name}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            
                            <View style={{ marginLeft: 100 }}>
                                <Icon
                                    raised
                                    reverse
                                    reverseColor='#FFF'
                                    name='pencil'
                                    type='font-awesome'
                                    color='#7FFFD4'
                                    size={15}
                                    onPress={() => this._updateSubject()}
                                />
                            </View>
                            <Icon
                                raised
                                reverse
                                reverseColor='#FFF'
                                name='trash'
                                type='font-awesome'
                                color='#DC143C'
                                size={15}
                                onPress={() => this._deleteSubject()}
                            />
                        </View>
                    </View>
                    <View style={styles.average_container}>
                        {this._displaySubjectAverage()}
                        <Text style={styles.default_text}>-     Number of notes : {subject.grades.length}</Text>
                    </View>
                    <GradeList style={{ flex: 5 }}
                        displaySubjectAverage={this._displaySubjectAverage}
                        fillGrades={this._fillGrades}
                        navigation={this.props.navigation}
                    />
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Icon
                            raised
                            reverse
                            reverseColor='#FFF'
                            name='plus'
                            type='font-awesome'
                            color='#82e0aa'
                            onPress={() => this._displayFormAddGrade()}
                        />
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displaySubject()}
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
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    header_container: {
        flex: 1
    },
    average_container: {
        flex: 1,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    backIcon: {
        marginLeft: 5,
        alignItems: 'center'
    },
    default_text: {
        marginLeft: 5,
        marginRight: 15,
        marginTop: 5,
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return {
        subjectsList: state.subjects.subjectsList,
        currentSubject: state.subjects.currentSubject,
        gradesList: state.grades.gradesList,
        studentConnected: state.student.studentConnected,
        studentInfo: state.student.studentInfo
    }
}

export default connect(mapStateToProps)(SubjectDetail);