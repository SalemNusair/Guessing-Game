import { Text, StyleSheet, Platform } from "react-native";
const Title = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>;
};
export default Title;
const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        // there are two ways to target platform style
        // borderWidth: Platform.OS === "android" ? 2 : 0, #1
        // borderWidth: Platform.select({ ios: 0, android: 2 }), //#2
        // # 3 change the name of the file with at .ios.js/android.js but the import should be without .ios/.android
        // device will figure it out automatically
        borderWidth: 2,
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300,
    },
});
