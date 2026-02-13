"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import ICIMSLogo from "../icons/ICIMSLogo";
import HubCityMediaLogo from "../icons/HubCityMediaLogo";

export default function WorkExperience() {
  const { isDark } = useTheme();

  // Theme-aware color scheme
  const workBgColor = isDark ? "#0891b2" : "#06b6d4";
  const workArrowColor = isDark ? "#0891b2" : "#06b6d4";
  const workIconBg = isDark ? "white" : "#d1e0e9";
  const work2BgColor = isDark ? "#dc2626" : "#ef4444";
  const work2ArrowColor = isDark ? "#dc2626" : "#ef4444";
  const contentTextColor = isDark ? "#ffffff" : "#000000";
  const titleTextColor = isDark ? "white" : "black";
  const lineColor = isDark ? "white" : "black";
  const boxShadow = isDark
    ? "0 4px 20px rgba(0,0,0,0.5)"
    : "0 4px 20px rgba(0,0,0,0.1)";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
      }`}
    >
      <Header />
      <section className="pt-24 px-4">
        <h2
          className={`text-4xl font-bold mb-12 text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Work Experience
        </h2>
        <VerticalTimeline lineColor={lineColor}>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: workBgColor,
              color: contentTextColor,
              boxShadow: boxShadow,
              borderRadius: "8px",
            }}
            contentArrowStyle={{ borderRight: `7px solid ${workArrowColor}` }}
            date="Mar 2024 - Dec 2025"
            iconStyle={{
              background: workIconBg,
            }}
            icon={<ICIMSLogo />}
          >
            <h2
              className="vertical-timeline-element-title"
              style={{ color: titleTextColor }}
            >
              Principal Software Engineer @ iCIMS
            </h2>
            <div className="space-y-4 mt-4 pl-4">
              <div>
                <h3 className="font-semibold">CMS Gen AI</h3>
                <span className="italic text-sm opacity-80">
                  ApostropheCMS, Azure, Node, Express, Nunjucks
                </span>
                <span className="block">
                  Integrated AI-driven SEO Assistant and Automatic Translation
                  capabilities to generate optimized metadata and localized
                  content for CMS-managed pages, improving search
                  discoverability while significantly reducing manual content
                  effort.
                </span>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: workBgColor,
              color: contentTextColor,
              boxShadow: boxShadow,
              borderRadius: "8px",
            }}
            contentArrowStyle={{ borderRight: `7px solid ${workArrowColor}` }}
            date="Jan 2022 - Mar 2024"
            iconStyle={{ background: workIconBg, color: contentTextColor }}
            icon={<ICIMSLogo />}
          >
            <h2
              className="vertical-timeline-element-title"
              style={{ color: titleTextColor }}
            >
              Senior Software Engineer @ iCIMS
            </h2>
            <div className="space-y-4 mt-4 pl-4">
              <div>
                <h3 className="font-semibold">Employee Onboarding</h3>
                <span className="italic text-sm opacity-80">
                  TypeScript, Angular, NgRx, NestJS, Redis
                </span>
                <span className="block">
                  Built employee onboarding flow into Career Sites.
                </span>
              </div>
              <div>
                <h3 className="font-semibold">Career Studio</h3>
                <span className="italic text-sm opacity-80">
                  React, Redux, Node, Express, Java, Spring, Postgres, NestJS
                </span>
                <span className="block">
                  Built full-stack platform enabling employee internal mobility
                  and career progression.
                </span>
              </div>
              <div>
                <h3 className="font-semibold">CMS Upgrade</h3>
                <span className="italic text-sm opacity-80">
                  ApostropheCMS, Vue, Node, Express, Nunjucks, AWS S3, MongoDB
                </span>
                <span className="block">
                  Successfully revived and modernized a long-stalled CMS
                  initiative, upgrading it to the latest version after years in
                  the backlog.
                </span>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: workBgColor,
              color: contentTextColor,
              boxShadow: boxShadow,
              borderRadius: "8px",
            }}
            contentArrowStyle={{ borderRight: `7px solid ${workArrowColor}` }}
            date="Aug 2019 - Jan 2022"
            iconStyle={{ background: workIconBg, color: contentTextColor }}
            icon={<ICIMSLogo />}
          >
            <h2
              className="vertical-timeline-element-title"
              style={{ color: titleTextColor }}
            >
              Software Engineer II @ iCIMS
            </h2>
            <div className="space-y-4 mt-4 pl-4">
              <div>
                <h3 className="font-semibold">Talent Discovery</h3>

                <span className="italic text-sm opacity-80">
                  React, Node, Express, Redis
                </span>
                <span className="block">
                  Utilizes AI matching capabilities to enable recruiters to
                  source candidates aligned with job descriptions
                </span>
              </div>
              <div>
                <h3 className="font-semibold">Talent Match</h3>

                <span className="italic text-sm opacity-80">
                  React, Node, Express, Redis
                </span>
                <span className="block">
                  Uses AI-driven matching to help recruiters discover candidates
                  who closely resemble their ideal candidate profile.
                </span>
              </div>
            </div>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: work2BgColor,
              color: contentTextColor,
              boxShadow: boxShadow,
              borderRadius: "8px",
            }}
            contentArrowStyle={{ borderRight: `7px solid ${work2ArrowColor}` }}
            date="Oct 2018 - Aug 2019"
            iconStyle={{ background: workIconBg, color: contentTextColor }}
            icon={<HubCityMediaLogo />}
          >
            <h2
              className="vertical-timeline-element-title"
              style={{ color: titleTextColor }}
            >
              Principal Systems Engineer @ Hub City Media
            </h2>
            <div className="space-y-4 mt-4 pl-4">
              <div>
                <h3 className="font-semibold">HDR - IdM Upgrade</h3>
              </div>
              <div>
                <h3 className="font-semibold">
                  Exelon - Staff augmentation & IdM Upgrade
                </h3>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{
              background: work2BgColor,
              color: contentTextColor,
              boxShadow: boxShadow,
              borderRadius: "8px",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${work2ArrowColor}`,
            }}
            date="Jan 2014 - Oct 2018"
            iconStyle={{ background: workIconBg, color: contentTextColor }}
            icon={<HubCityMediaLogo />}
          >
            <h2
              className="vertical-timeline-element-title"
              style={{ color: titleTextColor }}
            >
              Senior Systems Engineer @ Hub City Media
            </h2>
            <div className="space-y-4 mt-4 pl-4">
              <div>
                <h3 className="font-semibold">
                  Ameren - IdM Migration & Upgrade
                </h3>
              </div>
              <div>
                <h3 className="font-semibold">Harris - IdM Replacement</h3>
              </div>
              <div>
                <h3 className="font-semibold">
                  Intercontinental Exchange (ICE) - IdM Upgrade
                </h3>
              </div>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{
              background: work2BgColor,
              color: contentTextColor,
              boxShadow: boxShadow,
              borderRadius: "8px",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${work2ArrowColor}`,
            }}
            date="Jan 2012 - Dec 2013"
            iconStyle={{ background: workIconBg, color: contentTextColor }}
            icon={<HubCityMediaLogo />}
          >
            <h2
              className="vertical-timeline-element-title"
              style={{ color: titleTextColor }}
            >
              Implementation Specialist @ Hub City Media
            </h2>
            <div className="space-y-4 mt-4 pl-4">
              <div>
                <h3 className="font-semibold">NCSU - IdM Replacement</h3>
              </div>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
      <Footer />
    </div>
  );
}
