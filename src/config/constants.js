export const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const hostname = "demo5.pbt.com.mt";

export const httphost = "//" + hostname;
export const wshost   = "wss://" + hostname;

export const facebookAppID = "1959737827683539";

// export const KironWS = 'http://localhost:8080/dps/webSocketChanges';
export const KironWS = httphost + '/dps/webSocketChanges';
export const SportWS = wshost + '/hub/webSocketFeed';

// const restAPI = 'http://localhost:8787'
// const restAPI = 'http://192.168.1.55:8080'
export const restAPI    = httphost + '/betting-api-gateway/rest/';
export const hubRestAPI = (isLocalhost ? "http://localhost:8081" : httphost) + "/hub/rest/";

export const authAPI = restAPI + 'security/login';
export const signUpAPI = restAPI + 'security/signUp';
export const verifyEmailAPI = restAPI + 'security/registeruser/';
export const signUpFieldsListAPI = restAPI + 'security/signUpFieldsList';

export const resetPassEmailUrl = restAPI + 'security/reset-password/email';
export const resetPassSMSUrl = restAPI + 'security/reset-password/sms';
export const checkResetPassCodeUrl = restAPI + 'security/reset-password/check-code';
export const setNewPasswordUrl = restAPI + 'security/reset-password/new-password';

export const getLimitsAPI = restAPI + 'system/limits';
export const affiliateAPI = restAPI + 'affiliate/activate';

export const getHistoryAPI = restAPI + 'statistics/history';
export const ticketsAPI = restAPI + 'statistics/tickets';
export const getTicketAPI = restAPI + 'statistics/ticket';

export const balanceAPI = restAPI + 'profile/balance';
export const userAPI = restAPI + 'profile/load';
export const profileUpdateAPI = restAPI + 'profile/update';

export const depositAPI = restAPI + 'payment/deposit';
export const paymentStatusAPI = restAPI + 'payment/status/';
export const withdrawAPI = restAPI + 'payment/withdraw';

export const loadStored = restAPI + 'ticket/loadStored/';
export const ticketAPI = restAPI + 'ticket/apply';
export const saveTicketAPI = restAPI + 'ticket/store';
export const getByCodeAPI = restAPI + 'ticket/getByCode/';


export const getProfilePhone = restAPI + 'profile/phone';
export const deferredStakeCreate = restAPI + 'deferred-stake/create';


export const facebookLoginUrl = restAPI + 'security/login/facebook';

export const availableLanguages = {
    "en": { code: "en", label: "EN" },
    "fr": { code: "fr", label: "FR" }
};