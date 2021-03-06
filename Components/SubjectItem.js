import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class SubjectItem extends Component {


    _displaySubjectAverage() {
        const { subject } = this.props
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
                <View style={styles.average_container}>
                    <Text style={styles.average_text}>Average : {subjectAverage.toFixed(2)}</Text>
                </View>
            )
        }
    }

    render() {
        const { subject, displayDetailForSubject } = this.props
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForSubject(subject.id)}>

                <MaterialCommIcon
                    name='book-open-variant' size={50}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{subject.name}</Text>
                    </View>
                    {this._displaySubjectAverage()}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 80,
        flexDirection: 'row'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 1,
        flexDirection: 'row'
    },
    average_container: {
        flex: 1
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    average_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 18,
        height: 18,
        marginRight: 5,
        marginTop: 5
    }
})

export default SubjectItem;