package sa.ali.durus;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.webkit.JavascriptInterface;
import android.content.Intent;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;

/* تطبيق «دروس العلوم»: يعرض المنصة بملء الشاشة، ويحفظ الدروس ليعمل دون إنترنت بعد أول فتح */
public class MainActivity extends Activity {
    private static final String HOME = "https://aak64417-glitch.github.io/science-lessons-app/";
    private WebView web;
    private View custom;
    private FrameLayout root;
    /* القراءة الصوتية: محرّك النطق في أندرويد (WebView لا يدعم النطق من المتصفح) */
    private TextToSpeech tts;
    private volatile int ttsState = 0; /* 0 جارٍ التهيئة، 1 جاهز بالعربية، -1 لا يوجد صوت عربي، -2 لا يوجد محرّك نطق */
    private final ConcurrentHashMap<String, String> ttsSt = new ConcurrentHashMap<>();

    public class TtsBridge {
        @JavascriptInterface public int state() { return ttsState; }
        @JavascriptInterface public boolean ready() { return ttsState == 1; }
        @JavascriptInterface public void speak(String text, String id, float rate, float pitch) {
            if (tts == null || ttsState != 1) { ttsSt.put(id, "error"); return; }
            ttsSt.put(id, "queued");
            tts.setSpeechRate(rate <= 0 ? 1f : rate);
            tts.setPitch(pitch <= 0 ? 1f : pitch);
            Bundle b = new Bundle();
            b.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1f);
            if (tts.speak(text, TextToSpeech.QUEUE_FLUSH, b, id) != TextToSpeech.SUCCESS) ttsSt.put(id, "error");
        }
        @JavascriptInterface public String status(String id) { String v = ttsSt.get(id); return v == null ? "none" : v; }
        @JavascriptInterface public void stop() { if (tts != null) tts.stop(); }
        @JavascriptInterface public void openSettings() {
            try { Intent i = new Intent("com.android.settings.TTS_SETTINGS"); i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); startActivity(i); } catch (Exception e) { }
        }
    }

    private void initTts() {
        try {
            tts = new TextToSpeech(this, st -> {
                if (st != TextToSpeech.SUCCESS) { ttsState = -2; return; }
                int r = tts.setLanguage(new Locale("ar", "SA"));
                if (r < 0) r = tts.setLanguage(new Locale("ar"));
                ttsState = r >= 0 ? 1 : -1;
                tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override public void onStart(String id) { ttsSt.put(id, "start"); }
                    @Override public void onDone(String id) { ttsSt.put(id, "done"); }
                    @Override public void onError(String id) { ttsSt.put(id, "error"); }
                    @Override public void onStop(String id, boolean interrupted) { ttsSt.put(id, "stop"); }
                });
            });
        } catch (Exception e) { ttsState = -2; }
    }

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        root = new FrameLayout(this);
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(-1, -1));
        setContentView(root);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        initTts();
        web.addJavascriptInterface(new TtsBridge(), "AndroidTTS");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView v, String url) {
                /* بعد نجاح التحميل نعود لجلب أحدث نسخة من الإنترنت (لا نبقى على النسخة المحفوظة) */
                if (v.getSettings().getCacheMode() != WebSettings.LOAD_DEFAULT) v.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
            }
            @Override
            public void onReceivedError(WebView v, WebResourceRequest req, WebResourceError err) {
                if (req.isForMainFrame() && v.getSettings().getCacheMode() == WebSettings.LOAD_DEFAULT) {
                    v.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
                    v.loadUrl(HOME);
                }
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback cb) {
                custom = view;
                root.addView(view, new FrameLayout.LayoutParams(-1, -1));
                web.setVisibility(View.GONE);
            }
            @Override
            public void onHideCustomView() {
                if (custom != null) { root.removeView(custom); custom = null; }
                web.setVisibility(View.VISIBLE);
            }
        });
        if (state != null) web.restoreState(state); else web.loadUrl(HOME);
        immersive();
    }

    private void immersive() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN |
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }

    @Override
    public void onWindowFocusChanged(boolean focus) { super.onWindowFocusChanged(focus); if (focus) immersive(); }

    @Override
    protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }

    @Override
    protected void onDestroy() { if (tts != null) { tts.stop(); tts.shutdown(); } super.onDestroy(); }

    @Override
    public void onBackPressed() {
        if (custom != null) { web.getWebChromeClient().onHideCustomView(); return; }
        web.evaluateJavascript("(function(){var p=document.getElementById('player');if(p&&!p.hidden){document.getElementById('pClose').click();return 1}return 0})()", r -> {
            if ("1".equals(r)) return;
            if (web.canGoBack()) web.goBack(); else finish();
        });
    }
}
