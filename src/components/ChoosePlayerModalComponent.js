import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Color from '../../global/Color'

const ChoosePlayerModalComponent = ({modalVisible, setModalVisible, players, saveScore}) => {

    const [chosenPlayer, setChosenPlayer] = React.useState(-1)

    const isChosen = (id) => {
        if (id === chosenPlayer) {
            return {
                backgroundColor: '#eee'
            }
        }
    }

    const getAllPlayers = () => {
        return players.map((player) => {
            return (
              <TouchableOpacity style={[styles.playerButton, isChosen(player.id)]} key={player.id} onPress={() => setChosenPlayer(player.id)}>
                  {
                      player.name === ""
                      ? <Text style={styles.player}>Player {player.id + 1}</Text>
                      : <Text style={styles.player}>{player.name}</Text>
                  }
                  
              </TouchableOpacity>
            );
          });
    }
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>Which player's score would you like to save?</Text>
                  <ScrollView style={styles.sv}>
                    {getAllPlayers()}
                  </ScrollView>
                    
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                    style={[styles.button, styles.buttonClose1]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle1}>Cancel</Text>
                    </TouchableOpacity>
                    {
                      chosenPlayer === -1
                      ? <View
                      style={[styles.button, styles.buttonClose2]}
                      onPress={() => saveScore(chosenPlayer)}
                      >
                          <Text style={styles.textStyle2}>Save</Text>
                      </View>
                      : <TouchableOpacity
                      style={[styles.button, styles.buttonClose2]}
                      onPress={() => saveScore(chosenPlayer)}
                      >
                          <Text style={styles.textStyle2}>Save</Text>
                      </TouchableOpacity>
                    }
                    
                  </View>
              </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    sv: {
        maxHeight: Dimensions.get('window').height * .3,
        paddingHorizontal: Dimensions.get('window').width * .05,
        marginVertical: Dimensions.get('window').height * .02,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width: Dimensions.get('window').width * .9,
        marginRight: Dimensions.get('window').width * .05,
        marginLeft: Dimensions.get('window').width * .05,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: Dimensions.get('window').height * .025,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        marginTop: Dimensions.get('window').height * .02,
        padding: Dimensions.get('window').height * .01,
        elevation: 2,
        flex: 1
      },
      buttonClose1: {
        backgroundColor: "#fff",
        borderColor: Color.MAIN,
        borderWidth: 2,
      },
      buttonClose2: {
        backgroundColor: Color.MAIN,
      },
      textStyle1: {
        color: Color.MAIN,
        textAlign: "center",
        fontFamily: 'BalsamiqSans',
        fontSize: Dimensions.get('window').height * .025,
        padding: Dimensions.get('window').width * .01,
      },
      textStyle2: {
        color: "#fff",
        textAlign: "center",
        fontFamily: 'BalsamiqSans',
        fontSize: Dimensions.get('window').height * .025,
        padding: Dimensions.get('window').width * .01,
      },
      modalText: {
        textAlign: 'center',
        color: "#444",
        fontSize: Dimensions.get('window').height * .03,
        lineHeight: Dimensions.get('window').height * .05,
        marginBottom: Dimensions.get('window').height * .03,
        fontFamily: 'BalsamiqSans'
      },
      player: {
        color: Color.MAIN,
        textAlign: "center",
        fontFamily: 'BalsamiqSans',
        fontSize: Dimensions.get('window').height * .025,
        padding: Dimensions.get('window').width * .01,
      },
      playerButton: {
          borderWidth: 1,
          width: Dimensions.get('window').width * .7,
          padding: Dimensions.get('window').height * .01,
          marginBottom: Dimensions.get('window').height * .02,
      }
});

export default ChoosePlayerModalComponent;