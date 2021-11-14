import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import * as Color from '../../../global/Color'
import CircleComponent from '../../components/CircleComponent'

class AboutScreen extends React.Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <CircleComponent isWhite={true}/>
                <Text style={styles.headerText}>About</Text>
                <Text style={styles.version}>1.0.2</Text>
                <Text style={styles.p}>Alligator Games LLC is a Chicago based company specializing in multiplayer games. Our mission
                                        is to bring joy to our users through group party games.</Text>
                <Text style={styles.p}>"Disc Golf - All in One" is an app we made to help you organize your disc golf games!
                                        Not every party game has to be indoors! It's good to get outside every now and then! 
                                        Use this app for all your disc golfing needs!</Text>
                <Text style={styles.p}>Keep a look out for more of our releases! Check out our website: https://alligator.games!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: Dimensions.get('window').height * .1,
        marginLeft: Dimensions.get('window').width * .12,
        marginRight: Dimensions.get('window').width * .12,
        lineHeight: Dimensions.get('window').height * .08,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .05,
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
    version: {
        marginTop: Dimensions.get('window').height * .005,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .03,
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

export default AboutScreen