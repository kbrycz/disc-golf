import React from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native'
import * as Color from '../../global/Color'
import QuitModalComponent from './QuitModalComponent'

const GameHeaderComponent = ({quit, restart, round, next, goToHistory}) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const tempRestart = () => {
        setModalVisible(false)
        restart()
    }

    const tempQuit = () => {
        setModalVisible(false)
        quit()
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleContainer} onPress={() => setModalVisible(true)}>
                    <Text style={styles.title}>Quit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleContainer} onPress={next}>
                    <Text style={styles.title}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleContainer} onPress={goToHistory}>
                    <Text style={styles.title}>History</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.round}>Hole {round}</Text>
            <QuitModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} quit={tempQuit} restart={tempRestart} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        opacity: 1
    },
    titleContainer: {
        flex: 1,
    },

    title: {
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .021,
        borderWidth: 1,
        borderColor: Color.DARKER,
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

export default GameHeaderComponent