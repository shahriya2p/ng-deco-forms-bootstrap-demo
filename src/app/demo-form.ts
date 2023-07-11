import { Class, FIELD_FORM_CONTROL_TOKEN, FIELD_PARENT_CONTROL_TOKEN, Form, FORM_SUBMIT_TOKEN, Group, GroupComponent, Provide } from 'ng-deco-forms';
import { Action, BtnClass, Checkbox, CheckLabel, Half, Hidden, Hide, Hint, Label, Max, Min, Number, Options, Required, Row, Select, Step, Submit, SubmitComponent, Text, Textarea, Title, Tooltip, TwoThirds, Warn } from 'ng-deco-forms-bootstrap'
import { inject } from '@angular/core';
import { startWith, map, of } from 'rxjs';

  
  class DateOfBirth {
    @Required 
    @Label('Day') @Options(Array.from({ length: 31 }, (_, index) => ({
      id: `${index + 1}`,
      name: `${index + 1}`
    })))
    @Select()
    day = null;
  
    @Required 
    @Label('Month') @Options(Array.from({ length: 12 }, (_, index) => ({
      id: `${index + 1}`,
      name: `${index + 1}`
    })))
    @Select()
    month = null;
  
    @Required 
    @Label('Year') @Options(Array.from({ length: 36 }, (_, index) => ({
      id: `${1969 + index + 1}`,
      name: `${1969 + index + 1}`
    })))
    @Select()
    year = null;
  }

  class Gender {
    @CheckLabel('Male')
    @Checkbox
    male = false;

    @CheckLabel('Female')
    @Checkbox
    female = false;
  }

  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailWarning = "Enter valid email";
  const emailWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: string) => !pattern.test(value) ? emailWarning : null
    ),
    map((warning: string | null) => warning ?? "")
  )

  const numberPattern = /^(9|8|7|6|5){1}[0-9]{9}$/;
  const mobileWarning = "Enter valid mobile number";
  const mobileWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: string) => !numberPattern.test(value) ? mobileWarning : null
    ),
    map((warning: string | null) => warning ?? "")
  )

  const confirmPasswordWarning = "Password does not match";
  const checkConfirmPassword = () => { 
    
    const confirmPasswordField = inject(FIELD_PARENT_CONTROL_TOKEN).get('confirmPassword');
    const passwordField = inject(FIELD_PARENT_CONTROL_TOKEN).get('password');
    if (passwordField !== null && confirmPasswordField !== null)
    {
      return confirmPasswordField.valueChanges.pipe(
        map(
          (value: string) => value != passwordField.value ? confirmPasswordWarning : null
        ),
        map((warning: string | null) => warning ?? ""));
    } else {
      return of("");
    }
  }

  const passwordPattern = /^[a-zA-Z0-9]{10}$/;
  const passwordWarning = "Enter valid password";
  const passwordWarningFunc = () => inject(FIELD_FORM_CONTROL_TOKEN).valueChanges.pipe(
    map(
      (value: string) => !passwordPattern.test(value) ? passwordWarning : null
    ),
    map((warning: string | null) => warning ?? "")
  )

  class PasswordMatch {
    @Required @Tooltip("10 digit password")
    @Warn(passwordWarningFunc) @Label('Password') @Text
    password = "";

    @Required @Tooltip("Confirm Password should match with the password.")
    @Warn(checkConfirmPassword) @Label('Confirm Password') @Text
    confirmPassword = "";
  }

  const submit = () => {
    const form = inject(FIELD_FORM_CONTROL_TOKEN);
    return () => {
      if (form.invalid) {
        alert("Form is invalid!");
      } else {
        alert(JSON.stringify(form.value));
      }
    }
  }

  @BtnClass('btn-success mt-4')
  @Action('Submit')
  @Submit(submit)
  @Form(SubmitComponent)
  export class DemoForm  {
    
    constructor() {
  
    }
  
    @Hidden
    id: string | null = null;
  
    @Label('Customer Name') @Text
    customer_name = "";
    
    @Tooltip("Customer address")
    @Label('Customer Address')
    @Textarea()
    customer_address = "";

    @Title('Customer Date of Birth') @TwoThirds
    @Row @Group()
    dob = new DateOfBirth();
  
    @Required @Hint("example@gmail.com") @Tooltip("Email")
    @Warn(emailWarningFunc) @Label('Email') @Text
    email = "";

    @Required @Hint("9876543210") @Tooltip("Mobile No.")
    @Warn(mobileWarningFunc) @Label('Mobile No.') @Number()
    mobile = "";

    @Group()
    passwordMatch: PasswordMatch = new PasswordMatch()
  }