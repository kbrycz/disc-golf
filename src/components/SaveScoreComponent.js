import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native'
import ChoosePlayerModalComponent from './ChoosePlayerModalComponent'

const SaveScoreComponent = ({saveScore, players}) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [showButton, setShowButton] = React.useState(true)

    const tempSaveScore = (id) => {
        setModalVisible(false)
        setShowButton(false)
        saveScore(id)
    }


    return (
        <>
        {
            showButton
            ?         <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.addPlayerButtonContainer}>
                    <Text style={styles.addPlayerButton}>Save Score</Text>
                </View>
            </TouchableOpacity>
            <ChoosePlayerModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} saveScore={tempSaveScore} players={players} />
            </>
            : <Text style={styles.saved}>Your score has been saved</Text>
        }
        </>
    )
}

const styles = StyleSheet.create({
    saved: {
        marginTop: Dimensions.get('window').height * .01,
        padding:  Dimensions.get('window').height * .03,
        color: '#fff',
        textTransform: 'capitalize',
        fontSize: Dimensions.get('window').height * .025,
        textAlign: 'center',
        fontFamily: 'BalsamiqSans'
    },
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