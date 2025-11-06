export const AppRoutes = {
  auth: {
    welcome: '(auth)/index',
    auth: '(auth)/auth',
    register: {
      registerSms: '(auth)/register/register-sms',
      registerInfo: '(auth)/register/register-info',
      registerPassword: '(auth)/register/register-password'
    },
    resetPassword: {
      checkPhone: '(auth)/reset-password/',
      checkSmsCode: '(auth)/reset-password/sms-code',
      newPassword: '(auth)/reset-password/new-password'
    }
  },

  customer: {
    index: '(app)/customer'
  },

  driver: {
    index: '(app)/driver'
  }
}
