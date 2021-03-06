import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Pin } from './models/pin';
import { PinGeneratorService } from './services/pin-generator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  generatedPINs: Pin[] = [];
  displayedColumns: string[] = ['pinString'];
  requestedPINs: number = 1;
  isSetupComplete: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar, private pinGeneratorService: PinGeneratorService) {}

  ngOnInit(): void {
    this.pinGeneratorService.initializePins()
                            .subscribe(
                              (success) => {
                                this.HandleInitializePinResponse(success);
                              },
                              (err) => {
                                this.HandleHttpError(err);
                              }
                            );
  }



  /**
   * Handle the success or failure of the App Initialization.
   * @param success A value stating where the App Initialization completed successfully.
   */
  private HandleInitializePinResponse(success: boolean) {
    if (success)
    {
      this.isSetupComplete = true;
      return;
    }

    this.openSnackBar("An unexpected error occurred");
  }

  /**
   * Fired upon clicking the "GENERATE" button. 
   * Uses service to retrieve the number of PINs requested by the user and wraps the handler for data reception.
   */
  retrieveNewPINs(): void {    
    this.pinGeneratorService.getPins(this.requestedPINs)
                            .subscribe(
                              (pins) => {
                                this.generatedPINs = pins;
                              },
                              (err) => {
                                this.HandleHttpError(err);
                              }
                            );
  }

    /**
   * Show user error  generated by HTTP Service and log further details in console
   * @param err The error returned by the HTTP Service
   */
     private HandleHttpError(err: any) {
      console.log(err);
      if (err.message != undefined)
        this.openSnackBar(err.message);
    }

  /**
   * Displays a small message box primarily used for error reporting.
   * @param message The message to be displayed in the snackbar.
   */
  private openSnackBar(message: string) {
    const snackbarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}