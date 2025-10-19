import React from 'react';
import erp from '../../assets/images/portfolio/erp.jpg'
import CampusPay from '../../assets/images/portfolio/CampusPay.jpg'
import TeacherAssist from '../../assets/images/portfolio/TeacherAssist.jpg'
import MessagingHub from '../../assets/images/portfolio/ParentConnect.jpg'
import Timetable from '../../assets/images/portfolio/scheduling.jpg'
import Admission from '../../assets/images/portfolio/admissions.jpg'
import Analytics from '../../assets/images/portfolio/analytics.jpg'
import MobileApp from '../../assets/images/portfolio/mobileapp.jpg'
import Api from '../../assets/images/portfolio/api.jpg'
type Project = {
  id: number;
  title: string;
  img: string;
  bullets: string[];
  role: string;
  tags: string[];
  link?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'EduPortal — School ERP',
    img: erp,
    bullets: [
      'Built a modular school management system for admins, teachers, and parents.',
      'Implemented secure role-based access and audit logging for sensitive actions.',
      'Optimized class scheduling and attendance to reduce admin time by 40%.',
      'Designed responsive UI and mobile-first experience used by staff on-the-go.',
      'Integrated reporting and exportable CSV/PDF grade reports for fast audits.',
    ],
    role: 'Full Stack Developer',
    tags: ['React', 'Node.js', 'Postgres', 'Role-based Auth'],
    link: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'CampusPay — Fees & Payments',
    img: CampusPay,
    bullets: [
      'Implemented recurring and one-time payment flows with PCI-compliant handling.',
      'Integrated multiple payment gateways and fallback mechanisms.',
      'Automated receipts, refunds, and reconciliation reports for accounting.',
      'Built admin dashboard to track dues, defaulters, and payment trends.',
      'Reduced manual reconciliation by ~70% with automated batch jobs.',
    ],
    role: 'Backend Lead',
    tags: ['Express', 'Stripe', 'Postgres', 'Security'],
    link: '#',
  },
  {
    id: 3,
    title: 'TeacherAssist — Gradebook & Materials',
    img: TeacherAssist,
    bullets: [
      'Created an intuitive gradebook with bulk-edit and weighted grading.',
      'Added inline feedback, rubrics, and downloadable student progress PDFs.',
      'Sync with attendance & timetable to auto-generate class summaries.',
      "Empowered teachers with a materials library and versioned uploads.",
      'Accessible design meeting WCAG basics for inclusive classrooms.',
    ],
    role: 'Frontend Engineer',
    tags: ['React', 'Tailwind', 'AWS S3', 'Accessibility'],
    link: '#',
  },
  {
    id: 4,
    title: 'ParentConnect — Messaging Hub',
    img: MessagingHub,
    bullets: [
      'Two-way secure messaging between school staff and parents.',
      'Push notifications and email fallbacks for critical alerts.',
      'Message templates for attendance alerts & event announcements.',
      'Built message analytics dashboard to monitor engagement rates.',
      'Data privacy-first design: messages encrypted at rest.',
    ],
    role: 'Full Stack Developer',
    tags: ['React', 'Firebase', 'Notifications'],
    link: '#',
  },
  {
    id: 5,
    title: 'Timetable Pro — Scheduling Engine',
    img: Timetable,
    bullets: [
      'Constraint-based scheduler supporting teacher availability & room limits.',
      'Drag-and-drop UI for manual adjustments and auto-resolve conflicts.',
      'Exportable timetables per class, teacher, and room in CSV/PDF formats.',
      'Background job to re-run scheduling during special events or closures.',
      'Saved admins hours per week by automating conflict resolution.',
    ],
    role: 'System Designer',
    tags: ['Python', 'Redis', 'Algorithm'],
    link: '#',
  },
  {
    id: 6,
    title: 'Admissions Flow — Lead-to-Student CRM',
    img: Admission,
    bullets: [
      'End-to-end admissions pipeline with lead scoring and reminders.',
      'Customizable forms and automated follow-ups for high conversion.',
      'Integrated with communications and payment for deposit capture.',
      'Analytics to monitor funnel drop-offs and optimize outreach.',
      'GDPR-friendly consent capture and record retention controls.',
    ],
    role: 'Full Stack Developer',
    tags: ['React', 'Node.js', 'Mail Service'],
    link: '#',
  },
  {
    id: 7,
    title: 'Analytics Dashboard',
    img: Analytics,
    bullets: [
      'Unified analytics for attendance, fees, and academic performance.',
      'Real-time charts, cohort comparisons, and exportable visual reports.',
      'Custom dashboard builder for admins to save key widgets.',
      'Role-aware metrics so teachers only see relevant data.',
      'Optimized queries and caching for sub-second dashboards.',
    ],
    role: 'Data Engineer',
    tags: ['React', 'D3', 'Postgres', 'Caching'],
    link: '#',
  },
  {
    id: 8,
    title: 'Mobile App — Parent & Teacher',
    img: MobileApp,
    bullets: [
      'Cross-platform mobile app for iOS and Android using React Native.',
      'Offline caching for schedules and messages in low connectivity areas.',
      'Push notifications for urgent announcements and attendance.',
      'Secure auth with refresh tokens and biometric-friendly flows.',
      'High app store rating achieved after iterative UX improvements.',
    ],
    role: 'Mobile Engineer',
    tags: ['React Native', 'Expo', 'Push'],
    link: '#',
  },
  {
    id: 9,
    title: 'API Platform & Docs',
    img: Api,
    bullets: [
      'Designed RESTful API with clear versioning strategy and rate limits.',
      'Comprehensive developer docs and OpenAPI spec for quick onboarding.',
      'API gateway with authentication, monitoring, and request throttling.',
      'Sandbox environment for partners and third-party integrations.',
      'Automated CI to run contract tests and prevent regressions.',
    ],
    role: 'Backend Engineer',
    tags: ['Node.js', 'OpenAPI', 'Kong'],
    link: '#',
  }
];

const Badge: React.FC<{ children: React.ReactNode; variant?: string }> = ({
  children,
  variant = 'bg-gray-100 text-gray-800',
}) => {
  return (
    <span
      className={`inline-block text-xs px-2 py-1 rounded-full mr-2 mb-2 ${variant} border border-transparent`}
    >
      {children}
    </span>
  );
};

const Portfolio: React.FC = () => {
  return (
    <section className="bg-white text-gray-900 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Portfolio — Selected Projects
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A curated selection of platforms, tools, and security engagements We personally built or led. Each entry highlights impact, technical choices, and the value delivered to stakeholders.
          </p>
        </header>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Badge variant="bg-primary text-white">Full Stack</Badge>
            <Badge variant="bg-indigo-100 text-indigo-700">Security</Badge>
            <Badge variant="bg-green-100 text-green-700">Mobile</Badge>
            <Badge variant="bg-yellow-100 text-yellow-700">Data</Badge>
          </div>
          <div className="text-sm text-gray-600">
            15 projects • web, mobile, infra, and security engagements
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <article
              key={p.id}
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col`}
            >
              <div className="relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-50 object-cover"
                />
                {p.featured && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {p.title}
                </h3>

                <ul className="text-sm text-gray-700 space-y-1 mb-4 flex-1">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="before:content-['•'] before:text-primary before:mr-2">
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="flex flex-wrap">
                      <Badge variant="bg-gray-100 text-gray-800">{p.role}</Badge>
                      {p.tags.map((t, i) => (
                        <Badge key={i} variant={t === 'Pentest' || t === 'Security' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-800'}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 bg-primary text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold">Interested in working together?</h4>
            <p className="text-sm opacity-90">
              I build robust, secure applications and perform thorough security assessments. Let’s discuss how I can help accelerate your product.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/contact"
              className="bg-white text-primary font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
            <a
              href="/resume.pdf"
              className="border border-white text-white px-5 py-2 rounded-md hover:bg-white hover:text-primary transition"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
