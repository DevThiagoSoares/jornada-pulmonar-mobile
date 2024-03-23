/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    carouselItem: {
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        color: '#FFFF',
        borderWidth: 2,
        borderRadius: 10,
        fontWeight: 'bold',
        width: 300,
        padding: 7,
        paddingLeft: 20,
        borderColor: 'transparent',
        backgroundColor: '#CD4C3E'
    },
    image: {
        width: 300,
        height: 200,
        borderWidth: 2,
        borderRadius: 30,
    },
    paginationContainer: {
        paddingVertical: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8,
        backgroundColor: '#000', // Cor dos pontos de paginação
    },
});
