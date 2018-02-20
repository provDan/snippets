// USER FLOW:
// 1. create account
// 2. sign in
// 3. link with existing my chart account

// 1. create account

// MOBILE APP
function clickSubmitOnCreateAccountPage() {
  let newAccountInfo = {email, password, demographics}
  fetch('orch.prov.org/accounts', {  // orch -> createAccount
    body: JSON.stringify({newAccountInfo, domain: 'PATIENT'}),
    method: 'POST'
  })
}

// ORCH
function createAccount() {
  let person = await fhirClient.createPerson();
  return fetch('identity.prov.org', {  // identity -> createAccount
    body: JSON.stringify({newAccountInfo, person, domain}),
    method: 'POST'
  })
}

// IDENTITY
function create(newAccountInfo, person) {
  let account = Object.assign({}, newAccountInfo, {personId: personId})
  return scim.createAccount(newAccountInfo, person) // this uses admin credentials or we configure WSO2 to not require creds to create accounts
}

// 2. signin (same as in getPCP flow)

// 3. link with existing my chart account

// MOBILE APP
function clickSubmitOnLinkAccountPage() {
  let myChartUsername = userField.value;
  let myChartPassword = passwordField.value;
  
  let accessToken = sessionStorage.accessToken
  let userId = sessionStorage.userId // identity ID

  fetch('orch.prov.org/linkMyChart', {  // orch -> linkMychartAccount
    body: JSON.stringify({myChartUsername, myChartPassword}),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(showLinkSuccessful)
}

// ORCH
function linkMychartAccount(myCharCreds, jwt) {
  let epicPatient = await fetch('identity.prov.org/authentication/mychar', {  // identity -> authorize (with Epic)
    body: JSON.stringify({myChartUsername, myChartPassword, system}),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  // TODO: perform some verification here? -- a Billy question
  fhirClient.updatePerson({personId: jwt.personId, patient: epicPatient.patientId})
}

// IDENTITY
function authorizeWithEpic(username, password, epicSystem) {
  return epicClient.authorize(username, password, epicSystem);
}

// TODO: system needed to know which EPIC to go to. pass from the UI somehow on the link page?
// TODO: do we need to check the authenticated Epic patient is the same as the account currently logged in?