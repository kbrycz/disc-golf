import React from 'react'
import {View, StyleSheet, ScrollView, Dimensions, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import CircleComponent from '../../components/CircleComponent'
import * as Color from '../../../global/Color'
import { Ionicons } from '@expo/vector-icons'; 

class GameTypeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <SafeAreaView>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')} >
                        <Ionicons name="arrow-back-sharp" style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>How would you like to play?</Text>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Location', {isSolo: true})}>
                        <Text style={styles.buttonText}>Solo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Location', {isSolo: false})}>
                        <Text style={styles.buttonText}>Group</Text>
                    </TouchableOpacity>
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
    buttonText: {
        fontSize: Dimensions.get('window').height * .07,
        textAlign: 'center',
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans',
    },
    button: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .06,
        backgroundColor: '#fff',
        paddingVertical: Dimensions.get('window').width * .04,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 4,
        borderColor: Color.MAIN,
        borderRadius: 20,
    },

})

export default GameTypeScreen