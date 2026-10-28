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
import { RegisterScreenProps } from './types';
import { styles } from './styles';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { Toast } from '../../components/Toast';
import {
  validateName,
  normalizeName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  checkPasswordStrength,
  PasswordStrength,
} from '../../utils/validators';
import { register, mapAuthError } from '../../services/authService';
import { useToast } from '../../hooks/useToast';
import { colors } from '../../theme';

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { toast, showToast } = useToast();

  const nameInputRef = useRef<any>(null);
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);
  const confirmPasswordInputRef = useRef<any>(null);

  const passwordStrength: PasswordStrength | null = password
    ? checkPasswordStrength(password)
    : null;

  const handleNameChange = (text: string) => {
    setName(text);
    if (nameError) {
      const res = validateName(text);
      if (res.isValid) setNameError('');
    }
  };

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
    // Sửa mật khẩu thì tự kiểm tra lại ô nhập lại theo mục 7.2
    if (confirmPassword) {
      const confirmRes = validateConfirmPassword(text, confirmPassword);
      if (confirmRes.isValid) {
        setConfirmPasswordError('');
      }
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (confirmPasswordError) {
      const res = validateConfirmPassword(password, text);
      if (res.isValid) setConfirmPasswordError('');
    }
  };

  const handleNameBlur = () => {
    const res = validateName(name);
    if (!res.isValid) setNameError(res.error || '');
  };

  const handleEmailBlur = () => {
    const res = validateEmail(email);
    if (!res.isValid) setEmailError(res.error || '');
  };

  const handlePasswordBlur = () => {
    const res = validatePassword(password);
    if (!res.isValid) setPasswordError(res.error || '');
  };

  const handleConfirmPasswordBlur = () => {
    const res = validateConfirmPassword(password, confirmPassword);
    if (!res.isValid) setConfirmPasswordError(res.error || '');
  };

  const handleRegister = async () => {
    setGeneralError('');

    const normalized = normalizeName(name);
    const nameRes = validateName(normalized);
    const emailRes = validateEmail(email);
    const passwordRes = validatePassword(password);
    const confirmRes = validateConfirmPassword(password, confirmPassword);

    let hasError = false;

    if (!nameRes.isValid) {
      setNameError(nameRes.error || '');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!emailRes.isValid) {
      setEmailError(emailRes.error || '');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!passwordRes.isValid) {
      setPasswordError(passwordRes.error || '');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!confirmRes.isValid) {
      setConfirmPasswordError(confirmRes.error || '');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (hasError) {
      if (!nameRes.isValid) {
        nameInputRef.current?.focus();
      } else if (!emailRes.isValid) {
        emailInputRef.current?.focus();
      } else if (!passwordRes.isValid) {
        passwordInputRef.current?.focus();
      } else if (!confirmRes.isValid) {
        confirmPasswordInputRef.current?.focus();
      }
      return;
    }

    setLoading(true);
    try {
      await register(normalized, email, password);
      showToast('Tạo tài khoản thành công', 'success');
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }, 500);
    } catch (err: any) {
      const codeOrMsg = err.code || err.message || '';
      console.error('Registration failed:', codeOrMsg, err);
      if (codeOrMsg.includes('email-already-in-use')) {
        setEmailError('Email này đã được đăng ký');
        emailInputRef.current?.focus();
      } else if (codeOrMsg.includes('invalid-email')) {
        setEmailError('Email không hợp lệ');
        emailInputRef.current?.focus();
      } else if (codeOrMsg.includes('weak-password')) {
        setPasswordError('Mật khẩu quá yếu, hãy dùng ít nhất 6 ký tự');
        passwordInputRef.current?.focus();
      } else {
        setGeneralError(mapAuthError(codeOrMsg));
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStrengthIndicator = () => {
    if (!password) return null;

    let label = 'Yếu';
    let labelColor = colors.danger;
    let level = 1;

    if (passwordStrength === 'strong') {
      label = 'Mạnh';
      labelColor = colors.success;
      level = 3;
    } else if (passwordStrength === 'medium') {
      label = 'Vừa';
      labelColor = colors.warning;
      level = 2;
    }

    return (
      <View style={styles.strengthContainer}>
        <View style={styles.strengthBarsRow}>
          <View
            style={[
              styles.strengthBar,
              level >= 1 &&
                (level === 1
                  ? styles.strengthBarWeak
                  : level === 2
                  ? styles.strengthBarMedium
                  : styles.strengthBarStrong),
            ]}
          />
          <View
            style={[
              styles.strengthBar,
              level >= 2 &&
                (level === 2
                  ? styles.strengthBarMedium
                  : styles.strengthBarStrong),
            ]}
          />
          <View
            style={[
              styles.strengthBar,
              level >= 3 && styles.strengthBarStrong,
            ]}
          />
        </View>
        <Text style={[styles.strengthText, { color: labelColor }]}>
          Độ mạnh: {label}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <Text style={styles.title}>Tạo tài khoản mới</Text>
            <Text style={styles.subtitle}>
              Chỉ mất 1 phút để bắt đầu trò chuyện.
            </Text>
          </View>

          <View style={styles.formSection}>
            <InputComponent
              ref={nameInputRef}
              label="Họ tên"
              placeholder="Nguyễn Văn A"
              value={name}
              onChangeText={handleNameChange}
              onBlur={handleNameBlur}
              error={nameError}
              editable={!loading}
              leftIcon={
                <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
              }
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

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
                <Ionicons name="mail-outline" size={18} color={colors.textSecondary} />
              }
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <InputComponent
              ref={passwordInputRef}
              label="Mật khẩu"
              placeholder="Tối thiểu 6 ký tự"
              isPassword={true}
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordError}
              editable={!loading}
              leftIcon={
                <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />
              }
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            {renderStrengthIndicator()}

            <InputComponent
              ref={confirmPasswordInputRef}
              label="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu"
              isPassword={true}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              error={confirmPasswordError}
              editable={!loading}
              leftIcon={
                <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />
              }
              returnKeyType="done"
              onSubmitEditing={handleRegister}
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
              title="Đăng ký"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Đã có tài khoản? </Text>
              <TouchableOpacity
                disabled={loading}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
