import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'native-base';

export default class ExpandableAtom extends React.PureComponent {
    render() {
        const { title, seat, from, to } = this.props.item;
        const name = (title && title.length > 13) ? title.substring(0, 10) + '...' : title;
        return (
            <View style={styles.atomContainer}>
                <View style={styles.justRow}>
                    <View style={styles.profilePicture}>
                        <Text style={styles.name}>{title.charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.seat}>Seat {seat}</Text>
                        <View style={styles.rowMargin}>
                            <View style={styles.marginRight}>
                                <Icon 
                                type="Octicons"
                                name="primitive-dot"
                                style={styles.dot}
                                />
                                <View style={styles.dash} />
                                <Icon 
                                type="MaterialIcons"
                                name="location-on"
                                style={styles.locate}
                                />
                            </View>
                            <View style={styles.spaceBetween}>
                                <Text style={styles.area}>{from}</Text>
                                <Text style={styles.area}>{to}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.endButton}>
                    <Text style={styles.endText}>End Trip</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    atomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 132,
        paddingVertical: 16,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: .5
    },
    justRow: {
        flexDirection: 'row'
    },
    profilePicture: {
        marginRight: 11,
        backgroundColor: '#c0c0c0',
        borderRadius: 18,
        height: 36,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: { 
        fontSize: 16, 
        color: '#000054', 
        fontWeight: 'bold' 
    },
    seat: { 
        fontSize: 16, 
        color: '#000054' 
    },
    rowMargin: {
        flexDirection: 'row',
        marginTop: 16,
    },
    marginRight: {
        marginRight: 11
    },
    dot: { 
        fontSize: 15, 
        marginLeft: 3, 
        marginBottom: 3 
    },
    dash: {
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        transform: [{ rotate: '90deg'}]
    },
    locate: { 
        fontSize: 14, 
        marginTop: 7 
    },
    spaceBetween: { 
        justifyContent: 'space-between' 
    },
    area: { 
        fontSize: 11, 
        color: '#000054' 
    },
    endButton: {
        borderWidth: 1,
        borderColor: '#26142a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 42
    },
    endText: { 
        fontSize: 18, 
        color: '#26142a' 
    }
  });