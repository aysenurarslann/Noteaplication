import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddNote = ({ navigation, route }) => {
    const { email } = route.params;
    const [noteTitle, setNoteTitle] = useState("");
    const [note, setNote] = useState("");

    const addNoteToFirestore = async () => {
        try {
            const noteRef = doc(firestore, 'users', email);
            await updateDoc(noteRef, {
                notes: arrayUnion({ noteTitle, note })
            });
            console.log("Not başarıyla eklendi!");
            navigation.goBack(); // Not eklendikten sonra ana sayfaya geri dön
        } catch (error) {
            console.error("Not eklenirken hata oluştu: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{noteTitle}</Text>
                <Text style={styles.noteText}>{note}</Text>
            </View>
            <Text style={styles.label}>Not Başlığı:</Text>
            <TextInput
                style={styles.input}
                value={noteTitle}
                onChangeText={text => setNoteTitle(text)}
            />
            <Text style={styles.label}>Not:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                value={note}
                onChangeText={text => setNote(text)}
            />
            <Button
                title="Notu Ekle"
                onPress={addNoteToFirestore}
                color="#841584"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center', // Notları ortalamak için
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#841584',
    },
    input: {
        height: 40,
        borderColor: '#841584',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%', // Genişlik tüm ekrana yayılsın
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    noteContainer: {
        backgroundColor: '#FFFF99', // Sarı not kağıdı rengi
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        width: '100%',
    },
    noteText: {
        fontSize: 18,
    },
});

export default AddNote;
