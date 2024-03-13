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
      justifyContent: "flex-start",
      alignItems: "center"
    },
    modalContent: {
      backgroundColor:
        success === true
          ? "#e6f7ed"
          : success === false
          ? "#ffebee"
          : undefined,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: 60,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3
    },
    modalIconWrapper: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: success === true ? "green" : "red"
    },
    modalIcon: {
      fontSize: 24,
      color:
        success === true
          ? "#2e8c41"
          : success === false
          ? "#d32f2f"
          : undefined,
      backgroundColor: success === true ? "green" : "red"
    },
    modalMessage: {
      fontSize: 16,
      color:
        success === true
          ? "#2e8c41"
          : success === false
          ? "#d32f2f"
          : undefined,
      flex: 3,
      paddingHorizontal: 12
    },
    closeButton: {
      flex: 1,
      backgroundColor: "white",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    closeButtonText: {}
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
          <View style={styles.modalIconWrapper}>
            <Text style={styles.modalIcon}>
              {success === true ? "✓" : success === false ? "✕" : null}
            </Text>
          </View>
          <Text style={styles.modalMessage}>{message}</Text>
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
