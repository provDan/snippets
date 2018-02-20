# Code flow across front-end / orch / identity

This repo documents 3 flows: (1) create and link account, (2) sing in and view Primary Care Phisician and (3) password reset


# Interfaces

## Orch

### /SendResetPasswordEmail

```
POST /ResetPasswordEmail
Body username
```

```
POST /PasswordChange
Body username, newPassword, resetToken
```

## Identity

### /ResetToken

```
POST /Token
Body username, TTL
```

### /PasswordChange

```
POST /PasswordChange
Body username, newPassword, resetToken
```