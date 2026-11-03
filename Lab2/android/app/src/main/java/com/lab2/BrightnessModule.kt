package com.lab2

import android.database.ContentObserver
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.view.WindowManager
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class BrightnessModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var observer: ContentObserver? = null

    override fun getName() = "BrightnessModule"

    override fun initialize() {
        super.initialize()
        observer = object : ContentObserver(Handler(Looper.getMainLooper())) {
            override fun onChange(selfChange: Boolean) {
                val sys = Settings.System.getInt(
                    reactContext.contentResolver, Settings.System.SCREEN_BRIGHTNESS, 128)

                // bỏ giá trị app đã ép, để màn hình theo hệ thống
                val activity = reactContext.currentActivity
                activity?.runOnUiThread {
                    val lp = activity.window.attributes
                    lp.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
                    activity.window.attributes = lp
                }

                // báo lên JS
                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("onBrightnessChanged", linearToGamma(sysToLinear(sys)))
            }
        }
        reactContext.contentResolver.registerContentObserver(
            Settings.System.getUriFor(Settings.System.SCREEN_BRIGHTNESS), false, observer!!)
    }

    override fun invalidate() {
        observer?.let { reactContext.contentResolver.unregisterContentObserver(it) }
        super.invalidate()
    }

    // bắt buộc phải có khi dùng NativeEventEmitter
    @ReactMethod fun addListener(eventName: String) {}
    @ReactMethod fun removeListeners(count: Double) {}

    @ReactMethod
    fun setBrightness(value: Double, promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) { promise.reject("NO_ACTIVITY", "No activity"); return }
        activity.runOnUiThread {   // thay đổi window bắt buộc chạy trên UI thread
            val lp = activity.window.attributes
            // value là vị trí thanh trượt (gamma) → đổi sang độ sáng thật (linear)
            lp.screenBrightness = gammaToLinear(value).toFloat().coerceIn(0.01f, 1f)
            activity.window.attributes = lp
            promise.resolve(null)
        }
    }

    @ReactMethod
    fun getBrightness(promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) { promise.reject("NO_ACTIVITY", "No activity"); return }
        activity.runOnUiThread {
            val b = activity.window.attributes.screenBrightness
            if (b >= 0) promise.resolve(linearToGamma(b.toDouble()))
            else {
                // -1 = đang theo hệ thống → đọc từ Settings
                val sys = android.provider.Settings.System.getInt(
                    activity.contentResolver, android.provider.Settings.System.SCREEN_BRIGHTNESS, 128)
                promise.resolve(linearToGamma(sysToLinear(sys)))
            }
        }
    }

    // Android 9+ dùng đường cong gamma giữa vị trí thanh trượt và độ sáng thật
    // (cùng công thức với BrightnessUtils của hệ thống)
    private fun sysToLinear(sys: Int) = ((sys - 1) / 254.0).coerceIn(0.0, 1.0)

    private fun linearToGamma(linear: Double): Double {
        val n = linear.coerceIn(0.0, 1.0) * 12
        val g = if (n <= 1) Math.sqrt(n) * 0.5 else 0.17883277 * Math.log(n - 0.28466892) + 0.55991073
        return g.coerceIn(0.0, 1.0)
    }

    private fun gammaToLinear(gamma: Double): Double {
        val g = gamma.coerceIn(0.0, 1.0)
        val r = if (g <= 0.5) Math.pow(g / 0.5, 2.0) else Math.exp((g - 0.55991073) / 0.17883277) + 0.28466892
        return (r / 12).coerceIn(0.0, 1.0)
    }
}
