import { useState } from "react";
import {
    TextInput,
    View,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    useWindowDimensions,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
PrimaryButton;
const StartGameScreen = ({ onPickNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState("");
    const { width, height } = useWindowDimensions();
    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    };
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number",
                "Number has to be a number between 1 to 99",
                [
                    {
                        text: "OKay",
                        style: "destructive",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }
        onPickNumber(chosenNumber);
    };
    const resetInputHandler = () => {
        setEnteredNumber("");
    };
    const deviceMarginTop = height < 380 ? 30 : 100;
    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View
                    style={[
                        styles.rootContainer,
                        { marginTop: deviceMarginTop },
                    ]}
                >
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            onChangeText={numberInputHandler}
                            value={enteredNumber}
                        />
                        <View style={styles.buttonsConainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>
                                    Reset
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
export default StartGameScreen;
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: "center",
    },
    numberInput: {
        height: 50,
        width: 50,
        textAlign: "center",
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        fontWeight: "bold",
        marginVertical: 8, // for up and down margin
    },
    buttonsConainer: {
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
    },
});
