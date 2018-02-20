# Code flow across front-end / orch / identity

This repo documents 3 flows: (1) create and link account, (2) sing in and view Primary Care Phisician and (3) password reset


# Interfaces

## Orch

### /SendResetPasswordEmail

```
POST /ResetPasswordEmail
Request:
  Body: username
```

```
POST /PasswordChange
Request:
  Body: username, newPassword, resetToken
```

## Identity

### /Identity

```
POST /signin
Request:
  Body: username, password, domain, scope
Respose:
  Body: access_token, refresh_token, jwt
```

### /PasswordReset/token

```
POST /PasswordReset/token
Request:
  Body: username, TTL
Response
  Body: token
  Status: 201
```

### /PasswordReset/change

```
POST /PasswordReset/change
Request:
  Body: username, newPassword, resetToken
Response:
  Body: null
  Status: 200
```
