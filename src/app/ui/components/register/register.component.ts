import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/entites/User';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{


constructor(private formBuilder: UntypedFormBuilder,private userService: UserService  ,private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
}
frm:FormGroup;
ngOnInit(): void {
  this.frm = this.formBuilder.group({
    firstName: ["", [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]],
    lastName: ["", [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)
    ]],
    username: ["", [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]],
    email: ["", [
      Validators.required,
      Validators.maxLength(250),
      Validators.email
    ]],
    password: ["",
      [
        Validators.required
      ]],
    passwordConfirm: ["",
      [
        Validators.required
      ]]
  }, {
    validators: (group: AbstractControl): ValidationErrors | null => {
      let sifre = group.get("password").value;
      let sifreTekrar = group.get("passwordConfirm").value;
      return sifre === sifreTekrar ? null : { notSame: true };
    }
  })
}

get component() {
  return this.frm.controls;
}

submitted: boolean = false;
async onSubmit(user: User) {
  this.submitted = true;

  if (this.frm.invalid)
    return;

  const result: any = await this.userService.create(user);
  if (result.succeeded)
    this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  else
    this.toastrService.message(result.message, "Hata", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopRight
    })
}
}
