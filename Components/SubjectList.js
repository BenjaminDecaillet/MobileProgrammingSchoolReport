import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native'
import SubjectItem from './SubjectItem';
import { getSubjectDetailFromApi } from '../API/myAPI'
import { connect } from 'react-redux'

class SubjectList extends Component {


    constructor(props) {
        super(props)
    }

    _displayDetailForSubject = (idSubject) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du sujet
        getSubjectDetailFromApi(idSubject, this.props.studentConnected.jwtToken).then(data => {
            const action = { type: "INIT_CURRENTSUBJECT", value: data }
            this.props.dispatch(action)
        })

        this.props.navigation.navigate('SubjectDetail', { idSubject: idSubject, fillSubjects: this.props.fillSubjects })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.subjectsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SubjectItem
                        subject={item}
                        isSubjectFavorite={(this.props.favoritesSubject.findIndex(subject => subject.id === item.id) !== -1) ? true : false}
                        displayDetailForSubject={this._displayDetailForSubject}
                    />
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesSubject: state.toggleFavorite.favoritesSubject,
        subjectsList: state.subjects.subjectsList,
        gradesList: state.grades.gradesList,
        currentSubject: state.subjects.currentSubject,
        studentInfo: state.student.studentInfo,
        studentConnected: state.student.studentConnected
    }
}

export default connect(mapStateToProps)(SubjectList);