import { View } from "react-native"
import Route from "../components/Route"

const RouteScreen = () => {
    return (
        <View style={styles.container}>
            <Route />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default RouteScreen;