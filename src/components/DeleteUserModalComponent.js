import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import * as Color from '../../global/Color'

const DeleteUserModalComponent = ({modalVisible, setModalVisible, name, deletePlayer}) => {

  // Runs the callback function passed in to delete player
  const runFunc = () => {
    setModalVisible(!modalVisible)
    deletePlayer()
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
                <Text style={styles.modalText}>Are you sure you would like to remove {name !== '' ? name : "this player"} from the game?</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                  style={[styles.button, styles.buttonClose1]}
                  onPress={() => setModalVisible(!modalVisible)}
                  >
                      <Text style={styles.textStyle1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={[styles.button, styles.buttonClose2]}
                  onPress={runFunc}
                  >
                      <Text style={styles.textStyle2}>Remove</Text>
                  </TouchableOpacity>
                </View>
               
            </View>
            </View>
        </Modal>
  );
};

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: Dimensions.get('window').width * .7,
    marginRight: Dimensions.get('window').width * .15,
    marginLeft: Dimensions.get('window').width * .15,
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
    fontSize: Dimensions.get('window').height * .024,
    lineHeight: Dimensions.get('window').height * .045,
    marginBottom: Dimensions.get('window').height * .015,
    fontFamily: 'BalsamiqSans'
  }
});

export default DeleteUserModalComponent;