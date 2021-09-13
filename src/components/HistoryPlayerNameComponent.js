import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Keyboard, TouchableOpacityBase} from 'react-native'
import * as Color from '../../global/Color'
import { AntDesign } from '@expo/vector-icons'; 

const HistoryPlayerNameComponent = ({player, index, navigation}) => {

    // Gets the correct container color for even / odd
    const containerStyle = (val) => {
        // Even number
        if (val % 2 == 0) {
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
        <TouchableOpacity style={[styles.container, containerStyle(index)]} onPress={() => navigation.navigate('HistoryPlayer', {player})}>
            {
                player.name === ''
                ? <Text style={styles.name}>Player {index + 1}</Text>
                : <Text style={styles.name}>{player.name}</Text>
            }
            <AntDesign name="right" style={styles.icon} />
        </TouchableOpacity>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: Dimensions.get('window').height * .04,
        paddingHorizontal: Dimensions.get('window').width * .02,
    },
    name: {
        flex: 2,
        fontSize: Dimensions.get('window').height * .03,
        marginLeft: Dimensions.get('window').width * .03,
        color: '#fff',
        fontFamily: 'BalsamiqSans'
    },
    icon: {
        marginTop: Dimensions.get('window').height * .01,
        fontSize: Dimensions.get('window').height * .02,
        marginRight: Dimensions.get('window').width * .03,
        color: '#fff',
        flex: 1,
        textAlign: 'right'
    }
})

export default HistoryPlayerNameComponent;