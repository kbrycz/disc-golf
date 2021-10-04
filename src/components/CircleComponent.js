import React from 'react'
import {View, StyleSheet, Image, Dimensions} from 'react-native'

const CircleComponent = ({isWhite}) => {

    /// Sets the opacity of the circle depending on if color is white
    const imageSize = () => {
        if (isWhite) {
            return {
                position: 'absolute',
                width: Dimensions.get('window').height * .1,
                height: Dimensions.get('window').height * .1,
                opacity: .6
            }
        } else {
            return {
                position: 'absolute',
                width: Dimensions.get('window').height * .1,
                height: Dimensions.get('window').height * .1,
            }
        }
    }

    return (
        <View>
            <View style={[styles.circle1, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle2, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle3, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle4, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle5, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle6, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle7, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle8, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle9, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle10, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle11, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle12, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle13, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
            <View style={[styles.circle14, imageSize()]}>
                <Image
                    style={styles.image} 
                    source={require('../../assets/circle.png')}
                    />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    circle1: {
        top: Dimensions.get('window').height * .3
    },
    circle2: {
        top: Dimensions.get('window').height * .45,
        left: Dimensions.get('window').width * .78
    },
    circle3: {
        top: Dimensions.get('window').height * .6,
        left: Dimensions.get('window').width * .5
    },
    circle4: {
        top: Dimensions.get('window').height * .05,
        left: Dimensions.get('window').width * .85
    },
    circle5: {
        top: Dimensions.get('window').height * -.01,
        left: Dimensions.get('window').width * .1
    },
    circle6: {
        top: Dimensions.get('window').height * .55,
        left: Dimensions.get('window').width * -.05
    },
    circle7: {
        top: Dimensions.get('window').height * .7,
        left: Dimensions.get('window').width * .9
    },
    circle8: {
        top: Dimensions.get('window').height * .4,
        left: Dimensions.get('window').width * .3
    },
    circle9: {
        top: Dimensions.get('window').height * .22,
        left: Dimensions.get('window').width * .7
    },
    circle10: {
        top: Dimensions.get('window').height * .75,
        left: Dimensions.get('window').width * .1
    },
    circle11: {
        top: Dimensions.get('window').height * .93,
        left: Dimensions.get('window').width * .03
    },
    circle12: {
        top: Dimensions.get('window').height * .92,
        left: Dimensions.get('window').width * .8
    },
    circle13: {
        top: Dimensions.get('window').height * .85,
        left: Dimensions.get('window').width * .5
    },
    circle14: {
        top: Dimensions.get('window').height * .13,
        left: Dimensions.get('window').width * .25
    },
})

export default CircleComponent