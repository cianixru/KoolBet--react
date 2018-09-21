
export const KironWS = 'http://192.168.1.44:8080/dps/webSocketChanges';
// export const KironWS = 'http://localhost:8080/dps/webSocketChanges';
export const SportWS = 'ws://192.168.1.55:8080/hub/webSocketFeed/en/180';


// const restAPI = 'http://localhost:8787'
// const restAPI = 'http://192.168.1.55:8080'
const restAPI = 'http://192.168.1.55:8787'

export const authAPI = restAPI + '/betting-api-gateway/rest/security/login';

export const balanceAPI = restAPI + '/betting-api-gateway/rest/profile/balance';

export const ticketAPI = restAPI + '/betting-api-gateway/rest/ticket/apply';

