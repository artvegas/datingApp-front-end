import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {
    public currentAccount: Subject<string> = new Subject<string>();
    public currentProfile: Subject<string> = new Subject<string>();
    public userIsLoggedIn: Subject<boolean> = new Subject<boolean>();
}
