import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList, SafeAreaView} from 'react-native'
import * as Color from '../../../global/Color'
import CircleComponent from '../../components/CircleComponent'
import HistoryPlayerNameComponent from '../../components/HistoryPlayerNameComponent'


class HistoryScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            players: []
        }
    }

    componentDidMount() {
        this.setState({
            players: this.props.route.params.players
        })
    }

    render() {
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
                    <Text style={styles.round}>History</Text>
                    <FlatList
                    data={this.state.players}
                    renderItem={({item, index}) => (
                        <HistoryPlayerNameComponent player={item} index={index} navigation={this.props.navigation} />
                    )}
                    keyExtractor={item => item.id.toString()}
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

export default HistoryScreen