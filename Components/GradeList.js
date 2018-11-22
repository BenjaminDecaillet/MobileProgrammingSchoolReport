import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native'
import GradeItem from './GradeItem'

class GradeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grades: []
        }
    }

    _displayDetailForGrade = (idGrade) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail de la note
        this.props.navigation.navigate('GradeDetail', { idGrade: idGrade })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.grades}
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

export default GradeList;