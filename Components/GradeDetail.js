import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getGradeDetailFromApi } from '../API/myAPI'
import moment from 'moment'
import numeral from 'numeral'

class GradeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grade: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        getGradeDetailFromApi(this.props.navigation.state.params.idGrade).then(data => {
            this.setState({
                grade: data,
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

    _displayGrade() {
        const { grade } = this.state
        if (grade != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Text style={styles.title_text}>{grade.name}</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.average_text}>Value : {grade.value} / 5</Text>
                        <Text style={styles.average_text}>Weight : {grade.weight}</Text>
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

export default GradeDetail;