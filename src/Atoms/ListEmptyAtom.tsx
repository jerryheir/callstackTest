import React from 'react';
import { View, Image, Text, ActivityIndicator, StyleSheet } from 'react-native'; 
import { useSelector } from "react-redux";
import { colors } from '../Styles/Colors';

const ListEmptyAtom = () => {
    const { loading } = useSelector((state: any)=>state.main);
    return (
        <View style={styles.container404}>
            {
                (loading === false) && 
                <View>
                    <Image 
                    source={require('../Images/git-404.png')} 
                    style={styles.image404Style}
                    />
                    <Text style={[styles.text404, { fontSize: 42 }]}>Not Found</Text>
                    <Text style={styles.text404}>404</Text>
                </View>
            }
            {
                (loading === true) &&
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color={colors.white} />
                </View>
            }
        </View>
    )
}

export default ListEmptyAtom;

const styles = StyleSheet.create({
    container404: {
        flex: 1,
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image404Style: {
        width: 180,
        opacity: .7,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 21
    },
    loadingView: {
        marginTop: 120,
        backgroundColor: colors.primary,
        height: 80,
        width: 80, 
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text404: {
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.white
    }
})
