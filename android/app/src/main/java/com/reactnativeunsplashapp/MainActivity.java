package com.reactnativeunsplashapp;

import expo.modules.devmenu.react.DevMenuAwareReactActivity;
import android.content.Intent;
import expo.modules.devlauncher.DevLauncherController;
import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivityDelegate;


import com.facebook.react.ReactActivity;

public class MainActivity extends DevMenuAwareReactActivity {

  @Override
  public void onNewIntent(Intent intent) {
    if (DevLauncherController.tryToHandleIntent(this, intent)) {
      return;
    }
    super.onNewIntent(intent);
  }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeUnsplashApp";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return DevLauncherController.wrapReactActivityDelegate(this, () -> new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      new ReactActivityDelegate(this, getMainComponentName())
    ));
  }
}
