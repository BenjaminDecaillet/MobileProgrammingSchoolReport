import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Button } from 'react-native'
import { getSubjectDetailFromApi, deleteSubjectFromApi } from '../API/myAPI'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import GradeList from './GradeList';

class SubjectDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subject: undefined,
            isLoading: false
        }
    }
    //this._updateSubjectList = this._updateSubjectList.bind(this)

    _goBack() {
        this.props.navigation.state.params.fillSubjects(this.props.subjectsList);
        this.props.navigation.goBack();
    }

    _fillGrades = (grades) => {
        const action = { type: "INIT_GRADES", value: grades }
        this.props.dispatch(action)
    }

    componentDidMount() {
        const subjectIndex = this.props.subjectsList.findIndex(item => item.id === this.props.navigation.state.params.idSubject)
        if (subjectIndex !== -1) {
            //Already in favorites no need to call the api
            this.setState({
                subject: this.props.subjectsList[subjectIndex]
            })
            this._fillGrades(this.props.subjectsList[subjectIndex].grades)
            return
        }

        // Le sujet n'est pas dans nos favoris, on n'a pas son détail
        // On appelle l'API pour récupérer son détail
        this.setState({ isLoading: true })
        getSubjectDetailFromApi(this.props.navigation.state.params.idSubject).then(data => {
            this.setState({
                subject: data,
                isLoading: false
            })
            this._fillGrades(data.grades)
        })
    }

    _updateSubjectList = (name) => {
        const subjectUpdate = { id: this.props.navigation.state.params.idSubject, name: name };
        const action = { type: "UPDATE_SUBJECT", value: subjectUpdate }
        this.props.dispatch(action)
        this.setState({
            subject: this.props.subjectsList[this.props.subjectsList.findIndex(item => item.id === this.props.navigation.state.params.idSubject)]
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
        deleteSubjectFromApi(this.props.navigation.state.params.idSubject);
        const action = { type: "TOGGLE_SUBJECT", value: this.state.subject }
        this.props.dispatch(action)
        this.props.navigation.goBack();
    }

    _updateSubject() {
        this.props.navigation.navigate('SubjectUpdate',
            {
                id: this.props.navigation.state.params.idSubject,
                name: this.state.subject.name,
                updateSubjectList: this._updateSubjectList
            })
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

    _displayFormAddGrade = () => {
        this.props.navigation.navigate('GradeCreate', { subjectid: this.props.navigation.state.params.idSubject })
    }

    _displaySubject() {
        const { subject } = this.state
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
                            <TouchableOpacity
                                style={{ marginLeft: 80 }}
                                onPress={() => this._toggleFavorite()}>
                                {this._displayFavoriteImage()}
                            </TouchableOpacity>
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
        favoritesSubject: state.toggleFavorite.favoritesSubject,
        subjectsList: state.subjects.subjectsList,
        gradesList: state.grades.gradesList
    }
}

export default connect(mapStateToProps)(SubjectDetail);