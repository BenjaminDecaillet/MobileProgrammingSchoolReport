import React from 'react'
import { StyleSheet, Button, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomePage from '../Components/HomePage';
import SubjectDetail from '../Components/SubjectDetail';
import GradeDetail from '../Components/GradeDetail';
import SubjectCreate from '../Components/SubjectCreate';
import GradeCreate from '../Components/GradeCreate';
import GradeUpdate from '../Components/GradeUpdate';
import SubjectUpdate from '../Components/SubjectUpdate';
import Login from '../Components/Login';
import ProfileDetail from '../Components/ProfileDetail';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SubjectStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: 'HomePage',
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
    initialRouteName: "HomePage"
  }
)

const ProfileStackNavigator = createStackNavigator({
  ProfileDetail: {
    screen: ProfileDetail,
    navigationOptions: {
      title: 'Profile'
    }
  }
})
const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  }
})

const SchoolTabNavigator = createMaterialBottomTabNavigator(
  {
    Login: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarVisible: false,
        tabBarIcon: () => {
          return <MaterialCommIcon name='logout' size={30} />
        }
      }
    },
    Subjects: {
      screen: SubjectStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <MaterialCommIcon name='format-list-bulleted' size={30} />
        }
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <MaterialCommIcon name='account' size={30} />
        }
      }
    }
  }, {
    initialRouteName: 'Login',
    activeColor: '#aaa',
    inactiveColor: '#ccc',
    barStyle: { backgroundColor: '#ccc' },
  }
);

const AppContainer = createAppContainer(SchoolTabNavigator);

export default AppContainer;