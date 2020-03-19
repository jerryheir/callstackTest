import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../Styles/Colors';

export const styles = StyleSheet.create({
    headerContainer: {
      padding: 16,
      backgroundColor: colors.white
    },
    headerTopView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 11
    },
    inputStyle: {
      height: 50, 
      width: '85%',
      borderRadius: 25,
      flexDirection: 'row',
      paddingHorizontal: 16, 
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.lightGray
    },
    headerSearchText: {
      color: colors.gray,
      fontSize: 21
    },
    paginationView: { 
      flexDirection: 'row' 
    },
    pagIcon: { 
      height: 30, 
      width: 30,
      marginRight: 3,
      color: colors.white
    },
    pagText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.black
    },
    pagButton: {
      height: 56,
      width: 56,
      borderRadius: 28,
      borderColor: colors.primary,
      borderWidth: .5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      marginLeft: 11
    },
    resultText: {
      textAlign: 'right',
      color: colors.black,
      paddingBottom: 11
    },
    dropDownButton: {
        height: 56,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: .5
    },
    dropDownText: { 
        fontSize: 18, 
        color: colors.primary 
    },
    dropDownIcon: { 
        fontSize: 32, 
        color: colors.primary 
    },
    dropDownItemView: {
        flex: 1,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 21,
        minWidth: 100,
        maxWidth: 200,
        backgroundColor: colors.lightGray
    },
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
    },
    itemContainer: {
        backgroundColor: colors.white,
        alignSelf: 'center',
        height: 110,
        width: Dimensions.get('window').width - 32,
        borderRadius: 4,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 11,
        marginTop: 11
      },
      itemContainerOwner: {
        backgroundColor: colors.white,
        alignSelf: 'center',
        height: 110,
        width: Dimensions.get('window').width - 32,
        borderRadius: 4,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 11,
        marginTop: 11,
        borderColor: colors.gold,
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 1.5 },
        elevation: 3
      },
      itemTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      itemTopInnerView: {
        flexDirection: 'row'
      },
      itemImage: {
        height: 60,
        width: 60,
        borderRadius: 4,
        marginRight: 16
      },
      itemStarView: {
        height: 21,
        flexDirection: 'row',
        alignItems: 'center'
      },
      itemStarText: {
        fontSize: 16
      },
      itemStar: {
          fontSize: 21,
          color: colors.gold
      },
      itemBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      itemTimeText: {
        color: colors.gray,
        fontStyle: 'italic',
        fontSize: 12,
        fontWeight: '600'
      },
      itemRepoText: {
          color: colors.primary,
          fontWeight: '600'
      },
    routesContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.lightGray 
    },
    detailsHeader: {
        position: 'absolute',
        top: 42,
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    detailsHeaderIcon: {
        fontSize: 42,
        color: colors.primary
    },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsImage: {
    height: 200,
    width: 200,
    borderRadius: 8,
    marginBottom: 42
  },
  detailsRowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 32
  },
  itemStarView1: {
    height: 21,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemStarText1: {
    fontSize: 16,
    paddingHorizontal: 16
  },
  detailsMainText: {
      fontSize: 16,
      paddingVertical: 8,
      color: colors.black,
      textAlign: 'center'
  },
  detailsTimeText: {
      color: colors.gray, 
      fontSize: 16,
      textAlign: 'right', 
      fontStyle: 'italic', 
      padding: 32 
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
      },
      contentContainerStyle: {
        flex: 1,
        backgroundColor: colors.lightGray,
        paddingBottom: 5
      },
      loginContainer: {
        flex: 1,
        backgroundColor: colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
      },
      loginImageStyle: {
        width: 250,
        height: 250
      },
      miniImageStyle: {
        height: 30,
        width: 30
      },
      loginTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
        paddingRight: 21
      },
      loginButtonStyle: {
        height: 50,
        borderRadius: 5,
        marginTop: 42,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        paddingHorizontal: 21,
        paddingVertical: 11,
        alignItems: 'center'
      },
      activity: {
        marginTop: 50,
        alignSelf: 'center'
      },
      searchContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 62,
      },
      searchBackIcon: {
          fontSize: 42,
          color: colors.primary
      },
      smallTextInput: {
        fontSize: 21,
        width: '100%'
      },
      searchInputStyle: {
        height: 50, 
        borderRadius: 25,
        flexDirection: 'row',
        paddingHorizontal: 16, 
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGray
      },
      searchItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomColor: colors.gray,
        borderBottomWidth: .5,
        marginHorizontal: 16
      },
      searchText: {
        fontSize: 16,
        fontWeight: '600'
      },
      searchButtonStyle: {
        height: 50,
        borderRadius: 5,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        paddingHorizontal: 21,
        paddingVertical: 11,
        alignItems: 'center'
      },
      searchButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
        paddingRight: 16
      },
      searchButtonIcon: {
          color: colors.white,
          fontSize: 21,
          height: 21,
          width: 21
      },
      switchView: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      switchText: {
          paddingLeft: 16,
          fontSize: 16
      }
  });