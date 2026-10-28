import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginScreenProps } from './types';
import { styles } from './styles';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { validateEmail, validatePassword } from '../../utils/validators';
import { login, mapAuthError } from '../../services/authService';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      const res = validateEmail(text);
      if (res.isValid) setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      const res = validatePassword(text);
      if (res.isValid) setPasswordError('');
    }
  };

  const handleEmailBlur = () => {
    const res = validateEmail(email);
    if (!res.isValid) {
      setEmailError(res.error || '');
    }
  };

  const handlePasswordBlur = () => {
    const res = validatePassword(password);
    if (!res.isValid) {
      setPasswordError(res.error || '');
    }
  };

  const handleLogin = async () => {
    setGeneralError('');

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    let hasError = false;

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || '');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      if (!emailValidation.isValid) {
        emailInputRef.current?.focus();
      } else if (!passwordValidation.isValid) {
        passwordInputRef.current?.focus();
      }
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // navigation.reset về Main theo mục 5.2
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (err: any) {
      const errorCode = err.code || err.message || '';
      const message = mapAuthError(errorCode);
      setGeneralError(message);
      setPassword('');
      passwordInputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Ionicons name="chatbubbles" size={44} color="white" />
            </View>
            <Text style={styles.appName}>ChatRealtime</Text>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.title}>Chào mừng trở lại</Text>
            <Text style={styles.subtitle}>
              Đăng nhập để tiếp tục trò chuyện với bạn bè.
            </Text>
          </View>

          <View style={styles.formSection}>
            <InputComponent
              ref={emailInputRef}
              label="Email"
              placeholder="ten@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={handleEmailChange}
              onBlur={handleEmailBlur}
              error={emailError}
              editable={!loading}
              leftIcon={
                <Ionicons name="mail-outline" size={18} color="#64748b" />
              }
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <InputComponent
              ref={passwordInputRef}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              isPassword={true}
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordError}
              editable={!loading}
              leftIcon={
                <Ionicons name="lock-closed-outline" size={18} color="#64748b" />
              }
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            {!!generalError && (
              <View style={styles.errorBanner}>
                <Ionicons
                  name="warning-outline"
                  size={17}
                  color={styles.errorBannerIcon.color}
                  style={styles.errorBannerIcon}
                />
                <Text style={styles.errorBannerText}>{generalError}</Text>
              </View>
            )}

            <ButtonComponent
              title="Đăng nhập"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Chưa có tài khoản? </Text>
              <TouchableOpacity
                disabled={loading}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
