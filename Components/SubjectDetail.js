import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getSubjectDetailFromApi, deleteStudentFromApi } from '../API/myAPI'
import { Icon } from 'react-native-elements';
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import GradeList from './GradeList';

class SubjectDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subject: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        const favoritesSubjectIndex = this.props.favoritesSubject.findIndex(item => item.id === this.props.navigation.state.params.idSubject)
        if (favoritesSubjectIndex !== -1) {
            //Already in favorites no need to call the api
            this.setState({
                subject: this.props.favoritesSubject[favoritesSubjectIndex]
            })
            return
        }
        // Le film n'est pas dans nos favoris, on n'a pas son détail
        // On appelle l'API pour récupérer son détail
        this.setState({ isLoading: true })
        getSubjectDetailFromApi(this.props.navigation.state.params.idSubject).then(data => {
            this.setState({
                subject: data,
                grades: data.grades,
                isLoading: false
            })
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

    _deleteSubject() {
        deleteStudentFromApi(this.props.navigation.state.params.idSubject);
        this.props.navigation.goBack();
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.subject }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesSubject.findIndex(item => item.id === this.state.subject.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    _displaySubjectAverage() {
        const { subject } = this.state
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

    _displaySubject() {
        const { subject } = this.state
        if (subject != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{subject.name}</Text>
                        <TouchableOpacity
                            style={styles.favorite_container}
                            onPress={() => this._toggleFavorite()}>
                            {this._displayFavoriteImage()}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.average_container}>
                        {this._displaySubjectAverage()}
                        <Text style={styles.default_text}>-     Number of notes : {subject.grades.length}</Text>
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
                    <GradeList style={{ flex: 5 }}
                        grades={this.state.grades}
                        navigation={this.props.navigation}
                    />
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
    favorite_container: {
        alignItems: 'center',
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
        favoritesSubject: state.favoritesSubject
    }
}

export default connect(mapStateToProps)(SubjectDetail);