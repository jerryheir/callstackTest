import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native'; 
import { colors } from '../Styles/Colors';

const ListEmptyAtom = () => {
    return (
        <View style={styles.container404}>
            <Image 
            source={require('../Images/git-404.png')} 
            style={styles.image404Style}
            />
            <Text style={styles.text404}>404</Text>
        </View>
    )
}

export default ListEmptyAtom;

const styles = StyleSheet.create({
    container404: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image404Style: {
        width: 180,
        opacity: .7,
        marginBottom: 21
    },
    text404: {
        fontSize: 70,
        fontWeight: 'bold',
        color: colors.white
    }
})
