import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { postSubjectFromApi } from '../API/myAPI';
import { connect } from 'react-redux';

class SubjectCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            formDisabled: true
        }
    }

    _save(studentid) {
        postSubjectFromApi(this.state.name, studentid, this.props.studentConnected.jwtToken).then(data => {
            const subject = JSON.parse(data._bodyText);
            const action = { type: "TOGGLE_SUBJECT", value: subject }
            this.props.dispatch(action)
        });
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
        const studentid = this.props.studentInfo.id;
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

const mapStateToProps = (state) => {
    return {
        subjectsList: state.subjects.subjectsList,
        studentConnected: state.student.studentConnected,
        studentInfo: state.student.studentInfo
    }
}

export default connect(mapStateToProps)(SubjectCreate);