import apiConfig from './apiConfig'

export default {
  meEndpoint: apiConfig.HOST + '/api/v1/accounts/me',
  loginEndpoint: apiConfig.HOST + '/api/v1/accounts/login/',
  registerEndpoint: apiConfig.HOST + '/api/v1/accounts/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'logout' // logout | refreshToken
}
