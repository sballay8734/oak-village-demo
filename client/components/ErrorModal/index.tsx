import React from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { hideErrorModal, setError } from "@/redux/errorSlice/errorSlice"
import { RootState } from "@/redux/store"

const ErrorModal = () => {
  const dispatch = useDispatch()
  const errMessage = useSelector(
    (state: RootState) => state.errorSlice.errMessage
  )

  const closeModal = () => {
    dispatch(hideErrorModal())
  }

  return (
    <Modal
      visible={errMessage === null ? false : true}
      transparent
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorMessage}>{errMessage}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    width: "90%",
    height: "10%",
    backgroundColor: "white",
    position: "relative",
    zIndex: 1000
  },
  modalContent: {},
  errorMessage: {},
  closeButton: {},
  closeButtonText: {}
})

export default ErrorModal
