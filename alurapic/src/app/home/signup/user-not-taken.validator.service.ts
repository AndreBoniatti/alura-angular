import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserNotTakenValidatorService {
  constructor(private signUpService: SignUpService) {}

  checkUserNameTaken() {
    return (Control: AbstractControl) => {
      return Control.valueChanges
        .pipe(debounceTime(300))
        .pipe(
          switchMap((userName) =>
            this.signUpService.checkUserNameTaken(userName)
          )
        )
        .pipe(map((isTaken) => (isTaken ? { userNameTaken: true } : null)))
        .pipe(first());
    };
  }
}
