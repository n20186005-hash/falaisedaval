/*
  Falaise d'Aval — Visitor Page
*/

import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ArrowUpRight,
  Compass,
  MapPinned,
  ShieldAlert,
  Waves,
  Camera,
  Footprints,
  ExternalLink,
  Mountain,
  Moon,
  Sun,
  Globe
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import heroImg from "@/assets/photos/hero-falaise-daval.jpg";
import g1 from "@/assets/photos/gallery-01.jpg";
import g2 from "@/assets/photos/gallery-02.jpg";
import g3 from "@/assets/photos/gallery-03.jpg";
import g4 from "@/assets/photos/gallery-04.jpg";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HomeProps {
  targetSection?: string;
}

function SectionTitle(props: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
        {props.kicker}
      </div>
      <h2 className="text-3xl sm:text-4xl leading-[0.98]">{props.title}</h2>
      {props.desc ? (
        <p className="max-w-2xl text-muted-foreground">{props.desc}</p>
      ) : null}
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    // 强制刷新以确保所有写死的或未被 t() 包裹的深度组件完全重新渲染
    window.location.reload();
  };

  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  const gallery = useMemo(
    () => [
      { src: g1, alt: t("阴天质感：Porte d'Aval 的拱门") },
      { src: g2, alt: t("海滩视角：拱门与海浪") },
      { src: g3, alt: t("暮色与低潮礁滩的层次") },
      { src: g4, alt: t("悬崖步道俯瞰：Aiguille 与海湾") },
    ],
    [t],
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="grain absolute inset-0 -z-10" />

      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-baseline gap-3">
              <div
                className="text-lg font-semibold"
                style={{ fontFamily: "Cormorant Garamond" }}
              >
                {t("Falaise d'Aval")}
              </div>
              <div className="hidden sm:block text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {t("Étretat · Côte d'Albâtre")}
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link className="hover:opacity-70" href="/overview">
                {t("概览")}
              </Link>
              <Link className="hover:opacity-70" href="/photos">
                {t("照片")}
              </Link>
              <Link className="hover:opacity-70" href="/tips">
                {t("玩法")}
              </Link>
              <Link className="hover:opacity-70" href="/map">
                {t("地图")}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Toggle language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                    Français
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('zh-Hant')}>
                    繁體中文
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange('de')}>
                    Deutsch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <a
                  href="https://maps.app.goo.gl/7ZmDoEYUKrHYQgSp8"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("打开 Google Maps")} <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild className="md:hidden" size="sm">
                <a href="#map" onClick={(e) => e.preventDefault()}>
                  <MapPinned className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">{t("自然景观点")}</Badge>
                  <Badge variant="secondary" className="rounded-full">{t("评分 4.8/5（Google）")}</Badge>
                  <Badge variant="secondary" className="rounded-full">{t("24 小时开放")}</Badge>
                </div>

                <h1 className="mt-5 text-5xl sm:text-6xl leading-[0.9]">{t("面向英吉利海峡的")}<span className="block">{t("纪念碑级拱门")}</span>
                </h1>

                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  {t("Falaise d'Aval 是 Étretat 最具辨识度的海崖段之一：白垩悬崖被海水雕刻出巨大的天然拱门（Porte d'Aval），旁侧可见「针状岩」（L'Aiguille）。低潮时更靠近礁滩与洞穴区域，但涨潮速度快——请把潮汐当作第一条规则。")}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/overview">{t("开始了解")}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/photos">{t("看照片")}</Link>
                  </Button>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <Card className="hairline rounded-2xl p-4 bg-card/70">
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4" />
                      <div className="text-sm font-medium">{t("位置")}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{t("Étretat, 法国")}</div>
                  </Card>
                  <Card className="hairline rounded-2xl p-4 bg-card/70">
                    <div className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4" />
                      <div className="text-sm font-medium">{t("Plus Code")}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{t("P54V+WC Étretat, 法国")}</div>
                  </Card>
                  <Card className="hairline rounded-2xl p-4 bg-card/70">
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      <div className="text-sm font-medium">{t("关键词")}</div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{t("拱门 / 针状岩 / 低潮 / 观景步道")}</div>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[2.2rem] border bg-card shadow-[0_30px_80px_-60px_rgba(0,0,0,0.65)]">
                  <img
                      src={heroImg}
                      alt={t("Falaise d'Aval、Porte d'Aval 与 L'Aiguille")}
                      className="h-[380px] w-full object-cover sm:h-[520px]"
                      loading="eager"
                  />
                  <div className="absolute inset-0 mask-fade bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-white">
                        <div className="text-xs tracking-[0.22em] uppercase opacity-80">{t("照片")}</div>
                        <div className="text-lg" style={{ fontFamily: "Cormorant Garamond" }}>
                          {t("Porte d'Aval / Étretat")}
                        </div>
                      </div>
                      <Badge className="rounded-full bg-white/90 text-foreground hover:bg-white/90">
                        Unsplash
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="overview" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
                kicker={t("概览")}
                title={t("为什么这里最'像Étretat'")}
                desc={t("一眼识别的拱门轮廓 + 近距离可触达的海蚀地形，让 Falaise d'Aval 成为经典观景点。")}
              />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Card className="hairline rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond" }}>
                      {t("Porte d'Aval")}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("海蚀拱门像一座天然「门洞」，在不同光线下呈现完全不同的层次。")}</p>
                  </div>
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card className="hairline rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond" }}>
                      {t("L'Aiguille")}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("「针状岩」立在海中，是摄影构图里的稳定锚点：广角看尺度，长焦看纹理。")}</p>
                  </div>
                  <Waves className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card className="hairline rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold" style={{ fontFamily: "Cormorant Garamond" }}>{t("低潮可达")}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{t("许多近景视角只在低潮窗口出现；涨潮会迅速抹掉路径。安全第一。")}</p>
                  </div>
                  <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>

            <div className="mt-8 text-xs text-muted-foreground">{t("说明：页面基础信息（评分、开放时间、Plus Code）来自 Google Maps；地貌与观景建议参考公开旅游信息。")}</div>
          </div>
        </section>

        <section id="photos" className="scroll-mt-24 border-y bg-card/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
                kicker={t("照片")}
                title={t("照片")}
              />

            <div className="mt-10">
              <Carousel opts={{ align: "start", loop: true }} className="relative">
                <CarouselContent>
                  {gallery.map((item) => (
                    <CarouselItem key={item.alt} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="hairline overflow-hidden rounded-2xl">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-64 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="p-4">
                          <div className="text-sm font-medium">{item.alt}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{t("照片")} · Unsplash</div>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-2" />
                <CarouselNext className="-right-2" />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="tips" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
                kicker={t("玩法")}
                title={t("怎么逛更舒服")}
                desc={t("这里的关键不是'走多远'，而是'什么时候走'：低潮窗口 + 回撤余量。")}
              />

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{t("快速计划")}</div>
                <h3 className="mt-2 text-2xl leading-tight">{t("半日路线（不赶）")}</h3>
                <Separator className="my-5" />
                <ol className="space-y-4 text-sm">
                  <li className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-accent/60 grid place-items-center text-xs font-semibold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">{t("海滩侧先取一个'远景点'")}</div>
                      <div className="text-muted-foreground mt-1">{t("先用远景确定拱门、针状岩、浪线关系，再决定是否近距离探索。")}</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-accent/60 grid place-items-center text-xs font-semibold">
                      2
                    </div>
                    <div>
                      <div className="font-medium">{t("低潮窗口进入礁滩（可选）")}</div>
                      <div className="text-muted-foreground mt-1">{t("只在你确定潮汐与退路时进入；不要把'拍到'建立在'赌一把'上。")}</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-accent/60 grid place-items-center text-xs font-semibold">
                      3
                    </div>
                    <div>
                      <div className="font-medium">{t("上崖顶步道看轮廓与光线")}</div>
                      <div className="text-muted-foreground mt-1">{t("崖顶更适合全景与日落光；风大时注意站位与边缘距离。")}</div>
                    </div>
                  </li>
                </ol>
              </Card>

              <div className="grid gap-4">
                <Card className="hairline rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{t("安全")}</div>
                      <h3 className="mt-2 text-2xl leading-tight">{t("潮汐提醒")}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t("谷地/礁滩区域一旦涨潮，很容易被海水「切断」回程。最稳妥：")}<span className="font-medium text-foreground">{t("只在低潮窗口进入")}</span>{t("，并预留至少 1 小时回撤。")}</p>
                    </div>
                    <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>

                <Card className="hairline rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">{t("地形")}</div>
                      <h3 className="mt-2 text-2xl leading-tight">{t("鞋子与步行")}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t("鹅卵石路面更费力且更滑，建议穿防滑鞋；摄影党最好带长焦与防风外套。")}</p>
                    </div>
                    <Footprints className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-24 border-t bg-card/10">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
              kicker={t("对比")}
              title={t("Plage d'Étretat 与 Falaise d'Aval 景点对比")}
              desc={t("游玩指南")}
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card className="hairline rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{t("共同点")}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("同属于 Étretat 的标志性白垩悬崖景观的一部分。")}</li>
                  <li>{t("都是受到潮汐影响的自然区域，涨潮时部分区域无法进入。")}</li>
                  <li>{t("皆以独特的鹅卵石海滩和壮丽的日落光影而闻名。")}</li>
                </ul>
              </Card>
              <Card className="hairline rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">{t("不同点")}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("Plage d'Étretat 主要是指宽阔的公共鹅卵石海滩，更适合休闲、听浪和观看全景。")}</li>
                  <li>{t("Falaise d'Aval 侧重于南侧的悬崖，著名的拱门（Porte d'Aval）和针状岩（L'Aiguille），更具戏剧性和探险感。")}</li>
                  <li>{t("Falaise d'Aval 提供了悬崖顶部的徒步步道，可以从高处俯瞰海湾，而海滩主要在底部。")}</li>
                </ul>
              </Card>

              <Card className="hairline rounded-2xl border-yellow-200 bg-yellow-50/50 p-6 dark:border-yellow-900 dark:bg-yellow-900/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">⚠️</span> {t("提示")}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>{t("海滩严禁捡鹅卵石（有罚款）；悬崖下部分区域因落石风险，有官方禁入标志。")}</li>
                  <li>{t("从海滩走到 Porte d'Aval 拱门，必须在低潮前后 4 小时内完成往返，避免涨潮被困。")}</li>
                  <li>{t("若想同时打卡两者，建议先在海滩看全景，再沿步道上 Falaise d'Aval 的观景台拍日落。")}</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section id="reviews" className="scroll-mt-24 border-t bg-card/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle
              kicker={t("评价")}
              title={t("真实游客评价")}
            />

            <div className="mt-6 mb-8 p-5 bg-muted/30 rounded-xl border-l-4 border-primary">
              <p className="font-semibold text-lg flex items-center gap-2">
                {t("评价 - 游客怎么说")}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl font-bold">4.8</span>
                <div className="flex text-yellow-500 text-sm">
                  {'★★★★★'.split('').map((star, j) => <span key={j}>{star}</span>)}
                </div>
                <span className="text-sm text-muted-foreground">(21,394 {t("条评价")})</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {t("评分与评论数据来源于 Google Maps（最后更新：2026 年）。我们仅展示部分经核实的高分评价。如需查看完整最新评论，请点击下方链接。")}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Jean-Pierre", role: t("本地嚮導"), date: t("1 個月前"), content: t("這絕對是諾曼第最壯觀的海岸線。白色的白堊懸崖（Porte d'Aval）和針岩（L'Aiguille）令人驚嘆。記得穿適合在鵝卵石上行走的鞋子，而且一定要在退潮時去探索那些隱藏的洞穴。") },
                { name: "Sarah Jenkins", role: t("攝影師"), date: t("2 個月前"), content: t("日落時分的景色無與倫比！當陽光將白色的懸崖染成金色時，整個海灘就像一幅油畫。強烈建議爬上 Amont 懸崖的步道，從高處俯瞰整個 Étretat 海灣的弧線。") },
                { name: "Thomas M.", role: t("旅客"), date: t("3 週前"), content: t("鵝卵石海灘很特別，聽著海浪退去時石頭滾動的『嘩啦』聲非常療癒。這裡風很大，即使在夏天也建議帶件薄外套。停車有點困難，最好早點到或停在外圍。") },
                { name: "Marie L.", role: t("遊客"), date: "2025-11", content: t("Magnifique ! Les falaises de craie blanche sont à couper le souffle. La Porte d'Aval et l'Aiguille créent un paysage unique au monde. Pensez à venir à marée basse pour explorer les grottes.") },
                { name: "Pierre D.", role: t("本地居民"), date: "2025-09", content: t("作為諾曼第居民，我每季都來這裡。秋天的懸崖在晨霧中若隱若現，猶如仙境。千萬別錯過從懸崖頂俯瞰的視角——那是我見過最美的風景之一。") },
                { name: "Emma R.", role: t("自助旅行者"), date: "2025-10", content: t("One of the most beautiful coastal walks I've ever done. The white chalk cliffs against the deep blue English Channel is a sight I'll never forget. Arrive early to avoid the tour buses!") },
                { name: "Lucas B.", role: t("地質愛好者"), date: "2025-08", content: t("L'érosion marine a créé des formes spectaculaires ici — l'arche naturelle de la Porte d'Aval est un chef-d'œuvre géologique. Fascinant pour les passionnés de géologie comme moi !") },
                { name: "Sophie Chen", role: t("背包客"), date: "2025-07", content: t("從巴黎坐火車來一日遊非常方便。鵝卵石沙灘和壯觀的白堊懸崖形成強烈對比。夕陽時分光線特別美，難怪印象派畫家都來這裡找靈感。") },
              ].map((review, i) => (
                <Card key={i} className="hairline rounded-2xl p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.role} · {review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3 text-yellow-500">
                    {'★★★★★'.split('').map((star, j) => <span key={j}>{star}</span>)}
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">"{review.content}"</p>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://maps.app.goo.gl/7ZmDoEYUKrHYQgSp8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                {t("查看更多 Google Maps 評價")}
              </a>
            </div>
          </div>
        </section>

        <section id="map" className="scroll-mt-24 border-t bg-card/35">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle
                kicker={t("地图")}
                title={t("地图")}
              />
              <Button asChild variant="outline" className="w-fit">
                <a
                  href="https://maps.app.goo.gl/7ZmDoEYUKrHYQgSp8"
                  target="_blank"
                  rel="noreferrer"
                >{t("在 Google Maps 里规划路线")}<ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border bg-background">
              <div className="aspect-[16/10] w-full">
                <iframe
                  title="Falaise d'Aval - Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10320.744008344805!2d0.17452778715820244!3d49.707299900000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e017ec085cd9e3%3A0xf32a14b75516be50!2sFalaise%20d&#39;Aval!5e0!3m2!1sen!2sus!4v1774238261235!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Open hours</div>
                <div className="mt-2 text-xl" style={{ fontFamily: "Cormorant Garamond" }}>{t("24 小时开放")}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t("自然景观点；部分近景路线受潮汐/天气影响。")}</p>
              </Card>
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Best light</div>
                <div className="mt-2 text-xl" style={{ fontFamily: "Cormorant Garamond" }}>{t("日落前后")}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t("逆光或侧逆光会强调悬崖纹理；阴天则更适合拍「冷色电影感」。")}</p>
              </Card>
              <Card className="hairline rounded-2xl p-6">
                <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground">Mini rule</div>
                <div className="mt-2 text-xl" style={{ fontFamily: "Cormorant Garamond" }}>{t("远离边缘")}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t("崖顶风强且边缘松散，请保持距离；拍照时更不要背对海风走近边缘。")}</p>
              </Card>
            </div>
          </div>
        </section>

        <section id="sources" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <SectionTitle kicker={t("数据与引用")} title={t("数据与引用")} desc={t("为了保持信息可信，我们只引用可公开访问的页面。")} />

            <div className="mt-8 grid gap-4">
              <Card className="hairline rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{t("信息提取自公共资源")}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t("结合了诺曼底当地旅游局、维基百科以及谷歌地图的基本信息。")}</div>
                  </div>
                </div>
              </Card>

              <Card className="hairline rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{t("Google Maps（地点基础信息）")}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t("评分、开放时间、Plus Code、简介等（可能随时间变化）")}</div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://maps.app.goo.gl/7ZmDoEYUKrHYQgSp8" target="_blank" rel="noreferrer">{t("打开")}<ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8 p-5 bg-muted/30 rounded-xl border-l-4 border-yellow-500">
              <h4 className="font-semibold text-sm mb-2">{t("免责声明（Disclaimer）")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("本网站是一个独立的第三方旅游资讯指南，旨在为游客提供客观的历史背景与游览建议，与 Falaise d'Aval 的官方管理机构无关。如需购买官方门票或获取官方通告，请访问官方渠道。")}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <div>
                <p>{t("如需本网站的技术支持，请联系：claritleonelmnicol@gmail.com")}</p>
                <p className="mt-2">{t("© 2026 Falaise d'Aval ·版权所有。")}</p>
              </div>
              <div className="flex gap-4">
                <Link className="hover:opacity-70" href="/privacy-policy">{t("隐私政策")}</Link>
                <Link className="hover:opacity-70" href="/terms-of-service">{t("服务条款")}</Link>
                <Link className="hover:opacity-70" href="/cookie-settings">{t("Cookie 设置")}</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
