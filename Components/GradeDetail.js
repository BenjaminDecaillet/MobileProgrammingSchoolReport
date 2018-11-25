import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { deleteGradeFromApi, getSubjectDetailFromApi } from '../API/myAPI'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class GradeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grade: undefined,
            isLoading: false
        }
    }

    _goBack() {
        this.props.navigation.state.params.fillGrades(this.props.gradesList);
        this.props.navigation.goBack();
    }

    componentDidMount() {
        const gradeIndex = this.props.gradesList.findIndex(item => item.id === this.props.navigation.state.params.idGrade)
        this.setState({
            grade: this.props.gradesList[gradeIndex]
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

    _deleteGrade() {
        deleteGradeFromApi(this.props.navigation.state.params.idGrade, this.props.studentConnected.jwtToken);
        const action = { type: "TOGGLE_GRADE", value: this.state.grade }
        this.props.dispatch(action)
        getSubjectDetailFromApi(this.props.currentSubject.id, this.props.studentConnected.jwtToken).then(data => {
            const subject = data
            const action2 = { type: "INIT_CURRENTSUBJECT", value: subject }
            this.props.dispatch(action2)
        })
        this.props.navigation.state.params.displaySubjectAverage
        this.props.navigation.goBack();
    }

    _updateGradesList = (name, value, weight) => {
        const gradeUpdate = { id: this.props.navigation.state.params.idGrade, name: name, value: value, weight: weight };
        const action = { type: "UPDATE_GRADE", params: gradeUpdate }
        this.props.dispatch(action)
        this.setState({
            grade: this.props.gradesList[this.props.gradesList.findIndex(item => item.id === this.props.navigation.state.params.idGrade)]
        })

    }

    _updateAverage = () => {
        this.props.navigation.state.params.displaySubjectAverage()
    }

    _updateGrade() {
        this.props.navigation.navigate('GradeUpdate',
            {
                id: this.state.grade.id,
                name: this.state.grade.name,
                value: this.state.grade.value,
                weight: this.state.grade.weight,
                updateGradesList: this._updateGradesList,
                displaySubjectAverage: this._updateAverage
            })
    }

    _displayGrade() {
        const { grade } = this.state
        if (grade != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name='arrow-left'
                            type='font-awesome'
                            color='#000'
                            size={30}
                            iconStyle={styles.backIcon}
                            onPress={() => this._goBack()}
                        />
                        <Text style={styles.title_text}>{grade.name}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.average_text}>Value : {grade.value} / 5</Text>
                        <Text style={styles.average_text}>Weight : {grade.weight}</Text>
                        <Icon
                            raised
                            reverse
                            reverseColor='#FFF'
                            name='pencil'
                            type='font-awesome'
                            color='#7FFFD4'
                            size={25}
                            onPress={() => this._updateGrade()}
                        />
                        <Icon
                            raised
                            reverse
                            reverseColor='#FFF'
                            name='trash'
                            type='font-awesome'
                            color='#DC143C'
                            size={25}
                            onPress={() => this._deleteGrade()}
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
                {this._displayGrade()}
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
    average_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    }
})

const mapStateToProps = (state) => {
    return {
        subjectsList: state.subjects.subjectsList,
        gradesList: state.grades.gradesList,
        studentConnected: state.student.studentConnected,
        currentSubject: state.subjects.currentSubject
    }
}

export default connect(mapStateToProps)(GradeDetail);