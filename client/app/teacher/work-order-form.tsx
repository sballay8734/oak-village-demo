// TODO: Validation with schema (This should also fix error with taskNeeded)
// TODO: LOADING STATES for requests

// TODO: FINISH STYLING REQUEST MODAL (9 is too small for font size!)
// TODO: Cant see "Additional Details" text while typing
// TODO: If work order submission fails, form should not be cleared

import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import {
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native"
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer/KeyboardAvoidingContainer"
import { Link, router } from "expo-router"
import { useDispatch, useSelector } from "react-redux"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Dropdown } from "react-native-element-dropdown"

import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { schoolClassrooms } from "@/constants/schoolClassrooms"
import { Text, View } from "@/components/Themed"
import { hideResponseModal } from "@/redux/serverResponseSlice/serverResponseSlice"
import { useCreateWorkOrderMutation } from "@/redux/workOrdersSlice/workOrdersApi"
import Colors from "@/constants/Colors"
import { RootState } from "@/redux/store"

interface FormData {
  classroom: string // dropdown
  areaInClassroom: string
  taskNeeded: string
  additionalDetails: string
}

interface FormStyle {
  classroom: boolean
  area: boolean
  task: boolean
  details: boolean
}

const primaryColor = "#e8dff5"
const darkPrimaryColor = "#2e0666"

export default function WorkOrderForm() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()
  const [taskNeededError, setTaskNeededError] = useState<string | null>(null)
  const [responseError, setResponseError] = useState<string | null>(null)
  const [createWorkOrder] = useCreateWorkOrderMutation()
  const [styleState, setStyleState] = useState<FormStyle>({
    classroom: false,
    area: false,
    task: false,
    details: false
  })

  const initialValues: FormData = {
    classroom: employee !== null ? employee.classroom : "Toddler 5",
    areaInClassroom: "",
    taskNeeded: "",
    additionalDetails: ""
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ defaultValues: initialValues })

  const onSubmit = async (formData: FormData) => {
    // dispatch(hideResponseModal())
    setTaskNeededError(null)
    setResponseError(null)

    try {
      const res = await createWorkOrder(formData)
      console.log("FROM COMPONENT", res)
    } catch (err) {
      console.log("CAUGHT ERROR", err)
    }
    reset()
    clearErrors()
    router.back()
  }

  function handleCancel() {
    router.back()
    dispatch(hideResponseModal())
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // Paddings to handle safe area
          // paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}
      >
        {/* HEADER */}
        <SafeAreaView style={styles.containerHeader}>
          <Link
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginLeft: 20
            }}
            href="/teacher/(tabs)/orders"
            asChild
          >
            <Pressable
              style={{
                display: "flex",
                backgroundColor: Colors.light.actionDarker,
                borderRadius: 100,
                padding: 4
              }}
            >
              {({ pressed }) => (
                <>
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="white"
                    style={{ opacity: pressed ? 0.5 : 1, marginRight: 4 }}
                  />
                </>
              )}
            </Pressable>
          </Link>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
              alignItems: "center"
            }}
          >
            <Text style={styles.title}>Create Work </Text>
            <MaterialCommunityIcons
              name="progress-wrench"
              size={24}
              color={Colors.light.actionDarker}
            />
            <Text style={styles.title}>rder</Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              width: "90%",
              color: Colors.light.actionDarker,
              opacity: 0.6
            }}
          >
            Fill out the form below to submit a request for maintenance or
            repairs.
          </Text>
        </SafeAreaView>
        {/* INPUT CONTAINER */}
        <View style={styles.container}>
          {/* //* CLASSROOM */}
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Classroom of desired task*</Text>
              <Controller
                control={control}
                name="classroom"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Dropdown
                    style={{
                      ...styles.input,
                      borderColor: styleState.classroom
                        ? Colors.light.action
                        : "black",
                      backgroundColor: styleState.classroom
                        ? "#faf7ff"
                        : "white"
                    }}
                    containerStyle={styles.dropdown}
                    itemContainerStyle={styles.dropdownItem}
                    activeColor={primaryColor}
                    data={schoolClassrooms}
                    labelField="label"
                    valueField="label"
                    onChange={(item) => onChange(item.label)}
                    value={value}
                    maxHeight={350}
                    autoScroll={false}
                    onBlur={() =>
                      setStyleState({ ...styleState, classroom: false })
                    }
                    onFocus={() =>
                      setStyleState({ ...styleState, classroom: true })
                    }
                  />
                )}
              />
              {errors.classroom ? (
                <Text style={styles.error}>This field is required</Text>
              ) : (
                <Text style={styles.error}></Text>
              )}
            </View>
            {/* //* AREA IN CLASSROOM */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Specific classroom area*</Text>
              <Controller
                control={control}
                name="areaInClassroom"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="e.g. Back of room by the art center"
                    onChangeText={onChange}
                    value={value}
                    onBlur={() => setStyleState({ ...styleState, area: false })}
                    onFocus={() => setStyleState({ ...styleState, area: true })}
                    maxLength={75}
                    style={{
                      ...styles.input,
                      borderColor: styleState.area
                        ? Colors.light.action
                        : "black",
                      backgroundColor: styleState.area ? "#faf7ff" : "white"
                    }}
                  />
                )}
              />
              {errors.areaInClassroom ? (
                <Text style={styles.error}>This field is required</Text>
              ) : (
                <Text style={styles.error}></Text>
              )}
            </View>
            {/* //* Task Needed */}
            {/* // TODO: When form is submitted, error still appears */}
            {/* // TODO: Pressing "return" does not exit field */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Please describe the problem*</Text>
              <Controller
                control={control}
                // !FIXME: Remove required for now
                // TODO: Add error message for minLength of 10
                rules={{ maxLength: 350 }}
                name="taskNeeded"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    scrollEnabled={false}
                    maxLength={350}
                    onBlur={() => setStyleState({ ...styleState, task: false })}
                    onFocus={() => setStyleState({ ...styleState, task: true })}
                    style={{
                      ...styles.inputLarger,
                      borderColor: styleState.task
                        ? Colors.light.action
                        : "black",
                      backgroundColor: styleState.task ? "#faf7ff" : "white"
                    }}
                    onChangeText={onChange}
                    value={value}
                    multiline
                  />
                )}
              />
              {/* FIXME: This error persists even when form is reset and errors are cleared. Removing "multiline" fixes the error but screws with the TextBox format. This is your current work-around (using the server response to render the error) */}
              {taskNeededError ? (
                <Text style={styles.error}>{taskNeededError}</Text>
              ) : (
                <Text style={styles.error}></Text>
              )}
            </View>
            {/* //* Additional Details */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Additional details</Text>
              <Controller
                control={control}
                name="additionalDetails"
                rules={{ maxLength: 350 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={() =>
                      setStyleState({ ...styleState, details: false })
                    }
                    onFocus={() =>
                      setStyleState({ ...styleState, details: true })
                    }
                    style={{
                      ...styles.inputLarger2,
                      borderColor: styleState.details
                        ? Colors.light.action
                        : "black",
                      backgroundColor: styleState.details ? "#faf7ff" : "white"
                    }}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    maxLength={350}
                  />
                )}
              />
              {errors.additionalDetails ? (
                <Text style={styles.error}>Something is wrong</Text>
              ) : (
                <Text style={styles.error}></Text>
              )}
            </View>
            {/* SERVER ERRORS */}
            <View>
              {responseError ? (
                <Text style={styles.serverError}>{responseError}</Text>
              ) : (
                <Text style={styles.serverErrorNone}></Text>
              )}
            </View>
          </ScrollView>
        </View>
        {/* TODO: These need to appear from top as reqModal */}
        {/* {error !== null ? (
          <Text style={styles.reqError}>{error}</Text>
        ) : (
          <Text style={styles.reqError}></Text>
        )}
        {success !== null ? (
          <Text style={styles.reqSuccess}>{success}</Text>
        ) : (
          <Text style={styles.reqSuccess}></Text>
        )} */}
        {/* BUTTON WRAPPER */}
        {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
        <View style={styles.buttonWrapper}>
          <Button
            color={darkPrimaryColor}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          ></Button>
          <Button color="red" title="Cancel" onPress={handleCancel}></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 30,
    gap: 20
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // gap: 20,
    width: "100%",
    marginTop: 30
  },
  containerHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
    shadowOffset: { width: 0, height: 3 },
    position: "relative"
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold"
  },
  separator: {
    height: 1,
    width: "100%"
  },
  input: {
    fontSize: 15,
    color: "black",
    // backgroundColor: "#f2defc",
    borderWidth: 1,
    width: "100%",
    height: 50,
    padding: 8,
    borderRadius: 8
  },
  dropdown: {
    fontSize: 15,
    color: "black",
    borderWidth: 1,
    width: "91%",
    borderRadius: 6,
    borderColor: Colors.light.action,
    overflow: "hidden"
  },
  dropdownItem: {
    // borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: primaryColor
  },
  inputLarger: {
    fontSize: 15,
    color: "black",
    borderColor: "#b891cc",
    borderWidth: 1,
    width: "100%",
    height: 150,
    padding: 10,
    paddingTop: 10,
    borderRadius: 8,
    textAlignVertical: "top"
  },
  inputLarger2: {
    fontSize: 15,
    color: "black",
    borderColor: "#b891cc",
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
    marginBottom: 8
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 6,
    fontFamily: "PoppinsMed"
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
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "90%"
  },
  error: {
    color: "red",
    marginTop: 5,
    alignSelf: "flex-start",
    height: 14,
    fontSize: 10
  },
  serverError: {
    color: "black",
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 5,
    alignSelf: "flex-start",
    height: 20,
    fontSize: 11,
    borderRadius: 10,
    fontWeight: "bold"
  },
  serverErrorNone: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 5,
    alignSelf: "flex-start",
    height: 20,
    fontSize: 11,
    borderRadius: 10,
    fontWeight: "bold"
  },
  reqError: {
    color: "red",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "600"
  },
  reqSuccess: {
    color: "green",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "600"
  }
})
