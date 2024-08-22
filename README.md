Create a project with following commant

npx create-expo-app@latest your_project_name

Go inside project folder

cd your_project_name

Now open VS code in same dir

code ..

Open terminal inside VS code and run

npm start

then press w for web view or a for android emulator or scan QR to run code on your phone in Expo App

########################################################################################

Step by step code explanation

under the index.tsx file follow the following steps

1. Import Required Libraries

import {
Button,
SafeAreaView,
StyleSheet,
Text,
TextInput,
View,
} from "react-native";
import { useEffect, useState } from "react";

Button, SafeAreaView, StyleSheet, Text, TextInput, View: These are UI components from React Native.
useEffect, useState: These are React hooks. useState is used to manage state, and useEffect is used to perform side effects like generating a random number when the component mounts.

2. Define the Component and State Variables

export default function HomeScreen() {
const [guess, setGuess] = useState("");
const [randomnum, setRandomNumber] = useState(0);
const [equal, setEqual] = useState(false);
const [greater, setGreater] = useState(false);
const [less, setLess] = useState(false);
const [count, setCount] = useState(0);

guess: Holds the user's current guess.
randomnum: Stores the randomly generated number.
equal, greater, less: Flags to determine whether the guess is equal to, greater than, or less than the random number.
count: Tracks the number of guesses made by the user.

3. Generate a Random Number on Component Mount

useEffect(() => {
generateRandomNumber();
}, []);

The useEffect hook calls the generateRandomNumber function when the component first mounts.

4. Generate a New Random Number
   const generateRandomNumber = () => {
   setRandomNumber(Math.floor(Math.random() \* 10) + 1);
   };

generateRandomNumber: This function generates a random number between 1 and 10 and updates the randomnum state

5. Handle the User's Guess

const handleGuess = () => {
const parsedGuess = parseInt(guess);

    if (parsedGuess === randomnum) {
      setEqual(true);
      setGreater(false);
      setLess(false);
    } else if (parsedGuess > randomnum) {
      setGreater(true);
      setEqual(false);
      setLess(false);
    } else if (parsedGuess < randomnum) {
      setLess(true);
      setEqual(false);
      setGreater(false);
    }

    setCount(count + 1);
    setGuess("");

};

handleGuess: This function checks if the user's guess matches the random number, and sets the appropriate flags (equal, greater, less). It also increments the guess count and clears the input field.

6. Reset the Game

const resetGame = () => {
setCount(0);
generateRandomNumber();
setGuess("");
setEqual(false);
setGreater(false);
setLess(false);
};

resetGame: This function resets the game by clearing the guess count, generating a new random number, and resetting the flags and input field

7. Render the UI

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

SafeAreaView: Ensures that the content is rendered within the safe area boundaries of a device.
TextInput: Accepts the user's guess.
Button: Used for submitting the guess and resetting the game.
Text: Displays messages to the user based on their guess.

8. Define the Styles (Optional but if used in above code then have to define below)

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

container: Defines the overall layout and padding.
input: Styles the input field where users enter their guesses.
resultText: Styles the text that displays the results of the user's guesses.
