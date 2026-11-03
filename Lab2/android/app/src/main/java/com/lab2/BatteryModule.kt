package com.lab2

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BatteryModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "BatteryModule"   // tên dùng bên JS

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val bm = reactContext.getSystemService(android.content.Context.BATTERY_SERVICE) as BatteryManager
            var level = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
            if (level <= 0) { // fallback cho emulator
                val i: Intent? = reactContext.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
                val l = i?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
                val s = i?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
                if (l >= 0 && s > 0) level = l * 100 / s
            }
            promise.resolve(level)
        } catch (e: Exception) {
            promise.reject("BATTERY_ERROR", e)
        }
    }
}
