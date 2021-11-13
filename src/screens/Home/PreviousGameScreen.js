import React from 'react'
import {View, StyleSheet, FlatList, Dimensions, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import CircleComponent from '../../components/CircleComponent'
import * as Color from '../../../global/Color'
import { Feather } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'

class PreviousGameScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            games: [],
            hasHistory: false,
            isEditing: false,
            historyButtonText: 'Edit History'
        }
    }

    componentDidMount() {
        this.getGames()
        if (this.state.games.length <= 0) {
            this.setState({
                hasHistory: false
            })
        }
    }

    // Gets all of the history of the player
    getGames = async () => {
        try {
            let stats = await AsyncStorage.getItem('playerStats');
            if (stats === null){
                console.log("Unable to get history")
                this.setState({hasHistory: false})
            }
            else {
                this.setState({
                    games: JSON.parse(stats),
                }, () => {
                    if (this.state.games.length > 0) {
                        this.setState({
                            hasHistory: true
                        })
                    }
                })
            }
            
         } 
         catch (error) {
            this.setState({games: []})
            console.log("unable to get data")
         }
    }

    // Removes async storage and deletes all history
    deleteHistory = async () => {
        if (this.state.isEditing) {
            this.setState({
                isEditing: false,
                historyButtonText: 'Edit History'
            })
        }
        else {
            this.setState({
                isEditing: true,
                historyButtonText: 'Stop Editing'
            })
        }
        // try {
        //     let stats = await AsyncStorage.getItem('playerStats');
        //     if (stats !== null){
        //         await AsyncStorage.removeItem('playerStats')
        //     }
        //     this.setState({games: []})
        //  } 
        //  catch (error) {
        //     this.setState({games: []})
        //    console.log("unable to delete data")
        //  }
    }

    // Gets the correct container color for even / odd
    containerStyle = (val) => {
        // Even number
        if (val % 2 == 0) {
            return {
                backgroundColor: Color.ODD,
                opacity: this.state.isEditing ? .5 : .8
            }
        } else {
            return {
                backgroundColor: Color.EVEN,
                opacity: this.state.isEditing ? .5 : .8
            }
        }
    }

    // Sends user to game info screen
    goToGame = (game) => {
        this.props.navigation.navigate('PreviousHistory', {game: game})
    }

    // Deletes the game from the list
    deleteGame = async (index) => {
        console.log("Deleting game at index " + index)
        let games = this.state.games
        if (index >= 0 && index < this.state.games.length) {
            games.splice(index, 1)
            this.setState({
                games: games
            })
        }

        let stats = await AsyncStorage.getItem('playerStats');
        if (stats !== null){
            await AsyncStorage.removeItem('playerStats')
        }
        await AsyncStorage.setItem("playerStats", JSON.stringify(games))
        if (games.length <= 0) {
            this.setState({
                hasHistory: false
            })
        }
    }

    renderGame = (item, index) => {
        if (this.state.isEditing) {
            return <>
            <View style={[styles.row, this.containerStyle(index)]} onPress={() => this.goToGame(item)}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => this.deleteGame(index)}>
                <Feather name="x" style={styles.icon} />
            </TouchableOpacity>
                <Text style={styles.date}>{item.date} at {item.location}</Text>
                <Text style={styles.score}>{item.score}</Text>
            </View>
            </>
        }
        else {
            return <>
                <TouchableOpacity style={[styles.row, this.containerStyle(index)]} onPress={() => this.goToGame(item)}>
                    <Text style={styles.date}>{item.date} at {item.location}</Text>
                    <Text style={styles.score}>{item.score}</Text>
                </TouchableOpacity>
            </>
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <SafeAreaView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.titleContainer} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.title}>Back</Text>
                        </TouchableOpacity>
                        <View style={styles.titleContainer2}>
                            <Text style={styles.title}> </Text>
                        </View>
                    </View>
                    <Text style={styles.round}>History</Text>
                    {
                        this.state.hasHistory
                        ? <>
                        <FlatList
                        data={this.state.games}
                        renderItem={({item, index}) => (
                            this.renderGame(item, index)
                        )}
                        keyExtractor={item => item.id.toString()}
                        style={styles.list} />
                        <TouchableOpacity style={styles.button} onPress={this.deleteHistory}>
                            <Text style={styles.buttonText}>{this.state.historyButtonText}</Text>
                        </TouchableOpacity>
                        </>
                        : <Text style={styles.historyText}>No game history yet!</Text>
                    }
                    
                </SafeAreaView>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Color.MAIN,
        height: Dimensions.get('window').height
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100
    },
    icon: {
        fontSize: Dimensions.get('window').height * .02,
        color: Color.plus1,
    },
    back: {
        fontSize: Dimensions.get('window').height * .04,
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: Dimensions.get('window').width * .03,
    },
    headerText: {
        marginTop: Dimensions.get('window').height * .1,
        marginBottom: Dimensions.get('window').height * .07,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        lineHeight: Dimensions.get('window').height * .08,
        fontSize: Dimensions.get('window').height * .04,
        textAlign: 'center',
        color: '#fff',
        opacity: .8,
        fontFamily: 'BalsamiqSans'
    },
    list: {
        marginBottom: Dimensions.get('window').height * .03,
        height: Dimensions.get('window').height * .65,
    },
    buttonText: {
        fontSize: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
    button: {
        width: Dimensions.get('window').width * .7,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        backgroundColor: '#fff',
        paddingVertical: Dimensions.get('window').width * .03,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 4,
        borderColor: Color.MAIN,
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: Dimensions.get('window').height * .04,
        paddingHorizontal: Dimensions.get('window').width * .02,
    },
    editing: {
        opacity: .8
    },
    date: {
        flex: 3,
        fontSize: Dimensions.get('window').height * .025,
        marginLeft: Dimensions.get('window').width * .03,
        color: '#fff',
        fontFamily: 'BalsamiqSans',
        textAlign: 'center'
    },

    score: {
        flex: 1,
        fontSize: Dimensions.get('window').height * .025,
        marginLeft: Dimensions.get('window').width * .03,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'BalsamiqSans'
    },
    historyText: {
        marginTop: Dimensions.get('window').height * .1,
        marginBottom: Dimensions.get('window').height * .07,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        lineHeight: Dimensions.get('window').height * .08,
        fontSize: Dimensions.get('window').height * .04,
        textAlign: 'center',
        color: '#fff',
        opacity: .8,
        fontFamily: 'BalsamiqSans',
        textTransform: 'capitalize'
    },
    container: {
        flexDirection: 'row',
        opacity: 1
    },
    titleContainer: {
        flex: 1,
    },
    titleContainer2: {
        flex: 2,
    },
    title: {
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .021,
        borderWidth: 1,
        borderColor: Color.DARKER,
        borderLeftWidth: 0,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Color.DARK,
        color: '#feefe0',
        fontFamily: 'BalsamiqSans'
    },
    round: {
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .021,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: Color.DARKER,
        color: '#feefe0',
        fontFamily: 'BalsamiqSans'
    }

})

export default PreviousGameScreen