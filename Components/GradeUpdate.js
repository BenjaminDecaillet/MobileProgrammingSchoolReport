import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { putGradeFromApi } from '../API/myAPI'

class GradeUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            gradeid: 0,
            value: 0,
            weight: 0,
            subjectid: 0,
            formDisabled: true
        }
    }
    componentDidMount() {
        this.setState({
            gradeid: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            value: this.props.navigation.state.params.value,
            weight: this.props.navigation.state.params.weight
        })
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

    _save() {
        putGradeFromApi(this.state.gradeid, this.state.name, this.state.value, this.state.weight);
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
                        defaultValue={this.state.name}
                        onChangeText={(name) => this.setState({ name: name })} />
                    {this._validationName()}
                    <FormLabel>Grade Value</FormLabel>
                    <FormInput
                        placeholder="Grade value"
                        keyboardType="numeric"
                        defaultValue={this.state.value.toString()}
                        onChangeText={(value) => this.setState({ value: value })} />
                    {this._validationValue()}
                    <FormLabel>Grade Weight</FormLabel>
                    <FormInput
                        placeholder="Grade weight"
                        keyboardType="numeric"
                        defaultValue={this.state.weight.toString()}
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

export default GradeUpdate;