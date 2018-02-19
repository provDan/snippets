// USER FLOW:
// 1. sign-in
// 2. view home page with PCP (person --> patient EPI --> MyPCP)

// 1. sign-in

// MOBILE APP
function clickSubmmitOnSigninPage() {
  let username = userField.value;
  let password = passwordField.value;

  return fetch('orch.prov.org/signin', { // orch -> loadHomePage
    body: JSON.stringify({
      username: username,
      domain: 'patient',
      password: password}),
    method: 'POST'
  })
  .then(saveTokenInSessionStore)
  .then(showLoginSuccess)
}

// ORCH (just proxy here)
function signin(username, password, domain) {
  return fetch('identity.prov.org/signin', {  // identity -> signin
    body: JSON.stringify({username, domain, password}),
    method: 'POST'
  })
}

// IDENTITY
function signin(username, domain, password) {
  return oauthClient.token(password)
}

// 2. see patient record

// MOBILE APP
function loadHomePage(username, accessToken) {
  return fetch(`orch.prov.org/readPatient/${username}`, { // orch -> readPatient
    headers: `Authorization: Bearer ${accessToken}`
  })
  .then(populatePage)
}

// ORCH
function readPatient(username, accessToken) {
  let account = await fetch(`identity.prov.org/${username}`, { // identity -> readAccount()
    headers: `Authorization: Bearer ${accessToken}`
  })

  let person = await fhirClient.readPerson(account.personId)
  let patient = await fhirClient.readPatient(person.patientLink)
  let practitioner = await fhirClient.readPractitioner(patient.pcp)

  return { person, patient, practitioner }

}

// IDENTITY
function readAccount(username, accessToken) {
  return scimClient.readUser(username, accessToken)
}

// Acceptance Criteria:
// A stand-alone, working, code sample for exhibiting this capability


// TODO: check with web app / mobile app / orch layer / fhir teams if this works
// TODO: decide username vs userId