package com.asp_sample;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

public class IntentModule extends ReactContextBaseJavaModule {
    private final String TAG = "IntentModule";
    private final String packageName = "com.mypinpad.openmpos.terminal";
    private final String className = "com.mypinpad.openmpos.terminal.RootActivity";

    private final ReactApplicationContext reactContext;
    private Callback mCallback;

    IntentModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.reactContext.addActivityEventListener(mActivityEventListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "IntentModule";
    }

    @ReactMethod
    public void isAppInstalled(Callback callback) {
        mCallback = callback;
        try {
            this.reactContext.getPackageManager()
                    .getPackageInfo(packageName, 0);
            mCallback.invoke(true);
        } catch (PackageManager.NameNotFoundException error) {
            mCallback.invoke(false);
        }
    }

    @ReactMethod
    public void makeIntent(ReadableMap extras, Callback callback) {
        mCallback = callback;

        Intent intent = new Intent();
        intent.setClassName(packageName, className);

        ReadableMapKeySetIterator it = extras.keySetIterator();
        String key = it.nextKey();
        String payload = extras.getString(key);

        if (key.equals("payload")) {
            intent.putExtra("action", "register");
            intent.putExtra("data", payload);
            intent.putExtra("language", "eng");
        } else if (key.equals("transactionRequestId")) {
            intent.putExtra("action", "transaction");
            intent.putExtra("data", payload);
        }

        Activity currentActivity = getCurrentActivity();
        assert currentActivity != null;
        currentActivity.startActivityForResult(intent, 200);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            Log.d(TAG, "result code: " + resultCode);
            if (resultCode == 0) {
                mCallback.invoke(500);
            } else if (resultCode == -1) {
                mCallback.invoke(200);
            } else {
                mCallback.invoke(resultCode);
            }
        }
    };
}
