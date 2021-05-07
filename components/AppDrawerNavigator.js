import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator}from './AppTabNavigator'
import SettingScreen from '../screens/SettingScreen'
import CSBMenu from './CSBMenu'
import MyBartersScreen from '../screens/MyBarters'
export const AppDrawerNavigator=createDrawerNavigator({
Home:{
    screen:AppTabNavigator
},
Setting:{
    screen:SettingScreen
},
MyBarters:{
    screen:MyBartersScreen
},
},
{
    contentComponent:CSBMenu
},
{initialRouteName:'Home'
})