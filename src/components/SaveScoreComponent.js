import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native'

const SaveScoreComponent = ({saveScore, players}) => {

    const saveScoreTemp = () => {
        
    }

    return (
        <TouchableOpacity onPress={saveScoreTemp}>
            <View style={styles.addPlayerButtonContainer}>
                <Text style={styles.addPlayerButton}>Save Score</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addPlayerButtonContainer: {
        marginTop: Dimensions.get('window').height * .01,
        padding:  Dimensions.get('window').height * .03,
    },
    addPlayerButton: {
        color: '#fff',
        textTransform: 'capitalize',
        fontSize: Dimensions.get('window').height * .025,
        textAlign: 'center',
        fontFamily: 'BalsamiqSans'
    },
})

export default SaveScoreComponent