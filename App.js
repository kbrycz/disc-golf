import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home/HomeScreen'
import AboutScreen from './src/screens/Home/AboutScreen'
import GameScreen from './src/screens/Game/GameScreen'
import HistoryScreen from './src/screens/Game/HistoryScreen'
import HistoryPlayerScreen from './src/screens/Game/HistoryPlayerScreen'
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import HowToScreen from './src/screens/Home/HowToScreen';
import * as Color from './global/Color'
import GameTypeScreen from './src/screens/Home/GameTypeScreen';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import SoloScreen from './src/screens/Game/SoloScreen';
import LocationScreen from './src/screens/Home/LocationScreen';


// Creates stack for the Home screens
const Home = createStackNavigator();
const HomeStack = () => {
  return (
    <Home.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          presentation: 'modal'
        }}>
        <Home.Screen name="Main" component={HomeScreen} />
        <Home.Screen name="About" component={AboutScreen} />
        <Home.Screen name="How" component={HowToScreen} />
    </Home.Navigator>
  )
}

// Creates stack for the Game screens
const Game = createStackNavigator();
const GameStack = () => {
  return (
    <Game.Navigator 
        initialRouteName="Gameplay"
        screenOptions={{
          headerShown: false,
        }}>
        <Game.Screen name="Gameplay" component={GameScreen} />
        <Game.Screen name="History" component={HistoryStack} />
    </Game.Navigator>
  )
}

// Creates stack for the Game screens
const Solo = createStackNavigator();
const SoloStack = () => {
  return (
    <Solo.Navigator 
        initialRouteName="SoloPlay"
        screenOptions={{
          headerShown: false,
        }}>
        <Solo.Screen name="SoloPlay" component={SoloScreen} />
        <Solo.Screen name="History" component={HistoryStack} />
    </Solo.Navigator>
  )
}

// Creates stack for the Game screens
const GameType = createStackNavigator();
const GameTypeStack = () => {
  return (
    <GameType.Navigator 
        initialRouteName="GameType"
        screenOptions={{
          headerShown: false,
        }}>
        <GameType.Screen name="GameType" component={GameTypeScreen} />
        <GameType.Screen name="Location" component={LocationScreen} />
    </GameType.Navigator>
  )
}

// Creates stack for the History screens
const History = createStackNavigator();
const HistoryStack = () => {
  return (
    <History.Navigator 
        initialRouteName="HistoryScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <History.Screen name="HistoryScreen" component={HistoryScreen} />
        <History.Screen name="HistoryPlayer" component={HistoryPlayerScreen} />
    </History.Navigator>
  )
}


const RootStack = createStackNavigator();

class App extends React.Component {

  // Initialize the App Screen state
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  // Loads all assets before screen renders
  // Allows for images and fonts to be in place when the screen is rendered
  async loadEverything() {

    // Keep the splash screen visible while we fetch resources
    await SplashScreen.preventAutoHideAsync();

    // Loads all the images
    await Asset.loadAsync([
      require('./assets/circle.png'),
      require('./assets/main.png'),
    ]);

    // Loads all the fonts
    await Font.loadAsync({
      BalsamiqSans: require('./assets/fonts/BalsamiqSans-Regular.ttf')
    });

      // Waits three seconds for splash screen
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 3000);
}

  // Allows for fading between screens
  forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

 
  // Check and see if user already has a token to log user in
  componentDidMount() {
    this.loadEverything()
  }

  // Renders the jsx for the UI
  render() {
    // TODO should be a loading screen
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this.loadEverything}
          onFinish={() => this.setState({ loading: false })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    } 
   else  {
      return( 
          <NavigationContainer>
             <RootStack.Navigator screenOptions={{
                headerShown: false,
                headerMode: 'none',
                animationEnabled: true,
                cardStyleInterpolator: this.forFade,
                gestureEnabled: false,
              }}>
              <RootStack.Screen name='Home' component={HomeStack} />
              <RootStack.Screen name='Type' component={GameTypeStack} />
              <RootStack.Screen name='Solo' component={SoloStack} />
              <RootStack.Screen name='Game' component={GameStack} />
           </RootStack.Navigator>
          </NavigationContainer>  
      );
    }
  }
}

const styles = StyleSheet.create({
  background: {
      backgroundColor: Color.MAIN,
      height: Dimensions.get('window').height
  },
  activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
  }
})

export default function(props) {
    return <App {...props} />;
}