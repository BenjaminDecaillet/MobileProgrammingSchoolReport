import React from 'react'
import { StyleSheet, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomePage from '../Components/HomePage';
import SubjectDetail from '../Components/SubjectDetail';
import GradeDetail from '../Components/GradeDetail';
import SubjectCreate from '../Components/SubjectCreate';
import GradeCreate from '../Components/GradeCreate';
import GradeUpdate from '../Components/GradeUpdate';
import SubjectUpdate from '../Components/SubjectUpdate';
import Login from '../Components/Login';

const SubjectStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: 'HomePage',
      gesturesEnabled: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      gesturesEnabled: false
    }
  },
  SubjectDetail: {
    screen: SubjectDetail,
    navigationOptions: {
      headerLeft: null,
      headerTitle: "Details",
      gesturesEnabled: false
    }
  },
  GradeDetail: {
    screen: GradeDetail,
    navigationOptions: {
      headerLeft: null,
      headerTitle: "Details",
      gesturesEnabled: false
    }
  },
  SubjectCreate: {
    screen: SubjectCreate,
    navigationOptions: {
      title: 'Add Subject',
      gesturesEnabled: false
    }
  },
  GradeCreate: {
    screen: GradeCreate,
    navigationOptions: {
      title: 'Add Grade',
      gesturesEnabled: false
    }
  },
  GradeUpdate: {
    screen: GradeUpdate,
    navigationOptions: {
      title: 'Update Grade',
      gesturesEnabled: false
    }
  },
  SubjectUpdate: {
    screen: SubjectUpdate,
    navigationOptions: {
      title: 'Update Subject',
      gesturesEnabled: false
    }
  }
},
  {
    initialRouteName: "Login"
  }
)

const AppContainer = createAppContainer(SubjectStackNavigator);

export default AppContainer;