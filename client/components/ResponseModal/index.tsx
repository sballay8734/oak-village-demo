import React, { useState, useEffect } from "react"
// ! React Native Modal is sort of an old library. Be aware.
import Modal from "react-native-modal"
import { TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { AntDesign } from "@expo/vector-icons"
import { Text, View } from "../Themed"

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

  if (message && message.length > 50) {
    console.error(`MODAL MSG IS TOO LONG! MSG: ${message}`)
  }

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
        success === true ? "white" : success === false ? "white" : undefined,
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
      shadowOpacity: 0.18,
      shadowRadius: 8.22,
      elevation: 3
    },
    // * MODAL ICON
    modalIconWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: success === true ? "#49c85f" : "#fe6464",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      height: 60,
      width: 65
    },
    modalIcon: {
      fontSize: 24,
      color:
        success === true ? "black" : success === false ? "black" : undefined,
      backgroundColor: success === true ? "#49c85f" : "#fe6464"
    },
    // * MODAL MESSAGE
    modalMessageContainer: {
      flex: 3,
      height: "100%",
      paddingHorizontal: 12,
      borderRightWidth: 1,
      borderRightColor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    modalMessageTop: {
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.3,
      color:
        success === true ? "black" : success === false ? "black" : undefined,
      backgroundColor: "white"
    },
    modalMessageBottomWrapper: {
      display: "flex",
      borderRadius: 1,
      overflow: "hidden"
    },
    modalMessageBottom: {
      fontSize: message && message?.length > 38 ? 9 : 11,
      fontWeight: "600",
      color:
        success === true ? "green" : success === false ? "#870000" : undefined
      // backgroundColor:
      //   success === true
      //     ? "#ceffc7"
      //     : success === false
      //     ? "#ffc7c7"
      //     : undefined,
      // padding: 2,
      // paddingHorizontal: 4,
      // borderRadius: 10,
      // display: "flex"
    },
    // * CLOSE BUTTON
    closeButton: {
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      height: 60,
      width: 65
    },
    closeButtonText: {
      fontSize: 9,
      color: "#c9c9c9"
    }
  })

  function closeModal() {
    setLocalVisible(false)
  }

  return (
    <Modal
      isVisible={localVisible}
      animationIn={"fadeInDown"}
      animationInTiming={300}
      animationOut={"fadeOutUp"}
      animationOutTiming={300}
      // hasBackdrop={false}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onModalHide={onModalHide}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalIconWrapper}>
            <Text style={styles.modalIcon}>
              {success === true ? (
                <AntDesign name="checkcircleo" size={28} color="white" />
              ) : success === false ? (
                <AntDesign name="closecircleo" size={28} color="white" />
              ) : null}
            </Text>
          </View>
          <View style={styles.modalMessageContainer}>
            <Text style={styles.modalMessageTop}>
              {success ? "Success!" : "Error!"}
            </Text>
            <View style={styles.modalMessageBottomWrapper}>
              <Text style={styles.modalMessageBottom}>{message}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>CLOSE</Text>
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
