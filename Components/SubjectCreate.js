import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput, Button, YellowBox } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { postStudentFromApi } from '../API/myAPI'

YellowBox.ignoreWarnings(['Require cycle:']);
class SubjectCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            studentid: 0,
            formDisabled: true
        }
    }
    _save(studentid) {
        this.setState({
            studentid: studentid
        }, () => {
            const jsonSubject = {
                name: this.state.name,
                studentid: this.state.studentid
            };
            console.log('Values Posted to save', jsonSubject);
            postStudentFromApi(this.state.name,this.state.studentid);
        })
        this.props.navigation.goBack();

    }
    _validationName() {
        if (this.state.name == '') {
            return (
                <FormValidationMessage>Name required</FormValidationMessage>
            )
        }
    }

    _check() {
        if (this.state.name != '') {
            this.setState({
                formDisabled: false
            })
        }
    }

    render() {
        const studentid = this.props.navigation.state.params.studentid;
        return (

            <View style={styles.wrapper}>
                <View>
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        placeholder="Subject name"
                        onChangeText={(name) => this.setState({ name: name })} />
                    {this._validationName()}

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
                            block onPress={() => this._save(studentid)}>
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

export default SubjectCreate;