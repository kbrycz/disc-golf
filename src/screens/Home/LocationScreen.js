import React from 'react'
import {View, StyleSheet, ScrollView, Dimensions, TextInput, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import CircleComponent from '../../components/CircleComponent'
import * as Color from '../../../global/Color'
import { Ionicons } from '@expo/vector-icons'; 

class LocationScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            isSolo: false,
            location: ''
        }
    }

    // Sets the location
    setLocation = (l) => {
        this.setState({location: l})
    }

    componentDidMount() {
        this.setState({
            isSolo: this.props.route.params.isSolo
        })
    }

    // Sends the user to the correct game screen
    goToGame = () => {
        console.log(this.state.isSolo)
        if (this.state.isSolo) {
            this.props.navigation.navigate('Solo', {params: {location: this.state.location}, screen: 'SoloPlay'})
        }
        else {
            this.props.navigation.navigate('Game',  {params: {location: this.state.location}, screen: 'Gameplay'})
        }
    }


    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <SafeAreaView>
                    
                    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={20} style={{height: Dimensions.get('window').height}}> 
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Ionicons name="arrow-back-sharp" style={styles.back} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Where are you playing today?</Text>
                        <TextInput
                            maxLength={18}
                            style={styles.textInput}
                            returnKeyType={"done"}
                            value={this.state.location.toString()}
                            placeholder="Location..."
                            onChangeText={this.setLocation}
                            />
                        <TouchableOpacity style={styles.button} onPress={this.goToGame}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    
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
        marginBottom: Dimensions.get('window').height * .1,
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
        fontSize: Dimensions.get('window').height * .03,
        textAlign: 'center',
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
    button: {
        width: Dimensions.get('window').width * .7,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        marginBottom: Dimensions.get('window').height * .03,
        backgroundColor: '#fff',
        paddingVertical: Dimensions.get('window').width * .03,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 4,
        borderColor: Color.MAIN,
        borderRadius: 20,
    },
    textInput: {
        marginBottom: Dimensions.get('window').height * .1,
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        color: Color.MAIN,
        fontSize: Dimensions.get('window').height * .03,
        letterSpacing: 5,
        textAlign: 'center',
        borderRadius: 10,
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontFamily: 'BalsamiqSans',
        backgroundColor: '#fff'
    },


})

export default LocationScreen