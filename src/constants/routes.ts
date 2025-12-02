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

    test: {
      index: '(app)/customer/profile-test/'
    },

    profile: {
      index: '(app)/customer/profile/',
      notification: '(app)/customer/profile/notifications',

      user: {
        index: '(app)/customer/profile/user/'
      },

      setting: {
        index: '(app)/customer/profile/setting/'
      },

      result: {
        index: '(app)/customer/profile/results/'
      }
    },

    profileTest: {
      index: '(app)/customer/profile-test/',
      notification: '(app)/customer/profile-test/notification/',

      user_test: {
        index: '(app)/customer/profile-test/user-test/'
      },

      result_test: {
        index: '(app)/customer/profile-test/result-test/'
      },

      settings_test: {
        index: '(app)/customer/profile-test/settings-test/'
      }
    }
  },

  driver: {
    loads: {
      index: '(app)/driver/loads/'
    }
  }
}
