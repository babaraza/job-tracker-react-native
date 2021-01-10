import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Todo from "./Todo";
import NumberFormat from "react-number-format";
import uuid from "react-native-uuid";

const App = () => {
  const [description, setDescription] = useState("");
  const [gigs, setGigs] = useState([]);
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
      },
    ]);
    setDescription("");
    setAmount("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <TouchableWithoutFeedback accessible={false}> */}
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Job Tracker 💪</Text>
        <View>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Enter job "
            style={styles.input}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            placeholder="Enter amount"
            onChangeText={(amt) => setAmount(amt)}
          />

          <TouchableOpacity
            disabled={!amount || !description}
            style={[
              styles.button,
              !amount || !description
                ? styles.button_disabled
                : styles.button_active,
            ]}
            onPress={addGig}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 17,
                textTransform: "uppercase",
              }}
            >
              Add Gig
            </Text>
          </TouchableOpacity>
        </View>
        <NumberFormat
          value={total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          decimalScale={2}
          fixedDecimalScale={true}
          renderText={(value) => (
            <Text
              style={{
                color: "white",
                fontSize: 22,
                margin: 20,
                fontWeight: "bold",
              }}
            >
              Total Income: {value}
            </Text>
          )}
        />
        <ScrollView
          style={styles.scrollView}
          bounces="true"
          indicatorStyle="white"
        >
          <View onStartShouldSetResponder={() => true}>
            {gigs.map((gig) => (
              <Todo
                key={uuid.v1()}
                description={gig.description}
                amount={gig.amount}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  label: {
    fontSize: 30,
    color: "white",
    margin: 30,
    marginTop: 100,
  },
  input: {
    marginBottom: 10,
    height: 40,
    color: "black",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 5,
    width: 200,
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
  },
  button_active: {
    backgroundColor: "dodgerblue",
  },
  button_disabled: {
    backgroundColor: "#DDDDDD",
  },
  scrollView: { paddingHorizontal: 40 },
});

export default App;
