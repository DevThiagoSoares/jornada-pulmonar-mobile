/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styledAvatar = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        gap: 10,
        justifyContent: 'center',
    },
    boxAvatar: {
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 50,
        borderColor: '#A20F07',
        padding: 5
    },
    crownIcon: {
        position: 'absolute',
        top: -39,
        backgroundColor: 'transparent',
    },
    boxContainerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    boxTitle: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(229, 204, 200, 2)',
        borderRadius: 20,
        padding: 5,
    },
    title: {
        color: '#CD4C3E',
        fontWeight: '600',
        fontSize: 11
    },
});
