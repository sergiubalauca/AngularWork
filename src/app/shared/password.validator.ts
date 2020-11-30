import { AbstractControl } from '@angular/forms';
import { equal } from 'assert';

/* the control itself point to the group of controls, the registrationForm - this is for CROSS FIELD validation */
export var PasswordValidator = (control: AbstractControl): { [key: string]: any } | null => {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.pristine || confirmPassword.pristine)
        return null;
    /* if password is not blank && ... && the values do not match, then return misMatch, else null */
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}