/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styledHometeacher = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 20,
        gap: 20
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#CD4C3E',
        marginLeft: 15
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    boxContainer: {
        display: 'flex',
        gap: 5,
        backgroundColor: '#CD4C3E',
        borderRadius: 10,
    },
    boxTitle: {
        color: 'white',
        fontSize: 15
    },

    boxSubTitle: {
        color: 'white',
        fontSize: 11
    },
    Boxseparator: {
        display: 'flex',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        width: '80%',
        height: 2,
        backgroundColor: '#CD4C3E'
    }
});
