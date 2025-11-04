import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/global-components/language-dropdown";

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params; 
  setRequestLocale(locale);
  const t = await getTranslations("homepage");

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        {/* <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("header")}
          <span className="text-primary">{t("version")}</span>
        </h1> */}

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {t("subHeading")}
          <code className="rounded bg-muted px-2 py-1 text-sm font-medium">
            {t("pageName")}
          </code>
        </p>

        <div className="mt-10 flex gap-4">
          <Button asChild>
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("docs")}
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </Link>
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
