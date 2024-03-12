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

  console.log("Rendering Error Modal")

  const closeModal = () => {
    dispatch(hideErrorModal())
  }

  console.log(errMessage)

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
    position: "absolute",
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 20
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold"
  }
})

export default ErrorModal
