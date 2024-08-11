import { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    useWindowDimensions,
} from "react-native";
// expo icons documentations: https://icons.expo.fyi/Index
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";
const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};
let minBoundery = 1;
let maxBoundery = 100;
const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();
    const nextGuessHandler = (direcion) => {
        if (
            (direcion === "lower" && currentGuess < userNumber) ||
            (direcion === "greater" && currentGuess > userNumber)
        ) {
            Alert.alert("Don't Lie", "You know that's wrong!", [
                {
                    text: "Sorry!",
                    style: "cancel",
                },
            ]);
            return;
        }
        if (direcion === "lower") {
            maxBoundery = currentGuess;
        } else {
            minBoundery = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(
            minBoundery,
            maxBoundery,
            currentGuess
        );
        setCurrentGuess(newRandomNumber);
        setGuessRounds((previousGuessRounds) => [
            newRandomNumber,
            ...previousGuessRounds,
        ]);
    };
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [userNumber, currentGuess, onGameOver]);
    useEffect(() => {
        minBoundery = 1;
        maxBoundery = 100;
    }, []);
    const guessRoundsListLength = guessRounds.length;
    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsConainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "greater")}
                        >
                            <Ionicons name="add" size={24} color={"white"} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "lower")}
                        >
                            <Ionicons name="remove" size={24} color={"white"} />
                        </PrimaryButton>
                    </View>
                </View>
                {/* + - */}
            </Card>
        </>
    );
    if (width > 500) {
        content = (
            <>
                {/* <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText> */}
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "greater")}
                        >
                            <Ionicons name="add" size={24} color={"white"} />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(this, "lower")}
                        >
                            <Ionicons name="remove" size={24} color={"white"} />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            {/* <View>Log Rounds</View> */}
            <View style={styles.listContaier}>
                <FlatList
                    data={guessRounds}
                    renderItem={(data) => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - data.index}
                            guess={data.item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
};
export default GameScreen;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: "center",
    },
    buttonsConainer: {
        flexDirection: "row",
    },
    buttonsContainerWide: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
    listContaier: {
        flex: 1,
        padding: 16,
    },
});
