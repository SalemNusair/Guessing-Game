import { useState, useCallback } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOver from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userNumber, setUserNumber] = useState(null);
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);
    const [fontIsLoaded, fontError] = useFonts({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
    const pickedNumberHandler = (pickedNumber) => {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    };
    const gameOverHandler = (numberOfRounds) => {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    };
    const startNewGameHandler = () => {
        setUserNumber(null);
        setGuessRounds(0);
    };
    const onLayoutRootView = useCallback(async () => {
        if (fontIsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontIsLoaded, fontError]);
    if (!fontIsLoaded && !fontError) {
        return null;
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
    if (userNumber) {
        screen = (
            <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
        );
    }
    if (gameIsOver && userNumber) {
        screen = (
            <GameOver
                userNumber={userNumber}
                roundsNumber={guessRounds}
                onStartGame={startNewGameHandler}
            />
        );
    }

    return (
        <>
            <StatusBar style="light" />
            <LinearGradient
                colors={[Colors.primary700, Colors.accent500]}
                style={styles.rootScreen}
                onLayout={onLayoutRootView}
            >
                <ImageBackground
                    source={require("./assets/images/background.png")}
                    resizeMode="cover"
                    style={styles.rootScreen}
                    imageStyle={styles.backgroundImage}
                >
                    <SafeAreaView style={styles.rootScreen}>
                        {screen}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        // backgroundColor: "#ddb52f",
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
