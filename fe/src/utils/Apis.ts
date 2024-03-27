const Apis = {
  API_HOST: 'http://localhost:7689',
  API_TAILER: {
    AUTH: {
      ROOT: '/auth',
    },
    USER: {
      ROOT: '/user',
      UPDATE_PROFILE: '/user/profile',
      ACTIVE_ACCOUNT: '/user/active'
    },
    CATEGORY: {
      ROOT: '/category',
    },
    PRODUCT: {
      ROOT: '/product',
    },
  }
}

export default Apis;