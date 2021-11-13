import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native'
import * as Color from '../../../global/Color'
import AddPlayerComponent from '../../components/AddPlayerComponent'
import CircleComponent from '../../components/CircleComponent'
import GameHeaderComponent from '../../components/GameHeaderComponent'
import PlayerItemComponent from '../../components/PlayerItemComponent'
import SimpleModalComponent from '../../components/SimpleModalComponent'
import { AdMobInterstitial } from 'expo-ads-admob';
import SaveGameConfirmComponent from '../../components/SaveGameConfirmComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

class SoloScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            score: 0,
            round: 1,
            modalVisible: false,
            history: [{score: 0, round: 0, prev: 0}],
            hasPutInScore: false,
            location: "",
            hasSaved: false,
            saveModalVisible: false
        }
    }

    componentDidMount() {
        this.setState({location: this.props.route.params.location})
    }

    // Sets the simple modal to be on or off
    setModalVisible = (isVisiible) => {
        this.setState({modalVisible: isVisiible})
    }

    // Return back to main menu
    quit = () => {
        this.props.navigation.navigate('Home')
    }

    // Erase all stats from the players and reset the rounds
    restart = () => {
        this.setState({
            score: 0,
            round: 1,
            modalVisible: false,
            history: [{score: 0, round: 0, prev: 0}],
            hasPutInScore: false,
            hasSaved: false
        })
    }

    // Go to next round if all players have gone, if not, show modal telling them to finish
    next = () => {
        if (!this.state.hasPutInScore) {
            this.setState({
                modalVisible: true
            })
            return
        }
        let historyObj = {score: this.state.score, round: this.state.round, prev: this.state.history[this.state.round - 1].score}
        let tempHistory = this.state.history
        tempHistory.push(historyObj)
        this.setState({
            history: tempHistory,
            round: this.state.round + 1,
            hasPutInScore: false,
            modalVisible: false,
        })
    }

    // Changes the user's score
    scoreChange = (scoreChange) => {
        this.setState({score: this.state.score + scoreChange, hasPutInScore: true})
    }

    // Saves the stats of the user to async storage
    saveScore = async () => {
        this.setState({hasSaved: true})
        let history = this.state.history
        if (this.state.hasPutInScore) {
            let historyObj = {score: this.state.score, round: this.state.round, prev: this.state.history[this.state.round - 1].score}
            history.push(historyObj)
        }
        let date = new Date()
        let game = {
            id: uuid.v4(),
            date: date.getMonth() + "/" + date.getDay() + '/' + (date.getFullYear().toString().slice(2)),
            location: this.state.location === "" ? "Unknown" : this.state.location,
            score: this.state.score,
            history: history
        }
        console.log("saving stats")

        try {
            let stats = await AsyncStorage.getItem('playerStats');
            if (stats === null){
               let games = []
               games.push(game)
               await AsyncStorage.setItem("playerStats", JSON.stringify(games))
            }
            else {
                let statsList = JSON.parse(stats)
                statsList.push(game)
                await AsyncStorage.removeItem('playerStats')
                await AsyncStorage.setItem("playerStats", JSON.stringify(statsList))
           }
         } 
         catch (error) {
           console.log("unable to save data")
         }
    }

    // Displays the full screen ad
    displayAd = async () => {
        // Display an interstitial (Change to ca-app-pub-3940256099942544/4411468910 for test)
        // await AdMobInterstitial.setAdUnitID('ca-app-pub-1470582515457694/1731364666');
        // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        // await AdMobInterstitial.showAdAsync();
        console.log("ad show here")
    }

    // Sends user to the history page
    goToHistory = () => {
        let player = {
            id: 0,
            name: "You",
            history: this.state.history
        }
        this.props.navigation.navigate('History', {params: {player: player}, screen: 'HistoryPlayer'})
    }

    // Sets the background of the score to be darker when user clicks something
    scoreStyle = () => {
        if (this.state.hasPutInScore) {
            return {
                backgroundColor: Color.DONE,
                opacity: .8
            }
        }
    }

    // Set save modal visible
    setSaveModalVisible = (isVis) => {
        this.setState({saveModalVisible: isVis})
    }

    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <SafeAreaView style={styles.sv}>
                    <GameHeaderComponent quit={this.quit} restart={this.restart} round={this.state.round} next={this.next} goToHistory={this.goToHistory} />
                    <View style={this.scoreStyle()}>
                        <Text style={styles.score}>{this.state.score}</Text>
                        <Text style={styles.prev}>Prev: {this.state.history[this.state.round - 1].score}  |  Current: {this.state.score - this.state.history[this.state.round - 1].score}</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.btn}>
                                <TouchableOpacity onPress={() => this.scoreChange(1)}>
                                    <Text style={[styles.plus1, styles.math]}>+1</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity onPress={() => this.scoreChange(0)}>
                                    <Text style={[styles.zero, styles.math]}>0</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity onPress={() => this.scoreChange(-1)}>
                                    <Text style={[styles.minus1, styles.math]}>-1</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.location1}>Location:</Text>
                    {
                        this.state.location === ''
                        ?  <Text style={styles.location2}>Unknown</Text>
                        :  <Text style={styles.location2}>{this.state.location}</Text>
                    }
                   {
                       !this.state.hasSaved
                       ? <TouchableOpacity style={styles.button} onPress={() => this.setSaveModalVisible(true)}>
                            <Text style={styles.buttonText}>Save Game</Text>
                        </TouchableOpacity>
                       : <Text style={styles.saved}>Game has been saved</Text>
                   }

                    <SaveGameConfirmComponent modalVisible={this.state.saveModalVisible} setModalVisible={this.setSaveModalVisible} saveGame={this.saveScore} />
                    <SimpleModalComponent modalVisible={this.state.modalVisible} 
                                      setModalVisible={this.setModalVisible} 
                                      text={"Make sure you update your score first!"} buttonText={'OK'} />
                </SafeAreaView>
            </View>
        )
    }
    
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: Color.MAIN,
        height: '100%',
    },
    sv: {
        marginBottom: Dimensions.get('window').height * .15,
    },
    score: {
        marginTop: Dimensions.get('window').height * .08,
        marginBottom: Dimensions.get('window').height * .06,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        fontSize: Dimensions.get('window').height * .12,
        textAlign: 'center',
        color: '#fff',
        opacity: .8,
        fontFamily: 'BalsamiqSans'
    },
    box: {
        height: Dimensions.get('window').height * .15,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    math: {
        padding: Dimensions.get('window').height * .04,
        fontSize: Dimensions.get('window').height * .025,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    },
    zero: {
        backgroundColor: Color.zero,
    },
    plus1: {
        backgroundColor: Color.plus1,
    },
    minus1: {
        backgroundColor: Color.minus1,
    },
    btn: {
        flex: 1
    },
    prev: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans',
        fontSize: Dimensions.get('window').height * .015,
        marginBottom: Dimensions.get('window').height * .02,
    },
    location1: {
        fontSize: Dimensions.get('window').height * .015,
        marginBottom: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    },
    location2: {
        fontSize: Dimensions.get('window').height * .04,
        marginHorizontal: Dimensions.get('window').width * .05,
        lineHeight: Dimensions.get('window').height * .07,
        marginBottom: Dimensions.get('window').height * .04,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    },
    buttonText: {
        fontSize: Dimensions.get('window').height * .03,
        textAlign: 'center',
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
    button: {
        width: Dimensions.get('window').width * .7,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        marginBottom: Dimensions.get('window').height * .03,
        backgroundColor: '#fff',
        paddingVertical: Dimensions.get('window').width * .03,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 4,
        borderColor: Color.MAIN,
        borderRadius: 20,
    },
    saved: {
        fontSize: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    }
})

export default SoloScreen