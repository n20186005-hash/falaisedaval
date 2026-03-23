import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function CookieSettings() {
  const { t } = useTranslation();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground pb-16">
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
            {t("Cookie 设置")}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            {t("我们使用Cookie来改善您的浏览体验。您可以选择接受或拒绝某些类型的Cookie。请注意，禁用某些Cookie可能会影响网站的功能。")}
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="hairline rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">{t("必要 Cookie")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("这些Cookie是网站正常运行所必需的，无法在我们的系统中关闭。它们通常仅在响应您做出的相当于服务请求的操作时设置，例如设置您的隐私首选项或语言。")}
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>
          </Card>

          <Card className="hairline rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">{t("分析 Cookie")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("这些Cookie允许我们计算访问量和流量来源，以便我们能够衡量和改善我们网站的性能。它们帮助我们了解哪些页面最受欢迎以及访问者如何在网站上移动。")}
                </p>
              </div>
              <Switch 
                checked={analyticsEnabled} 
                onCheckedChange={setAnalyticsEnabled} 
              />
            </div>
          </Card>

          <Card className="hairline rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">{t("营销 Cookie")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("这些Cookie可能由我们的广告合作伙伴通过我们的网站设置。它们可能被这些公司用于建立您的兴趣档案并在其他网站上向您展示相关广告。")}
                </p>
              </div>
              <Switch 
                checked={marketingEnabled} 
                onCheckedChange={setMarketingEnabled} 
              />
            </div>
          </Card>

          <div className="mt-6">
            <Button size="lg">{t("保存首选项")}</Button>
          </div>
        </div>
      </main>
    </div>
  );
}