import { Text, TextProps } from "./Themed"

export function MooliText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Mooli" }]} />
}
