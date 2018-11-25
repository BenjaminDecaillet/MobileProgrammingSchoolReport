import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class GradeItem extends Component {
    render() {
        const { grade, displayDetailForGrade } = this.props
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForGrade(grade.id)}>

                <MaterialCommIcon
                    name='note-outline' size={50}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{grade.name}</Text>
                    </View>
                    <View style={styles.average_container}>
                        <Text style={styles.description_text}>Value : {grade.value}</Text>
                        <Text style={styles.description_text}>Weight : {grade.weight}</Text>
                    </View>
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
    image: {
        width: 120,
        height: 70,
        margin: 5,
        backgroundColor: 'gray'
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
    vote_text: {
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
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default GradeItem;