/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
import {Component, OnDestroy} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'loggedout-page',
    directives: [],
    pipes: [],
    providers: [],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>
<div><h2>You have been logged out.</h2></div>
`
})
export class LoggedoutPage implements OnDestroy {
    private sub: any = null;

    constructor(private authService: AuthService, private router: Router, private location: Location) {
        if (authService.isAuthenticated()) {
            this.location.replaceState('/');
            this.router.navigateByUrl('public');
        }

        this.sub = this.authService.subscribe((val) => {
            if (val.authenticated) {
                this.location.replaceState('/');
                this.router.navigateByUrl('public');
            }
        });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}
