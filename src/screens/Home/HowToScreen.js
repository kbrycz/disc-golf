import React from 'react'
import {View, StyleSheet, ScrollView, Dimensions, Image, Text} from 'react-native'
import CircleComponent from '../../components/CircleComponent'
import * as Color from '../../../global/Color'

class HowToScreen extends React.Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <CircleComponent isWhite={true}/>
                <ScrollView style={{marginBottom: Dimensions.get('window').height * .05, marginTop: Dimensions.get('window').height * .05}}>
                <Text style={styles.headerText}>How to Play</Text>
                <Text style={styles.sub}>Disc Golf</Text>
                <Text style={styles.p}>Have you ever played normal golf? If so, this game follows the same general rules! The object of the game is to
                                       throw the disc into the basket! This is like hitting the ball into the hole in standard golf.</Text>
                <Text style={styles.p}>You want to get the disc into the basket in the least amount of throws as possible! Once you get one in,
                                       you can score the game either two ways: The basic way or the traditional way!</Text>
                <Text style={styles.p}>The basic way of scoring is to just count number of throws per hole. If it takes you four throws, you mark your score
                                       as a 4 and you move on to the next hole. Then you add up all of the numbers at the end!</Text>
                <Text style={styles.p}>The traditional way is if you are playing on a course that shows the "pars" of all the holes. For example, if the hole
                                       says par 3, then taking three throws would give you a score of 0. two throws would give you a -1, and four throws a + 1.</Text>
                <Text style={styles.p}>In both of these game types, you want your score as low as possible! It really doesn't matter how you score it. We recommend the
                                       basic way if you are just starting out!</Text>
                <Text style={styles.p}>Once you decide on scoring, go to the first hole's starting point. Throw your disc towards the basket! Wherever that disc lands
                                       is where you must take your next throw from! You can have a running start on the first throw but only one step on the following throws!</Text>
                <Text style={styles.p}>That's the basic gist of the game! What are you waiting for? Get out there and throw some discs!</Text>
                </ScrollView>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: Dimensions.get('window').height * .05,
        marginLeft: Dimensions.get('window').width * .12,
        marginRight: Dimensions.get('window').width * .12,
        lineHeight: Dimensions.get('window').height * .08,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .05,
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
    sub: {
        marginTop: Dimensions.get('window').height * .005,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .02,
        color: Color.MAIN,
        marginBottom: Dimensions.get('window').height * .05,
        fontFamily: 'BalsamiqSans'
    },
    p: {
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .04,
        textAlign: 'justify',
        fontSize: Dimensions.get('window').height * .02,
        lineHeight: Dimensions.get('window').height * .03,
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
})

export default HowToScreen