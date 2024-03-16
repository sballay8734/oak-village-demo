import { View, Text, Pressable } from "react-native"

import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { getDateDifference } from "@/helpers/dateFormatting"

interface WorkOrderCardProps {
  classroom: string
  areaInClassroom: string
  taskNeeded: string
  additionalDetails?: string
  employeeName: string
  status: string
  dateSubmitted: string
}

// TODO: FADE OUT TEXT (2 lines max, 2nd line faded)

export default function WorkOrderCard({
  classroom,
  areaInClassroom,
  taskNeeded,
  additionalDetails,
  employeeName,
  status,
  dateSubmitted
}: WorkOrderCardProps) {
  return (
    <View
      style={{
        width: "100%",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}
    >
      {/* // * Header and three dots (...) */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {classroom} - {areaInClassroom}
        </Text>
        <Pressable>
          {({ pressed }) => (
            <Feather name="more-horizontal" size={24} color="black" />
          )}
        </Pressable>
      </View>
      {/* // * Description */}
      <View>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
          nemo esse amet nobis error veritatis dolor mollitia...
        </Text>
      </View>
      {/* // * Date and how many days ago it was submitted, status on bottom right */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center"
          }}
        >
          <AntDesign name="calendar" size={16} color="black" />
          <Text>{new Date(dateSubmitted).toDateString()} -</Text>
          <Text>{getDateDifference(dateSubmitted)} days ago</Text>
        </View>
        <Text>{status}</Text>
        {/* <Text>{employeeName}</Text> */}
      </View>
    </View>
  )
}
