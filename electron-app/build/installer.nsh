!include "nsDialogs.nsh"
!include "LogicLib.nsh"

; Define variables for the password page
Var Dialog
Var Password
Var PasswordText

; Define the custom page function
Function fnc_PasswordPage_Show
    nsDialogs::Create 1018
    Pop $Dialog

    ${If} $Dialog == error
        Abort
    ${EndIf}

    ${NSD_CreateLabel} 0 0 100% 24u "Để tiếp tục cài đặt, vui lòng nhập mật khẩu bảo mật được cung cấp bởi quản trị viên."
    Pop $0

    ${NSD_CreatePassword} 0 30u 100% 12u ""
    Pop $PasswordText
    ${NSD_SetFocus} $PasswordText

    nsDialogs::Show
FunctionEnd

Function fnc_PasswordPage_Leave
    ${NSD_GetText} $PasswordText $Password
    ; MẬT KHẨU MẶC ĐỊNH: dahc2026
    ${If} $Password != "dahc2026"
        MessageBox MB_OK|MB_ICONSTOP "Mật khẩu không chính xác! Vui lòng thử lại."
        Abort
    ${EndIf}
FunctionEnd

; Add the page to the installer
Page custom fnc_PasswordPage_Show fnc_PasswordPage_Leave
