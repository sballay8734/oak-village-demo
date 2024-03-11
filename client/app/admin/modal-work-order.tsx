// TODO: DARK MODE LOOK TERRIBLE
// TODO: Validation with schema (This should also fix error with task needed)
// TODO: classroom should be a dropdown
// TODO: Close modal
// TODO: Global State for form ("minimizing" formModal should not clear content)
// TODO: Dropdowns should also have text input that filters classes
// TODO: Classroom should be autopopulated with employee classroom
import { StatusBar } from "expo-status-bar"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { StyleSheet, Button, TextInput, Pressable } from "react-native"
import { Link, router } from "expo-router"

import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"
import { AntDesign } from "@expo/vector-icons"

interface FormData {
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
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

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
    formState: { errors }
  } = useForm({ defaultValues: initialValues })

  const onSubmit = async (formData: FormData) => {
    setError(null)
    setSuccess(null)
    try {
      const res = await fetch(
        "http://localhost:3001/api/maintenance/create-work-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            employeeName: "John Smith",
            employeeId: "asd093jalksdjf902rh"
          })
        }
      )

      const data = await res.json()

      if (data.success === false) {
        setError(data.message)
        return
      }

      setSuccess("Work order created successfully!")
      reset()
    } catch (error) {
      console.log(error)
    }
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
  }

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.containerHeader}>
        {/* TODO: STYLE THIS HEADER BETTER */}
        <Link href="/admin/(tabs)/orders" asChild>
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
        <Text style={styles.title}>Create a new work order as ADMIN</Text>
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
            rules={{ required: true }}
            name="taskNeeded"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.inputLarger}
                onBlur={() => console.log("Need to handle BLUR individually")}
                onFocus={() => console.log("Need to handle FOCUS individually")}
                onChangeText={onChange}
                value={value}
                multiline
                maxLength={500}
              />
            )}
          />
          {errors.taskNeeded ? (
            <Text style={styles.error}>This field is required</Text>
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
