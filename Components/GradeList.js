import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import GradeItem from './GradeItem';
import { connect } from 'react-redux';

class GradeList extends Component {
    constructor(props) {
        super(props)
    }

    _displayDetailForGrade = (idGrade) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail de la note
        this.props.navigation.navigate('GradeDetail', { idGrade: idGrade , fillGrades : this.props.fillGrades})
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.gradesList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GradeItem
                        grade={item}
                        displayDetailForGrade={this._displayDetailForGrade}
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
        subjectsList : state.subjects.subjectsList,
        gradesList : state.grades.gradesList
    }
}

export default connect(mapStateToProps)(GradeList);