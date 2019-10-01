import React from 'react';
import {StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import { HomeScreen } from './Screens/home';
import {AddReportScreen} from './Screens/addReport'
import {AddReportInfoScreen} from './Screens/addReportInfo'
import {ReportDetailScreen} from './Screens/reportDetail'
import { UserScreen } from './Screens/UserScreen';
import { SearchScreen } from './Screens/SearchScreen';
import { WelcomeUserInfoScreen } from './Screens/welcomeUserInfo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator }from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from "react-native"

setData = async (userName) => {
  try{
    await AsyncStorage.setItem('userName',userName);
  }catch(error){
    console.log(error);
  }
}

getData = async () => {
  try{
    const value = await AsyncStorage.getItem('userName');
    if(value !== null){
      return 'Home'
    }else{
      return 'WelcomeUserInfo'
    }
  }catch(error){
    console.log(error);
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation
        return {
          headerTitle: 'Dolotagram',
          headerRight: 
          <TouchableOpacity onPress={() => navigate('AddReport')}>
            <Ionicons name="ios-add" style={{marginRight:10}} size={40}/>
          </TouchableOpacity>
        }
      }
    },  
    AddReport: {
      screen: AddReportScreen,
    },
    AddReportInfo:{
      screen: AddReportInfoScreen,
    },
    ReportDetail: {
      screen: ReportDetailScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    User: {
      screen: UserScreen,
    },
    WelcomeUserInfo:{
      screen: WelcomeUserInfoScreen
    },
  },
  {
    initialRouteName: "Home"
  }
);

const TabNavigator = createBottomTabNavigator(
  {
      Home: AppNavigator,
      Search: SearchScreen,
      User:UserScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Search') {
          iconName = `ios-search`;
        }else if (routeName === 'User') {
          iconName = `ios-contact`;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  });

// export default function render(){
//   let value = AsyncStorage.getItem('userName');
//   if(value == null){
//     setData('Shiomy_shika')
//   }
//   return createAppContainer(TabNavigator);
// };
const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props)
    let value = AsyncStorage.getItem('userName');
    if(value == null){
      setData('Shiomy_shika')
    }
  }
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  addButton:{
    height:30,
    width:30,
    borderRadius:15,
    backgroundColor: 'white',
    color:'black',
    marginRight:10
  },
});