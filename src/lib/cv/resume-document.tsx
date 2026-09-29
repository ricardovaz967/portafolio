import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";

import type { Locale, PortfolioView } from "@/types/portfolio";

Font.registerHyphenationCallback((word) => [word]);

const ink = "#0f2744";
const muted = "#475569";
const line = "#d5deea";

const styles = StyleSheet.create({
  page: {
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 26,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.28,
    color: "#1e293b",
  },
  accent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    backgroundColor: ink,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 7,
    borderBottomWidth: 1.25,
    borderBottomColor: ink,
  },
  photo: {
    width: 70,
    height: 70,
    marginRight: 12,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    color: ink,
  },
  badge: {
    marginTop: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: "#1d4ed8",
  },
  role: {
    marginTop: 2,
    fontSize: 8,
    color: muted,
  },
  contactBlock: {
    width: 158,
    marginLeft: 12,
  },
  contactItem: {
    fontSize: 7.5,
    color: "#334155",
    marginBottom: 2,
    textAlign: "right",
  },
  block: {
    marginTop: 7,
  },
  heading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: ink,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.6,
    borderBottomColor: line,
  },
  paragraph: {
    marginTop: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pair: {
    flexDirection: "row",
    marginTop: 7,
  },
  job: {
    marginBottom: 5,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: ink,
  },
  meta: {
    color: muted,
    fontSize: 8,
    marginTop: 1,
  },
  company: {
    color: "#1d4ed8",
    fontSize: 8.5,
    marginTop: 1,
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 8,
    marginTop: 1,
  },
  chips: {
    marginTop: 3,
    color: "#1e40af",
    fontSize: 8,
  },
  eduItem: {
    marginBottom: 4,
  },
  stackWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  stackGroup: {
    width: "50%",
    paddingRight: 8,
    marginBottom: 5,
  },
  decisionRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  decision: {
    width: "33.33%",
    paddingRight: 8,
    fontSize: 8,
    lineHeight: 1.25,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    color: ink,
  },
});

interface ResumePhoto {
  data: Buffer;
  format: "png" | "jpg";
}

interface ResumeDocumentProps {
  content: PortfolioView;
  photo: ResumePhoto | null;
  locale: Locale;
}

export function ResumeDocument({ content, photo, locale }: ResumeDocumentProps) {
  const visible = new Set(content.layout.sections.filter((section) => section.visible).map((section) => section.id));
  const { contact } = content;
  const contactItems = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedinHandle ? `linkedin.com/in/${contact.linkedinHandle}` : "",
    contact.githubHandle ? `github.com/${contact.githubHandle}` : "",
  ].filter(Boolean);

  return (
    <Document
      title={`${content.hero.name} — CV`}
      author={content.hero.name}
      subject={locale === "en" ? "Resume" : "Curriculum vitae"}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.accent} />
        <View style={styles.header}>
          {photo ? <Image src={photo} style={styles.photo} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{content.hero.name}</Text>
            <Text style={styles.badge}>{content.hero.badge}</Text>
            <Text style={styles.role}>{content.hero.role}</Text>
          </View>
          <View style={styles.contactBlock}>
            {contactItems.map((item) => (
              <Text key={item} style={styles.contactItem}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        {visible.has("about") ? <View style={styles.block}>{renderAbout(content)}</View> : null}
        {visible.has("experience") ? <View style={styles.block}>{renderExperience(content)}</View> : null}
        {visible.has("projects") ? <View style={styles.block}>{renderProjects(content)}</View> : null}

        <Pair
          left={visible.has("education") ? renderEducation(content) : null}
          right={visible.has("stack") ? renderStack(content) : null}
          leftWidth="38%"
        />

        {visible.has("architecture") ? <View style={styles.block}>{renderArchitecture(content)}</View> : null}
      </Page>
    </Document>
  );
}

function Pair({ left, right, leftWidth }: { left: ReactNode; right: ReactNode; leftWidth: string }) {
  if (!left && !right) {
    return null;
  }
  if (!left) {
    return <View style={styles.block}>{right}</View>;
  }
  if (!right) {
    return <View style={styles.block}>{left}</View>;
  }
  return (
    <View style={styles.pair}>
      <View style={{ width: leftWidth, paddingRight: 12 }}>{left}</View>
      <View style={{ flex: 1 }}>{right}</View>
    </View>
  );
}

function renderAbout(content: PortfolioView) {
  return (
    <View>
      <Text style={styles.heading}>{content.about.title}</Text>
      <Text>{content.about.intro}</Text>
      {content.about.securityLearning ? <Text style={styles.paragraph}>{content.about.securityLearning}</Text> : null}
      <Text style={styles.paragraph}>
        <Text style={styles.label}>{`${content.about.strengthsTitle}: `}</Text>
        {content.about.strengths.join("  ·  ")}
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.label}>{`${content.about.languagesTitle}: `}</Text>
        {content.about.languages.join("  ·  ")}
      </Text>
    </View>
  );
}

function renderProjects(content: PortfolioView) {
  return (
    <View>
      <Text style={styles.heading}>{content.projects.title}</Text>
      {content.projects.items.map((project) => (
        <View key={project.title}>
          <Text style={styles.itemTitle}>{project.title}</Text>
          <Text style={{ marginTop: 1 }}>{project.description}</Text>
          {project.technologies.length > 0 ? <Text style={styles.chips}>{project.technologies.join("  ·  ")}</Text> : null}
          {project.repositoryUrl ? <Text style={styles.meta}>{project.repositoryUrl}</Text> : null}
        </View>
      ))}
    </View>
  );
}

function renderExperience(content: PortfolioView) {
  return (
    <View>
      <Text style={styles.heading}>{content.nav.experience}</Text>
      {content.experience.map((job) => (
        <View key={`${job.company}-${job.period}`} style={styles.job}>
          <View style={styles.row}>
            <Text style={styles.itemTitle}>{job.title}</Text>
            <Text style={styles.meta}>{job.period}</Text>
          </View>
          <Text style={styles.company}>{job.company}</Text>
          {job.responsibilities.map((line) => (
            <Text key={line} style={styles.bullet}>{`•  ${line}`}</Text>
          ))}
          {job.technologies.length > 0 ? <Text style={styles.chips}>{job.technologies.join("  ·  ")}</Text> : null}
        </View>
      ))}
    </View>
  );
}

function renderEducation(content: PortfolioView) {
  return (
    <View>
      <Text style={styles.heading}>{content.nav.education}</Text>
      {content.education.map((item) => {
        const detail = [item.institution, item.period, item.status].filter(Boolean).join("  ·  ");
        return (
          <View key={`${item.title}-${item.period ?? item.status ?? ""}`} style={styles.eduItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {detail ? <Text style={styles.meta}>{detail}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

function renderStack(content: PortfolioView) {
  return (
    <View>
      <Text style={styles.heading}>{content.nav.stack}</Text>
      <View style={styles.stackWrap}>
        {content.stack.map((group) => (
          <View key={group.category} style={styles.stackGroup}>
            <Text style={styles.itemTitle}>{group.category}</Text>
            <Text style={{ marginTop: 1 }}>{group.items.join(", ")}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function renderArchitecture(content: PortfolioView) {
  return (
    <View>
      <Text style={styles.heading}>{content.architecture.title}</Text>
      <View style={styles.decisionRow}>
        {content.architecture.decisions.map((decision) => (
          <View key={decision.title} style={styles.decision}>
            <Text style={styles.label}>{decision.title}</Text>
            <Text style={{ marginTop: 1 }}>{decision.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
