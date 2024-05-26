// Edit.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditNote = ({ navigation, route }) => {
  const { email, note } = route.params;
  const [editedNoteTitle, setEditedNoteTitle] = useState(note.noteTitle);
  const [editedNote, setEditedNote] = useState(note.note);

  const saveEditedNote = () => {
    // Burada notun düzenlenmiş halini kaydetme işlemi yapılabilir
    // Örneğin, firestore gibi bir veritabanına düzenlenmiş notu kaydetmek için bir fonksiyon çağrılabilir
    // Düzenleme işlemi tamamlandıktan sonra, navigasyon ile ana sayfaya geri dönülebilir
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Not Başlığı:</Text>
      <TextInput
        style={styles.input}
        value={editedNoteTitle}
        onChangeText={text => setEditedNoteTitle(text)}
      />
      <Text style={styles.label}>Not:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={editedNote}
        onChangeText={text => setEditedNote(text)}
      />
      <Button title="Kaydet" onPress={saveEditedNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EditNote;
