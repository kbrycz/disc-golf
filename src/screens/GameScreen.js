import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native'
import * as Color from '../../global/Color'
import AddPlayerComponent from '../components/AddPlayerComponent'
import CircleComponent from '../components/CircleComponent'
import GameHeaderComponent from '../components/GameHeaderComponent'
import PlayerItemComponent from '../components/PlayerItemComponent'
import SimpleModalComponent from '../components/SimpleModalComponent'
// import { AdMobInterstitial } from 'expo-ads-admob';

class GameScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            players: [],
            round: 1,
            modalVisible: false
        }
    }

    componentDidMount() {
        this.addNewPlayer()
    }

    // Sets the simple modal to be on or off
    setModalVisible = (isVisiible) => {
        this.setState({modalVisible: isVisiible})
    }

    // Adds a new player to the game. First creates an object
    addNewPlayer = () => {
        // get player initial data
        let player = {
            id: this.state.players.length,
            name: '',
            score: 0,
            status: false,
            history: [{score: 0, round: 0, prev: 0}]
        }
        
        // Set players array with new player
        let tempPlayers = this.state.players
        tempPlayers.push(player)
        this.setState({players: tempPlayers})
    }

    // Sets the name of the player in the players array
    setName = (text, index) => {
        let tempPlayers = this.state.players
        tempPlayers[index].name = text
        this.setState({players: tempPlayers})
    }

    // Changes the score of a a player. num can be either 1, 10, -1, -10, 0
    scoreChange = (index, num) => {
        let tempPlayers = this.state.players
        tempPlayers[index].score += num
        tempPlayers[index].status = true
        this.setState({players: tempPlayers})
    }

    // Return back to main menu
    quit = () => {
        this.props.navigation.navigate('Home')
    }

    // Erase all stats from the players and reset the rounds
    restart = () => {
        let tempPlayers = this.state.players
        for (let i = 0; i < tempPlayers.length; ++i) {
            tempPlayers[i].score = 0
            tempPlayers[i].status = false
            tempPlayers[i].history = [{score: 0, round: 0, prev: 0}]
        }
        this.setState({
            round: 1,
            players: tempPlayers
        })
    }

    // Go to next round if all players have gone, if not, show modal telling them to finish
    next = () => {

        // Make sure every player is ready and store history object
        let tempPlayers = this.state.players
        for (let i = 0; i < tempPlayers.length; ++i) {
            if (!tempPlayers[i].status) {
                this.setState({
                    modalVisible: true
                })
                return
            }
            let historyRound = {
                score: tempPlayers[i].score,
                round: this.state.round,
                prev: tempPlayers[i].history[this.state.round - 1].score,
            }
            if (tempPlayers[i].history.length < this.state.round + 1) {
                tempPlayers[i].history.push(historyRound)
            }
        }

        // Another run through to make sure all of the statuses are updated
        for (let i = 0; i < tempPlayers.length; ++i) {
            tempPlayers[i].status = false
        }

        // Sets state to new values
        if (this.state.round % 3 === 0) {
            this.displayAd().then(() => {
                this.setState({
                    round: this.state.round + 1,
                    players: tempPlayers
                })
            })
        } else {
            this.setState({
                round: this.state.round + 1,
                players: tempPlayers
            })
        }
        
    }

    // Displays the full screen ad
    displayAd = async () => {
        // Display an interstitial (Change to ca-app-pub-1470582515457694/1731364666 for prod)
        // await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910'); // Test ID, Replace with your-admob-unit-id
        // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        // await AdMobInterstitial.showAdAsync();
        console.log("show ad")
    }

    // Sends user to the history page
    goToHistory = () => {
        this.props.navigation.navigate('History', {params: {players: this.state.players}, screen: 'HistoryScreen'})
    }

    // Delete player from the game
    deletePlayer = (index) => {
        let tempPlayers = this.state.players
        if (index > -1) {
            tempPlayers.splice(index, 1);
        }
        this.setState({players: tempPlayers})
    }

    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <SafeAreaView style={styles.sv}>
                    <GameHeaderComponent quit={this.quit} restart={this.restart} round={this.state.round} next={this.next} goToHistory={this.goToHistory} />
                    <KeyboardAvoidingView  behavior="padding" enabled keyboardVerticalOffset={20} style={{height: Dimensions.get('window').height}}>
                    <ScrollView>
                        {
                            this.state.players.length > 0
                            ? this.state.players.map((player, index) => {
                                return <PlayerItemComponent key={index} player={player} index={index} lastIndex={this.state.players.length - 1} round={this.state.round}
                                    addNewPlayer={this.addNewPlayer} setName={this.setName} scoreChange={this.scoreChange} deletePlayer={this.deletePlayer}/>
                            })
                            : <AddPlayerComponent addNewPlayer={this.addNewPlayer} />
                        }
                    </ScrollView>
                    </KeyboardAvoidingView>
                    <SimpleModalComponent modalVisible={this.state.modalVisible} 
                                      setModalVisible={this.setModalVisible} 
                                      text={"Make sure every player has an updated score!"} buttonText={'OK'} />
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
    list: {
        height: '100%',
    },
    sv: {
        marginBottom: Dimensions.get('window').height * .15,
    }
})

export default GameScreen