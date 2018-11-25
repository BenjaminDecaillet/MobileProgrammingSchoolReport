import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import GradeItem from './GradeItem';
import { connect } from 'react-redux';

class GradeList extends Component {
    constructor(props) {
        super(props)
    }
    _updateAverage = () => {
        this.props.displaySubjectAverage();
    }

    _displayDetailForGrade = (idGrade) => {
        this.props.navigation.navigate('GradeDetail', { idGrade: idGrade , fillGrades : this.props.fillGrades, displaySubjectAverage: this._updateAverage})
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