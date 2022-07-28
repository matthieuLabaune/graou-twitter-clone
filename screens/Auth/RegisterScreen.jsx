import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import axiosConfig from "../../helpers/axiosConfig";

export default function RegisterScreen({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function register(email, username, password, confirmPassword) {
        setIsLoading(true);
        axiosConfig.post('/register', {
            name, email, username, password, password_confirmation: confirmPassword
        })
            .then(response => {
                Alert.alert('Utilisateur(rice) créé(e) ! Merci de vous authentifier.');
                navigation.navigate('Login Screen');
                setIsLoading(false);
                setError(null)
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })
    }

    return (
        <View style={styles.container}>
            <View style={{marginTop: 130, width: 260}}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/larydefault.png')}
                    />
                </View>
                <View style={{marginTop: 40}}>
                    {error &&
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorTextColor}>{error}</Text>
                        </View>
                    }
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nom"
                        placeholderTextColor="gray"
                    />
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Pseudo"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Mot de passe"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={[styles.inputBox, styles.mt4]}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="Confirmation du mot de passe"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => register(email, username, password, confirmPassword)}
                    style={[styles.loginButton, styles.mt5]}
                >
                    {isLoading && (
                        <ActivityIndicator
                            size="small"
                            color="white"
                            style={{marginRight: 18}}
                        />
                    )}
                    <Text style={styles.loginButtonText}>S'enregistrer</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 12,
                    }}
                >
                    <Text style={[styles.registerText]}>Vous avez déjà un compte?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
                        <Text style={styles.registerTextLink}> Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C7D2FE',
        alignItems: 'center',
    },
    errorContainer: {
        backgroundColor: '#FECACA',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    errorTextColor: {
        color: '#7F1D1D'
    },
    logo: {
        width: 100,
        height: 120,
    },
    inputBox: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4338CA',
        padding: 12,
        borderRadius: 5,
    },
    loginButtonText: {
        color: 'white',
    },
    registerText: {
        fontSize: 12,
    },
    registerTextLink: {
        fontSize: 12,
        color: 'white',
        textDecorationLine: 'underline',
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    mt4: {
        marginTop: 16,
    },

    mt5: {
        marginTop: 22,
    },
});