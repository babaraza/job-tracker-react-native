import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NumberFormat from "react-number-format";

const Todo = ({ description, amount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ {description}</Text>
      <NumberFormat
        value={amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
        renderText={(value) => <Text style={styles.text}>{value}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 20,
    margin: 5,
  },
});

export default Todo;
