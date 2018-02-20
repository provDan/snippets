// USER FLOW:
// 1. fill out reset password form
// 2. user clicks link in the email
// 3. fill out new password form

// 1. fill out reset password form

// MOBILE APP
function clickSubmitOnResetPasswordPage() {
  let email = emailField.value
  fetch('orch.prov.org/resetPassword', {  // orch -> sendResetEmail
    body: JSON.stringify({email}),
    method: 'POST'
  })
  .then(showConfirmationMessage)
}

// ORCH
function sendResetEmail(email) {
  let ttl = 60*60*1000 // 1 hour in millis
  let token = await fetch('identity.prov.org/token', {  // orch -> sendResetEmail
    body: JSON.stringify({email, ttl}),
    method: 'POST'
  })

  fetch('communication.prov.org/email', {  // orch -> sendResetEmail
    body: JSON.stringify({token, email}), // TODO: what else do we need to send? Full name?
    method: 'POST'
  })
}

// 2. user clicks link in the email

// 3. fill out new password form

// MOBILE APP
function clickSubmitOnNewPasswordPage() {
  let token = getTokenFromUrl()
  let username = usernameField.value
  let newPassword = newPasswordField.value

  fetch('orch.prov.org/changePassword', {  // orch -> change password
    body: JSON.stringify({token, username, newPassword}),
    method: 'POST'
  })
}

// ORCH
function changePassword(token, username, newPassword) {
  fetch(`identity.prov.org/${usernme}/changePasswordWithToken`, {  // orch -> change password
    body: JSON.stringify({username, password, token}),
    method: 'POST'
  })
}

// IDENTITY
function changePasswordWithToke(username, password, token) {
  let valid = validateToken(username, token) //checks value and TTL
  if (valid) scimClient.changePassword(username, password) // uses admin credentials
}