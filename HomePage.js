import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { firestore } from '../config';
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const HomePage = ({ route }) => {
    const { email } = route.params;
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchUserNotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'users', email, 'notes'));
                const userNotes = querySnapshot.docs.map(doc => doc.data());
                setNotes(userNotes);
            } catch (error) {
                console.error("Notlar alınırken bir hata oluştu: ", error);
            }
        };

        fetchUserNotes();
    }, [email]); // email parametresine bağlı olarak notları al

    const AddNotePage = () => {
        navigation.navigate('Add', { email: email });
    };

    const EditNote = (note) => {
        navigation.navigate('Edit', { email: email, note: note });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notlarınız:</Text>
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.stickyNote}
                        onPress={() => EditNote(item)}
                    >
                        <View style={styles.noteWrapper}>
                            <Text style={styles.noteTitle}>{item.noteTitle}</Text>
                            <Text style={styles.noteContent}>{item.note}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={AddNotePage} style={styles.addButton}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stickyNote: {
        backgroundColor: '#ffd700',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    noteContent: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: '#007bff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomePage;
