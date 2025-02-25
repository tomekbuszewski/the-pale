import * as AboutSectionFeature from "./AboutSection";
import * as AnalyticsFeature from "./Analytics";
import * as BlogSectionFeature from "./BlogSection";
import * as ClientsSectionFeature from "./ClientsSection";
import * as ContactFeature from "./Contact";
import * as ErrorBoundaryFeature from "./ErrorBoundary";
import * as FooterFeature from "./Footer";
import * as HeadFeature from "./Head";
import * as HeaderFeature from "./Header";
import * as HeroSectionFeature from "./HeroSection";
import * as ServicesSectionFeature from "./ServicesSection";
import * as WorksSectionFeature from "./WorksSection";
import * as ContentFeature from "./Content";

export const AboutSection = {
  component: AboutSectionFeature.AboutSection,
  loader: null,
};

export const HeroSection = {
  component: HeroSectionFeature.HeroSection,
  loader: null,
};

export const ClientsSection = {
  component: ClientsSectionFeature.ClientsSection,
  loader: null,
};

export const ServicesSection = {
  component: ServicesSectionFeature.ServicesSection,
  loader: null,
};

export const HeaderSection = {
  component: HeaderFeature.Header,
  loader: null,
};

export const FooterSection = {
  component: FooterFeature.Footer,
  loader: null,
};

export const WorksSection = {
  component: WorksSectionFeature.WorksSection,
  loader: null,
};

export const BlogSection = {
  component: BlogSectionFeature.BlogSection,
  guard: BlogSectionFeature.guard,
};

export const Contact = {
  component: ContactFeature.Contact,
  loader: null,
};

export const Head = {
  component: HeadFeature.Head,
};

export const ErrorBoundary = {
  component: ErrorBoundaryFeature.ErrorBoundary,
};

export const Analytics = {
  component: AnalyticsFeature.Analytics,
};

export const Content = {
  components: {
    Link: ContentFeature.Link,
    NavLink: ContentFeature.NavLink,
    LanguageDetect: ContentFeature.LanguageDetect,
  },
  context: ContentFeature.LanguageContext,
  hooks: { useTranslate: ContentFeature.useTranslate },
  functions: {
    handleLanguageChange: ContentFeature.handleLanguageChange,
    detectLanguageFromUrl: ContentFeature.detectLanguageFromUrl,
  },
};
