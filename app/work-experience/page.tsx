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
            <p>
              CMS Gen AI (Azure, Node, Express, Nunjucks): Integrated AI-driven
              automation to generate SEO metadata and localized content for
              CMS-managed pages, improving discoverability while significantly
              reducing manual content effort.
            </p>
            <p>
              CMS DoD Foundations (Mabl, TM4J, SonarQube, Veracode, New Relic,
              SumoLogic, AXE): Established and enforced a Definition of Done
              (DoD), including 80%+ unit test coverage, end-to-end testing of
              critical workflows with Mabl, code quality enforcement via Sonar,
              security scanning with Veracode (SAST/SCA), and regular upgrades
              to the latest CMS versions.
            </p>
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
            <p>
              Employee Onboarding (TypeScript, Angular, NgRx, NestJS, Redis):
              Build employee onboarding experience into Career Sites.
            </p>
            <p>
              Career Studio (React, Redux, Node, Express, Java, Spring,
              Postgres, Angular, NestJS): Full stack application to support
              empoyee internal mobility in Career Sites.
            </p>
            <p>
              CMS Upgrade (ApostropheCMS, Vue, Node, Express, Nunjucks, AWS S3,
              MongoDB): Successfully revived and modernized a long-stalled CMS
              initiative, upgrading it to the latest version after years in the
              backlog.
            </p>
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
            <p>
              Talent Discovery (React, Node, Express, Redis): Utilizes AI
              matching capabilities to enable recruiters to source candidates
              based on job descriptions.
            </p>
            <p>
              Talent Match (React, Node, Express, Redis): Uses AI-driven
              matching to help recruiters discover candidates who closely
              resemble their ideal candidate profile.
            </p>
            <span
              className="text-sm mt-2 block"
              style={{ color: contentTextColor }}
            ></span>
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
            <p>HDR: IdM Upgrade</p>
            <p>Exelon: Staff Augmentation + IdM Upgrade</p>
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
            <p>Ameren: IdM Migration + Upgrade</p>
            <p>Harris: IdM Replacement</p>
            <p>Intercontinental Exchange (ICE): IdM Upgrade</p>
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
            <p>North Carolina State University (NCSU): IdM Replacement</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </section>
      <Footer />
    </div>
  );
}
