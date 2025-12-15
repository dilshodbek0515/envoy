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
    getOrder: {
      index: '(app)/customer/get-order/'
    },

    profile: {
      index: '(app)/customer/profile/',
      notification: '(app)/customer/profile/notifications',

      user: {
        index: '(app)/customer/profile/user/'
      },

      setting: {
        index: '(app)/customer/profile/setting/',
        language: '(app)/customer/profile/setting/language/'
      },

      result: {
        index: '(app)/customer/profile/results/'
      }
    }
  },

  driver: {
    loads: {
      index: '(app)/driver/loads/'
    }
  }
}
