import React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native'; 
import { styles } from "../Styles";
import { colors } from '../Styles/Colors';

const ListEmptyAtom = (props: any) => {
    const { loading } = props;
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
