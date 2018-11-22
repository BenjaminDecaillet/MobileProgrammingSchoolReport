import React, { Component } from 'react';
import { StyleSheet, FlatList} from 'react-native'
import SubjectItem from './SubjectItem'
import { connect } from 'react-redux'

class SubjectList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: []
        }
    }

    _displayDetailForSubject = (idSubject) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du sujet
        this.props.navigation.navigate('SubjectDetail', { idSubject: idSubject })
    }

    __displayFormAddSubject = (idSubject) => {
        // On a récupéré les informations de la navigation, on peut afficher le détail du sujet
        this.props.navigation.navigate('SubjectDetail', { idSubject: idSubject })
    }

    render() {
        return (
                <FlatList
                    style={styles.list}
                    data={this.props.subjects}
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
        favoritesSubject: state.favoritesSubject
    }
}

export default connect(mapStateToProps)(SubjectList);