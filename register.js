// USER FLOW:
// 1. create account
// 2. sign in
// 3. link with existing my chart account

// 1. create account

// WEB APP
function clickSubmit() {
  let newAccountInfo = {email, password, demographics}
  fetch('orch.prov.org', {  // orch -> create account
    body: JSON.stringify(newAccountInfo),
    method: 'POST'
  })
}
