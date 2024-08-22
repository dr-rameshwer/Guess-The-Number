import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [guess, setGuess] = useState(""); // Holds the user's current guess
  const [randomnum, setRandomNumber] = useState(0); // Holds the randomly generated number
  const [equal, setEqual] = useState(false); // Flag to indicate if the guess is equal to the random number
  const [greater, setGreater] = useState(false); // Flag to indicate if the guess is greater than the random number
  const [less, setLess] = useState(false); // Flag to indicate if the guess is less than the random number
  const [count, setCount] = useState(0); // Tracks the number of guesses made by the user

  // useEffect to generate a random number between 1 and 10 when the component mounts
  useEffect(() => {
    generateRandomNumber();
  }, []);

  // Function to generate a new random number between 1 and 10
  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 10) + 1);
  };

  // Function to handle the guess submission
  const handleGuess = () => {
    const parsedGuess = parseInt(guess); // Convert the guess from string to integer

    // Check if the guess is equal to the random number
    if (parsedGuess === randomnum) {
      setEqual(true);
      setGreater(false);
      setLess(false);
    }
    // Check if the guess is greater than the random number
    else if (parsedGuess > randomnum) {
      setGreater(true);
      setEqual(false);
      setLess(false);
    }
    // Check if the guess is less than the random number
    else if (parsedGuess < randomnum) {
      setLess(true);
      setEqual(false);
      setGreater(false);
    }

    setCount(count + 1); // Increment the guess count
    setGuess(""); // Clear the input field after submission
  };

  // Function to reset the game
  const resetGame = () => {
    setCount(0); // Reset the guess count
    generateRandomNumber(); // Generate a new random number
    setGuess(""); // Clear the input field
    setEqual(false); // Reset the equal flag
    setGreater(false); // Reset the greater flag
    setLess(false); // Reset the less flag
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>{`Game - Guess the number - Enter your guess between 1 - 10`}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your guess"
          keyboardType="numeric"
          value={guess}
          onChangeText={(text) => {
            setGuess(text);
            setEqual(false);
            setGreater(false);
            setLess(false);
          }}
        />
        <Button title="Submit" onPress={handleGuess} />
        <Button title="Reset Game" onPress={resetGame} />
        {/* Reset Game button */}
      </View>
      <View style={styles.result}>
        {equal && (
          <Text style={styles.resultText}>
            {`You guessed the correct number in ${count} guesses`}
          </Text>
        )}
        {greater && (
          <Text style={styles.resultText}>
            You guessed a number greater than the random number
          </Text>
        )}
        {less && (
          <Text style={styles.resultText}>
            You guessed a number less than the random number
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  content: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
});
