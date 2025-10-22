import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function AdsContainer() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isPremium = user?.premium || false;

  useEffect(() => {
    // Nếu premium → dọn sạch tất cả ads
    if (isPremium) {
      const allScripts = document.querySelectorAll(
        "script[src*='adsbygoogle'], script[src*='3nbf4'], script[src*='al5sm'], script[src*='highperformanceformat'], script[src*='effectivegatecpm']"
      );
      allScripts.forEach((s) => s.remove());

      const adContainers = document.querySelectorAll("#ads-container, #ad-frame, .adsbygoogle");
      adContainers.forEach((el) => el.remove());

      return;
    }

    // ===== 1. Google AdSense =====
    const googleScript = document.createElement("script");
    googleScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9753529299707587";
    googleScript.async = true;
    googleScript.crossOrigin = "anonymous";
    document.head.appendChild(googleScript);

    // ===== 2. 3nbf4 =====
    const tagScript = document.createElement("script");
    tagScript.src = "https://3nbf4.com/act/files/tag.min.js?z=10075461";
    tagScript.async = true;
    tagScript.setAttribute("data-cfasync", "false");
    document.head.appendChild(tagScript);

    // ===== 3. al5sm =====
    // const al5smScript = document.createElement("script");
    // al5smScript.src = "https://al5sm.com/tag.min.js";
    // al5smScript.dataset.zone = "10075465";
    // al5smScript.async = true;
    // document.body.appendChild(al5smScript);

    // ===== 4. Banner iframe 468x60 (HighPerformanceFormat) =====
    const adFrameScript = document.createElement("script");
    adFrameScript.type = "text/javascript";
    adFrameScript.innerHTML = `
      atOptions = {
        'key': '482e95aa670e11d5c512657cfcf6e778',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
      };
    `;
    document.body.appendChild(adFrameScript);
    {/* <script type='text/javascript'
    src='//pl27899802.effectivegatecpm.com/20/da/bd/20dabd413c98b4a591ffefeed4f67b89.js'></script> */}
    document.body.insertBefore(adFrameScript, document.body.firstChild);
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "//www.highperformanceformat.com/482e95aa670e11d5c512657cfcf6e778/invoke.js";
    invokeScript.async = true;
    document.body.insertBefore(invokeScript, document.body.firstChild); // ← Và ở đây

    // ===== Cleanup khi user đổi hoặc unmount =====
    return () => {
      [googleScript, tagScript, adFrameScript, invokeScript].forEach((s) =>
        s.remove()
      );
    };
  }, [isPremium]);

  // Nếu premium thì không render gì
  if (isPremium) return null;

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Frame banner 468x60 */}
      <div id="ad-frame" className="mx-auto w-[468px] h-[60px]" />

      {/* Google ads responsive */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9753529299707587"
        data-ad-slot="8543383852"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {/* Container nếu cần thêm các banner khác */}
      <div id="ads-container" className="w-full mx-auto" />
    </div>
  );
}
