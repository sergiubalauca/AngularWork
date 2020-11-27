/* I am defining a custom validator which nothing more than a function
 * shared used across stuff. I could add it in the Component part in the class, 
 * because it is shared, I am creating a separat file here
 */

import { AbstractControl, ValidatorFn } from "@angular/forms";
import { stringify } from 'querystring';

/* The function takes in a control as form control of type abstractconstrol. The function returns either of two values
 * When the validation fails, it returns an object with key of type string and the value of type any.
 * If the validation is passed, it returns null. 
 */
export var forbiddenNameValidator = (control: AbstractControl): { [key: string]: any } | null => {
    /* We use the test operator to see if the value of the control is 'admin' */
    const forbidden = /admin/.test(control.value);
    /* We return either the forbiddenName with the value from the contro, or null */
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
}

/* I am going to build a factory function which will take in an argument of type string,
 * in order to return the validator function itself. I need this, because I can only send
 * one input param to the function above. This is hard when trying to validate other fields for other strings not allowed. 
 */
export var forbiddenNameValidator2 = (forbiddenName: RegExp): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    }
}