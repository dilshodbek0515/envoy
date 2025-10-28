export const AppRoutes = {
  auth: {
    welcome: '(auth)/index',
    auth: '(auth)/auth',
    resetPassword: {
      checkPhone: '(auth)/reset-password/',
      checkSmsCode: '(auth)/reset-password/sms-code',
      newPassword: '(auth)/reset-password/new-password'
    }
  }
}
