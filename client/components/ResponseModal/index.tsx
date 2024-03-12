import React from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import {
  hideResponseModal,
  setResponseMessage
} from "@/redux/serverResponseSlice/serverResponseSlice"
import { RootState } from "@/redux/store"

const ResponseModal = () => {
  const dispatch = useDispatch()
  const { successResult, responseMessage } = useSelector(
    (state: RootState) => state.serverResponseSlice
  )

  const closeModal = () => {
    dispatch(hideResponseModal())
  }

  // * show error modal
  if (successResult === false) {
    return (
      <Modal
        visible={successResult === null ? false : true}
        transparent
        animationType="fade"
      >
        <View style={errorStyles.modalContainer}>
          <View style={errorStyles.modalContent}>
            <Text style={errorStyles.errorMessage}>{responseMessage}</Text>
            <TouchableOpacity
              style={errorStyles.closeButton}
              onPress={closeModal}
            >
              <Text style={errorStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
    // * show succcess modal
  } else if (successResult === true) {
    return (
      <Modal
        visible={successResult === null ? false : true}
        transparent
        animationType="fade"
      >
        <View style={successStyles.modalContainer}>
          <View style={successStyles.modalContent}>
            <Text style={successStyles.errorMessage}>{responseMessage}</Text>
            <TouchableOpacity
              style={successStyles.closeButton}
              onPress={closeModal}
            >
              <Text style={successStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  } else {
    return null
  }
}

// * Error Styles ***********************************
const errorStyles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "red",
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
// * Success Styles ***********************************
const successStyles = StyleSheet.create({
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
    backgroundColor: "green",
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

export default ResponseModal
