# Code flow across front-end / orch / identity

This repo documents 3 flows: (1) create and link account, (2) sing in and view Primary Care Phisician and (3) password reset


# Interfaces

## Orch

### /identity

```
POST /identity/SendResetPasswordEmail
Request:
  Body: username
```

```
POST /identity/PasswordChange
Request:
  Body: username, newPassword, resetToken
```

## Identity

### /Users

```
POST /Users/signin
Request:
  Body: username, password, domain, scope
Respose:
  Body: access_token, refresh_token, jwt
```

### /PasswordReset

```
POST /PasswordReset/token
Request:
  Body: username, TTL
Response
  Body: token
  Status: 201
```

```
POST /PasswordReset/change
Request:
  Body: username, newPassword, resetToken
Response:
  Body: null
  Status: 200
```
