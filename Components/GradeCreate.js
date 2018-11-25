import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { postGradeFromApi, getSubjectDetailFromApi } from '../API/myAPI';
import { connect } from 'react-redux';

class GradeCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            value: 0,
            weight: 0,
            formDisabled: true,
            fieldsEmpty: false
        }
    }

    _validation = (field) => {
        if (this.state[field] == '' && this.state.fieldsEmpty) {
            return (
                <FormValidationMessage>{field} required</FormValidationMessage>
            )
        }
    }

    _save() {
        postGradeFromApi(this.state.name, this.state.value, this.state.weight, this.props.currentSubject.id, this.props.studentConnected.jwtToken).then(data => {
            const grade = JSON.parse(data._bodyText);
            const action = { type: "TOGGLE_GRADE", value: grade }
            this.props.dispatch(action)
        });
        getSubjectDetailFromApi(this.props.currentSubject.id, this.props.studentConnected.jwtToken).then(data => {
            const subject = data
            const action2 = { type: "INIT_CURRENTSUBJECT", value: subject }
            this.props.dispatch(action2)
        })
        this.props.navigation.state.params.displaySubjectAverage;
        this.props.navigation.goBack();

    }

    _check() {
        if (this.state.name != '' || value == 0 || weight == 0 || this.state.value < 0 || this.state.weight < 0) {
            this.setState({
                formDisabled: false
            })
        }
        else {
            this.setState({
                fieldsEmpty: true
            })
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View>
                    <FormLabel>Grade Name</FormLabel>
                    <FormInput
                        placeholder="Grade name"
                        onChangeText={(name) => this.setState({ name: name })} />
                    {this._validation('name')}
                    <FormLabel>Grade Value</FormLabel>
                    <FormInput
                        placeholder="Grade value"
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ value: value })} />
                    {this._validation('value')}
                    <FormLabel>Grade Weight</FormLabel>
                    <FormInput
                        placeholder="Grade weight"
                        keyboardType="number-pad"
                        onChangeText={(weight) => this.setState({ weight: weight })} />
                    {this._validation('weight')}

                </View>
                <View>
                    <View style={{ margin: 10 }} >
                        <Button
                            disabled={!this.state.formDisabled}
                            title="check"
                            block onPress={() => this._check()}>
                            <Text>Check Form</Text>
                        </Button>
                    </View>
                    <View style={{ margin: 10 }} >
                        <Button
                            disabled={this.state.formDisabled}
                            title="save"
                            block onPress={() => this._save()}>
                            <Text>Save</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    wrapper: {
        flex: 1,
        marginTop: 20,
    },
    input: {
        margin: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1
    }
};

const mapStateToProps = (state) => {
    return {
        subjectsList: state.subjects.subjectsList,
        gradesList: state.grades.gradesList,
        studentConnected: state.student.studentConnected,
        currentSubject: state.subjects.currentSubject
    }
}

export default connect(mapStateToProps)(GradeCreate);