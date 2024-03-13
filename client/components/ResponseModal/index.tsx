import React, { useState, useEffect } from "react"
// ! React Native Modal is sort of an old library. Be aware.
import Modal from "react-native-modal"
import {
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
  message: string | null
  success: boolean | null
  onModalHide: () => void
}

function ModalComponent({
  visible,
  message,
  success,
  onModalHide
}: ModalComponentProps) {
  const [localVisible, setLocalVisible] = useState<boolean>(visible)

  // * This useEffect is needed to ensure that localVisible updates with visible
  // ! You MUST handle isVisible locally. Do NOT change this. If you use your slice state to control visibility directly, the modal will not show/hide properly and content will clear early.
  useEffect(() => {
    setLocalVisible(visible)
  }, [visible])

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
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

  function closeModal() {
    setLocalVisible(false)
  }

  return (
    <Modal
      isVisible={localVisible}
      animationIn={"slideInRight"}
      animationInTiming={400}
      animationOut={"slideOutUp"}
      animationOutTiming={500}
      hasBackdrop={false}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onModalHide={onModalHide}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorMessage}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default function ResponseModal() {
  const dispatch = useDispatch()
  const { successResult, responseMessage } = useSelector(
    (state: RootState) => state.serverResponseSlice
  )

  function onModalHide() {
    dispatch(hideResponseModal())
  }

  return (
    <ModalComponent
      visible={successResult !== null}
      message={responseMessage}
      success={successResult === true}
      onModalHide={onModalHide}
    />
  )
}
