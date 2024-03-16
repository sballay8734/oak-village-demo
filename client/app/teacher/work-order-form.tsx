// TODO: DARK MODE LOOK TERRIBLE
// TODO: Validation with schema (This should also fix error with taskNeeded)
// TODO: classroom should be a dropdown
// TODO: Dropdowns should also have text input that filters classes
// TODO: Classroom should be autopopulated with employee classroom
// TODO: LOADING STATES for requests
// TODO: STYLE FORM, ADD BACK BUTTON
// TODO: Need to use different Icons as expo/vector-icons don't have a "solid" or "bold options"

// TODO: FINISH STYLING REQUEST MODAL (9 is too small for font size!)
// TODO: Modal disappears automatically?
// ! TODO: DEFINE COLORS FOR THEME!!!!
// FIXME: NATIVE modals should ONLY be used for displaying information. They should NOT be able to trigger things that might cause errors.

import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { StyleSheet, Button, TextInput, Pressable } from "react-native"
import { Link, router } from "expo-router"
import { useDispatch } from "react-redux"

import { Text, View } from "@/components/Themed"
import { AntDesign } from "@expo/vector-icons"
import { hideResponseModal } from "@/redux/serverResponseSlice/serverResponseSlice"
import { useCreateWorkOrderMutation } from "@/redux/workOrdersSlice/workOrdersApi"

interface FormData {
  classroom: string // dropdown
  areaInClassroom: string
  taskNeeded: string
  additionalDetails: string
}

const primaryColor = "#e8dff5"
const darkPrimaryColor = "#2e0666"

export default function WorkOrderForm() {
  const dispatch = useDispatch()
  const [borderColor, setBorderColor] = useState<string>("black")
  const [showBoxShadow, setShowBoxShadow] = useState<boolean>(false)
  const [taskNeededError, setTaskNeededError] = useState<string | null>(null)
  const [responseError, setResponseError] = useState<string | null>(null)
  const [createWorkOrder] = useCreateWorkOrderMutation()

  const initialValues: FormData = {
    classroom: "",
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

  function handleFocus() {
    setBorderColor("#985ced")
    setShowBoxShadow(true)
  }

  function handleBluring() {
    setBorderColor("black")
    setShowBoxShadow(false)
  }

  function handleCancel() {
    router.back()
    dispatch(hideResponseModal())
  }

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.containerHeader}>
        {/* TODO: STYLE THIS HEADER BETTER */}
        <Link href="/teacher/(tabs)/orders" asChild>
          <Pressable>
            {({ pressed }) => (
              <>
                <AntDesign
                  name="closecircle"
                  size={24}
                  color="red"
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              </>
            )}
          </Pressable>
        </Link>
        <Text style={styles.title}>Create a new work order as TEACHER</Text>
        <Text style={styles.info}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
      {/* INPUT CONTAINER */}
      <View style={styles.container}>
        {/* CLASSROOM */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Classroom of desired task*</Text>
          <Controller
            control={control}
            name="classroom"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Toddler"
                onBlur={() => console.log("Need to handle BLUR individually")}
                onFocus={() => console.log("Need to handle FOCUS individually")}
                onChangeText={onChange}
                value={value}
                style={{
                  ...styles.input,
                  borderColor,
                  ...(showBoxShadow ? styles.focused : {})
                }}
              />
            )}
          />
          {errors.classroom ? (
            <Text style={styles.error}>This field is required</Text>
          ) : (
            <Text style={styles.error}></Text>
          )}
        </View>
        {/* AREA IN CLASSROOM */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Specific classroom area*</Text>
          <Controller
            control={control}
            name="areaInClassroom"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="e.g. Back of room by the art center"
                onBlur={() => console.log("Need to handle BLUR individually")}
                onFocus={() => console.log("Need to handle FOCUS individually")}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
          {errors.areaInClassroom ? (
            <Text style={styles.error}>This field is required</Text>
          ) : (
            <Text style={styles.error}></Text>
          )}
        </View>
        {/* Task Needed */}
        {/* TODO: When form is submitted, error still appears */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Please describe the task needed*</Text>
          <Controller
            control={control}
            // !FIXME: Remove required for now
            // TODO: Add error message for minLength of 10
            rules={{ maxLength: 500 }}
            name="taskNeeded"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputLarger}
                onBlur={() => console.log("Need to handle BLUR individually")}
                onFocus={() => console.log("Need to handle FOCUS individually")}
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
        {/* Additional Details */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Additional details</Text>
          <Controller
            control={control}
            name="additionalDetails"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputLarger2}
                onBlur={() => console.log("Need to handle BLUR individually")}
                onFocus={() => console.log("Need to handle FOCUS individually")}
                onChangeText={onChange}
                value={value}
                multiline
                maxLength={500}
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
      <View style={styles.buttonWrapper}>
        <Button
          color={darkPrimaryColor}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        ></Button>
        <Button color="red" title="Cancel" onPress={handleCancel}></Button>
      </View>
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
    gap: 20
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
    height: 50,
    padding: 8,
    borderRadius: 8
  },
  inputLarger: {
    fontSize: 15,
    color: "black",
    borderColor: "black",
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
    marginBottom: 12
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
