import React from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import * as Color from '../../global/Color'

const HistoryPlayerScoreComponent = ({score, round, prev, index}) => {

    // Gets the correct container color for even / odd
    const containerStyle = () => {
        // Even number
        if (index % 2 == 0) {
            return {
                backgroundColor: Color.ODD,
                opacity: .8
            }
        } else {
            return {
                backgroundColor: Color.EVEN,
                opacity: .8
            }
        }
    }

    return (
        <View style={[styles.container, containerStyle()]}>
            {round === 0
            ? <Text style={styles.name} >Start</Text>
            : <Text style={styles.name} >Hole {round}</Text>}

            {round === 0
            ? <View style={styles.scoreView}>
                <Text style={[styles.start, styles.change]} >Start</Text>
                <Text style={styles.score} >{score}</Text>
            </View>
            : <View style={styles.scoreView}>
                {score > prev
                ? <Text style={[styles.addition, styles.change]} >+ {score - prev}</Text>
                : score < prev
                ?  <Text style={[styles.subtraction, styles.change]} >- {prev - score}</Text>
                : <Text style={[styles.screwed, styles.change]} >Par</Text>
                }
                <Text style={styles.score} >{score}</Text>
            </View>        
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    name: {
        flex: 1,
        paddingTop: Dimensions.get('window').height * .05,
        fontSize: Dimensions.get('window').width * .045,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    },
    scoreView: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        flexDirection: 'column',
    },
    score: {
        flex: 1,
        padding: Dimensions.get('window').height * .018,
        fontSize: Dimensions.get('window').height * .04,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    },
    change: {
        flex: 1,
        paddingTop: Dimensions.get('window').height * .018,
        fontSize: Dimensions.get('window').height * .015,
        textAlign: 'center',
        fontFamily: 'BalsamiqSans'
    },
    start: {
        color: '#fff'
    },
    addition: {
        color: Color.right,
    },
    subtraction: {
        color: Color.wrong,
    },
    screwed: {
        color: Color.screwed,
        textTransform: 'uppercase'
    }
})

export default HistoryPlayerScoreComponent