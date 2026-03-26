import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-background text-foreground pb-16">
      <SEOHead 
        title={`Falaise d'Aval | ${t("隐私政策")}`}
        pagePath="/privacy-policy"
      />
      <div className="grain absolute inset-0 -z-10" />

      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("返回首页") || "Back to Home"}
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-12 sm:pt-20">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight" style={{ fontFamily: "Cormorant Garamond" }}>
            {t("隐私政策")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("最后更新：2026年3月")}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("1. 信息收集")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("我们致力于保护您的隐私。本网站主要作为信息展示平台，通常不会主动收集用户的个人身份信息。然而，通过服务器日志和分析工具，我们可能会收集非个人识别信息，如浏览器类型、访问时间和页面浏览记录。")}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("2. Cookie的使用")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("为了提供更好的用户体验并了解网站的使用情况，我们可能会使用Cookie。这些Cookie用于记录用户偏好和分析网站流量。您可以在浏览器中调整Cookie设置。")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("3. 第三方链接")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("本网站可能包含指向第三方网站的链接（例如Google Maps）。我们对这些外部网站的隐私惯例不承担责任。我们建议您在离开本站时阅读每个收集个人信息的网站的隐私声明。")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("4. 联系我们")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("如果您对本隐私政策有任何疑问或疑虑，请通过以下方式与我们联系：")}
              <br />
              <a href="mailto:claritleonelmnicol@gmail.com" className="text-primary hover:underline">claritleonelmnicol@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}