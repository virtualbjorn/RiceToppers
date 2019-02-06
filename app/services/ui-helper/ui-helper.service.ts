import * as application from 'application';
import { isIOS, isAndroid } from 'platform';
import * as utils from 'utils/utils';
import { Color } from 'color';
import * as frame from 'ui/frame';
import { Injectable } from '@angular/core';

declare const android, UIApplication, UIView, CGRectMake, CGPointMake,
    UIActivityIndicatorView, UIActivityIndicatorViewStyle;
let loaderView;

@Injectable()
export class UIHelperService {
    showLoader(message: string = 'Loading...') {
        if (loaderView) {
            return;
        }

        if (isIOS) {
            utils.ios.getter(UIApplication, UIApplication.sharedApplication).beginIgnoringInteractionEvents();

            const currentView = frame.topmost().ios.controller.view;
            loaderView = UIView.alloc().initWithFrame(CGRectMake(0, 0, 90, 90));
            loaderView.center = currentView.center;
            loaderView.layer.cornerRadius = 4;
            loaderView.backgroundColor = new Color("#CC000000").ios;

            const indicator = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.WhiteLarge);
            indicator.center = CGPointMake(45, 45);

            loaderView.addSubview(indicator);
            currentView.addSubview(loaderView);

            indicator.startAnimating();
        }

        if (isAndroid) {
            loaderView = android.app.ProgressDialog.show(application.android.foregroundActivity, '', message);
        }
    }

    hideLoader() {
        if (!loaderView) {
            return;
        }

        if (isIOS) {
            loaderView.removeFromSuperview();
            utils.ios.getter(UIApplication, UIApplication.sharedApplication).endIgnoringInteractionEvents();
        }

        if (isAndroid) {
            loaderView.dismiss();
        }

        loaderView = null;
    }
}