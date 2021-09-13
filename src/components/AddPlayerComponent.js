import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native'

const AddPlayerComponent = ({addNewPlayer}) => {

    return (
        <TouchableOpacity onPress={addNewPlayer}>
            <View style={styles.addPlayerButtonContainer}>
                <Text style={styles.addPlayerButton}>+ Add player</Text>
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

export default AddPlayerComponent