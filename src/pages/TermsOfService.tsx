import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  const { t } = useTranslation();

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
            {t("服务条款")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("最后更新：2026年3月")}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("1. 接受条款")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("访问和使用本网站即表示您同意接受这些服务条款的约束。如果您不同意这些条款的任何部分，请勿使用我们的网站。")}
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("2. 内容使用")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("本网站提供的信息仅供一般参考之用。虽然我们努力保持信息的准确性和最新性，但不对信息的完整性、可靠性或适用性做出任何明示或暗示的保证。")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("3. 知识产权")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("除非另有说明，本网站上的所有内容（包括文本、图像、标志）均受版权保护。未经明确许可，不得复制、分发或用于商业用途。图片来源可能包含来自 Unsplash 等平台的免版税资源。")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-medium mb-4">{t("4. 责任限制")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("在法律允许的最大范围内，本网站及其所有者不对因使用或无法使用本网站而产生的任何直接、间接、附带或后果性损害承担责任。在访问自然景点时，请始终将安全放在首位。")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}