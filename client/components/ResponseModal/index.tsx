import React from "react"
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { hideResponseModal } from "@/redux/serverResponseSlice/serverResponseSlice"
import { RootState } from "@/redux/store"

interface ModalComponentProps {
  visible: boolean
  onClose: () => void
  message: string | null
  success: boolean | null
}

const ModalComponent = ({
  visible,
  onClose,
  message,
  success
}: ModalComponentProps) => {
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    modalContent: {
      backgroundColor: success ? "green" : "red",
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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorMessage}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const ResponseModal = () => {
  const dispatch = useDispatch()
  const { successResult, responseMessage } = useSelector(
    (state: RootState) => state.serverResponseSlice
  )

  const closeModal = () => {
    dispatch(hideResponseModal())
  }

  return (
    <ModalComponent
      visible={successResult !== null}
      onClose={closeModal}
      message={responseMessage}
      success={successResult === true}
    />
  )
}

export default ResponseModal
