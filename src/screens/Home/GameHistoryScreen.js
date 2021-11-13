import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList, SafeAreaView} from 'react-native'
import * as Color from '../../../global/Color'
import CircleComponent from '../../components/CircleComponent'
import HistoryPlayerScoreComponent from '../../components/HistoryPlayerScoreComponent'


class GameHistoryScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            game: {},
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            game: this.props.route.params.game
        }, () => {
            this.setState({loading: false})
            console.log(this.state.game)
        })
    }

    render() {
        if (this.state.loading) {
            return <View style={styles.background}></View>
        }
        
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <SafeAreaView style={styles.sv}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.titleContainer} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.title}>Back</Text>
                        </TouchableOpacity>
                        <View style={styles.titleContainer2}>
                            <Text style={styles.title}> </Text>
                        </View>
                    </View>
                    <Text style={styles.round}>{this.state.game.location}</Text>
                    <FlatList
                    data={this.state.game.history}
                    renderItem={({item, index}) => (
                        <HistoryPlayerScoreComponent score={item.score} round={item.round} prev={item.prev} index={index} />
                    )}
                    keyExtractor={item => item.round.toString()}
                    style={styles.list} />
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Color.MAIN,
        height: '100%',
    },
    list: {
        height: '100%',
    },
    sv: {
        marginBottom: Dimensions.get('window').height * .1,
    },
    container: {
        flexDirection: 'row',
        opacity: 1
    },
    titleContainer: {
        flex: 1,
    },
    titleContainer2: {
        flex: 2,
    },
    title: {
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontSize: Dimensions.get('window').height * .021,
        borderWidth: 1,
        borderColor: Color.DARKER,
        borderLeftWidth: 0,
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

export default GameHistoryScreen