// TODO: DARK MODE LOOK TERRIBLE

import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import {
  StyleSheet,
  Button,
  TextInput,
  GestureResponderEvent
} from "react-native"
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik"

import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"

interface WorkOrderFormValues {
  classroom: string // dropdown
  areaInClassroom: string
  taskNeeded: string
  additionalDetails: string
}

const primaryColor = "#e8dff5"
const darkPrimaryColor = "#2e0666"

export default function WorkOrderModal() {
  const [borderColor, setBorderColor] = useState<string>("black")
  const [showBoxShadow, setShowBoxShadow] = useState<boolean>(false)

  const initialValues: WorkOrderFormValues = {
    classroom: "",
    areaInClassroom: "",
    taskNeeded: "",
    additionalDetails: ""
  }

  function handleFocus() {
    setBorderColor("#985ced")
    setShowBoxShadow(true)
  }

  function handleBluring() {
    setBorderColor("black")
    setShowBoxShadow(false)
  }

  return (
    <View style={styles.page}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Create a new work order</Text>
        <Text style={styles.info}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            {/* DROPDOWN */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Location of desired task</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor,
                  ...(showBoxShadow ? styles.focused : {})
                }}
                onChangeText={handleChange("classroom")}
                // BLUR IS WHEN IT IS NO LONGER FOCUSED
                // onBlur={() => console.log("BLUR")}
                // onBlur={handleBlur("classroom")}
                value={values.classroom}
                placeholder="Toddler"
                // FOCUS IS WHEN IT GOES FROM NOT FOCUSED TO FOCUSED
                onFocus={handleFocus}
                onBlur={handleBluring}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>
                Specific classroom/area (optional)
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("areaInClassroom")}
                onBlur={handleBlur("areaInClassroom")}
                value={values.areaInClassroom}
                placeholder="e.g. Back of room by the art center"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Please describe the task needed</Text>
              <TextInput
                style={styles.inputLarger}
                onChangeText={handleChange("taskNeeded")}
                onBlur={handleBlur("taskNeeded")}
                value={values.taskNeeded}
                multiline
                maxLength={500}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Additional details</Text>
              <TextInput
                style={styles.inputLarger2}
                onChangeText={handleChange("additionalDetails")}
                onBlur={handleBlur("additionalDetails")}
                value={values.additionalDetails}
                multiline
                maxLength={500}
              />
            </View>
            <Button
              // TODO: Not a long term solution for onPress
              onPress={handleSubmit as (e?: GestureResponderEvent) => void}
              title="Submit"
              color={darkPrimaryColor}
            />
            <Button
              // TODO: Not a long term solution for onPress
              onPress={() => console.log("This button should close modal")}
              title="Cancel"
              color={"red"}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 30,
    gap: 30
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // gap: 20,
    width: "100%"
  },
  containerHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    backgroundColor: primaryColor,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 }
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  input: {
    fontSize: 15,
    color: "black",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 55,
    padding: 10,
    borderRadius: 8
  },
  // TODO: Padding is not applying (There is apparently a fix, must update)
  inputLarger: {
    fontSize: 15,
    color: "black",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 150,
    padding: 10,
    paddingTop: 10,
    borderRadius: 8
  },
  inputLarger2: {
    fontSize: 15,
    color: "black",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 100,
    padding: 10,
    paddingTop: 10,
    borderRadius: 8
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    // flexGrow: 1
    width: "90%",
    marginBottom: 20
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 6,
    fontWeight: "bold"
  },
  info: {
    fontSize: 12,
    width: "90%",
    textAlign: "center",
    color: "#383838"
  },
  focused: {
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowColor: "purple",
    shadowOffset: { width: 0, height: 0 }
  }
})
