import React, { Component } from 'react';
import { AppRegistry, View, Text, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { putSubjectFromApi } from '../API/myAPI';
import { connect } from 'react-redux';

class SubjectUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            subjectid: 0,
            formDisabled: true
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.navigation.state.params.name,
            subjectid: this.props.navigation.state.params.id
        })
    }

    _save() {
        putSubjectFromApi(this.state.subjectid, this.state.name);
        this.props.navigation.state.params.updateSubjectList(this.state.name);
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
                        defaultValue={this.state.name}
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
        favoritesSubject: state.toggleFavorite.favoritesSubject,
        subjectsList: state.subjects.subjectsList
    }
}

export default connect(mapStateToProps)(SubjectUpdate);