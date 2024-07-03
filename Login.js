import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, } from "react-native"
import { auth, db, firestore } from '../config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";

const Login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigation = useNavigation()

    const submitLogin = async () => {
        signInWithEmailAndPassword(auth, email, password).then((users) => {
            console.log("giriş yaptınız")
            navigation.navigate('Notlar' , { email: email, password: password })
        })
        console.log(email)
        console.log(password)
    }
    {/*
    const submitRegister = async () => {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            console.log('kayıt oldunuz.')
            navigation.navigate('SignIn')
        })
    }
    */}
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50, }}>
            <TextInput style={styles.input}
                placeholder="E-Posta"
                placholderTextColor="6fc276"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput style={styles.input}
                placeholder="Password"
                placholderTextColor="6fc276"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.btn} onPress={submitLogin} >
                <Text style={styles.btnText}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitLogin} style={{ width: '100%', marginTop: 10 }}>
                <Text style={{ textAlign: 'center' }}>
                    Bu eğlenceye dahil olmadın mı? Katıl Bize!
                </Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: 8,
        margin: 5,
        width: '90%'
    },
    btn: {
        backgroundColor: '#756AB6',
        padding: 13,
        borderRadius: 20,
        margin: 5,
        width: '90%'
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    }
})

export default Login;