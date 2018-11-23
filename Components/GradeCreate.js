import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { postGradeFromApi } from '../API/myAPI'

class GradeCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            value: 0,
            weight: 0,
            subjectid: 0,
            formDisabled: true
        }
    }

    _validationName() {
        if (this.state.name == '') {
            return (
                <FormValidationMessage>Name required</FormValidationMessage>
            )
        }
    }

    _validationValue() {
        if (this.state.value == 0 || this.state.value < 0) {
            return (
                <FormValidationMessage>Value required different from 0</FormValidationMessage>
            )
        }
    }

    _validationWeight() {
        if (this.state.weight == 0 || this.state.weight < 0) {
            return (
                <FormValidationMessage>Weight required different from 0</FormValidationMessage>
            )
        }
    }

    _save(subjectid) {
        this.setState({
            subjectid: subjectid
        }, () => {
            postGradeFromApi(this.state.name, this.state.value, this.state.weight, this.state.subjectid);
        })
        this.props.navigation.goBack();

    }

    _check() {
        if (this.state.name != '' || value == 0 || weight == 0 || this.state.value < 0 || this.state.weight < 0) {
            this.setState({
                formDisabled: false
            })
        }
    }

    render() {
        const subjectid = this.props.navigation.state.params.subjectid;
        return (
            <View style={styles.wrapper}>
                <View>
                    <FormLabel>Grade Name</FormLabel>
                    <FormInput
                        placeholder="Grade name"
                        onChangeText={(name) => this.setState({ name: name })} />
                    {this._validationName()}
                    <FormLabel>Grade Value</FormLabel>
                    <FormInput
                        placeholder="Grade value"
                        keyboardType="numeric"
                        onChangeText={(value) => this.setState({ value: value })} />
                    {this._validationValue()}
                    <FormLabel>Grade Weight</FormLabel>
                    <FormInput
                        placeholder="Grade weight"
                        keyboardType="number-pad"
                        onChangeText={(weight) => this.setState({ weight: weight })} />
                    {this._validationWeight()}

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
                            block onPress={() => this._save(subjectid)}>
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

export default GradeCreate;