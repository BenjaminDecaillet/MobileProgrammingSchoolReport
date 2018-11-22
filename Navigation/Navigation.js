import React from 'react'
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomePage from '../Components/HomePage'
import SubjectDetail from '../Components/SubjectDetail'
import GradeDetail from '../Components/GradeDetail'
import SubjectCreate from '../Components/SubjectCreate'

const SubjectStackNavigator = createStackNavigator({
  SubjectsHome: {
    screen: HomePage,
    navigationOptions: {
      title: 'HomePage'
    }
  },
  SubjectDetail: {
    screen: SubjectDetail
  },
  GradeDetail: {
    screen: GradeDetail
  },
  SubjectCreate: {
    screen: SubjectCreate,
    navigationOptions: {
      title: 'Add Subject'
    }
  }
})

const AppContainer = createAppContainer(SubjectStackNavigator);

export default AppContainer;