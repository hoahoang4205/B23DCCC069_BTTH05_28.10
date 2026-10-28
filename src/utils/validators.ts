export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export const validateName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Vui lòng nhập họ tên' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Họ tên tối thiểu 2 ký tự' };
  }
  if (trimmed.length > 40) {
    return { isValid: false, error: 'Họ tên tối đa 40 ký tự' };
  }

  // Chấp nhận chữ cái tiếng Việt và khoảng trắng
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'Họ tên chỉ gồm chữ cái và khoảng trắng' };
  }

  return { isValid: true };
};

export const normalizeName = (name: string): string => {
  return name.trim().replace(/\s+/g, ' ');
};

export const validateEmail = (email: string): ValidationResult => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Vui lòng nhập email' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Email không hợp lệ' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Vui lòng nhập mật khẩu' };
  }
  if (password.startsWith(' ') || password.endsWith(' ')) {
    return { isValid: false, error: 'Mật khẩu không được chứa khoảng trắng ở đầu hoặc cuối' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Mật khẩu tối thiểu 6 ký tự' };
  }

  return { isValid: true };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Vui lòng nhập lại mật khẩu' };
  }
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Mật khẩu nhập lại không khớp' };
  }

  return { isValid: true };
};

export const checkPasswordStrength = (password: string): PasswordStrength => {
  if (password.length < 8) {
    return 'weak';
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const passedCriteria = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;

  if (passedCriteria >= 3) {
    return 'strong';
  }
  if (passedCriteria >= 2) {
    return 'medium';
  }
  return 'weak';
};
