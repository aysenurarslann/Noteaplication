import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, } from "react-native"
import { auth, db, firestore } from '../config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import Login from "./Login";


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    const submitRegister = async () => {
        //Kullanıcı oluşturma Email ve Şifre
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, 'users', email), {
                email: email,
                name: name,
                password: password,
            });
            navigation.navigate('Login', { email: email });
            console.log("Kullanıcı başarıyla oluşturuldu ve veritabanına kaydedildi!");
        }
        catch (error) {
            console.error("Hesap oluşturulurken bir hata oluştu: ", error.message);
        }
    }

    return (
        <View>
            <Text>Register Page</Text>

            <TextInput placeholder="Name"
                onChangeText={text => setName(text)}>
            </TextInput>
            <TextInput placeholder="Email"
                onChangeText={text => setEmail(text)}>
            </TextInput>
            <TextInput placeholder="Password"
                onChangeText={text => setPassword(text)}>
            </TextInput>

            <TouchableOpacity onPress={submitRegister}>
                <Text>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Register;