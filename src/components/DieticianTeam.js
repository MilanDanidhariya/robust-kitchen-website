import Link from 'next/link';
import {
  Stethoscope,
  Award,
  Users,
  Quote,
  Play,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Heart,
} from 'lucide-react';
import { buildContactHref } from '@/utils/contactSubjects';

/**
 * DieticianTeam Component
 * Follows diatecianLayout.jpeg:
 *   1. Hero      — name/credentials + intro on the left, portrait on the right
 *   2. Team      — intro band with the team behind the practice
 *   3. Star      — star of the month: employee intro + patient story video
 *   4. CTA       — closing band
 *
 * PLACEHOLDER CONTENT. Every name, credential, quote and stat below is a stand-in
 * so the layout can be reviewed — replace the four data blocks with the real
 * details and the page updates itself. Photo and video frames are marked too.
 */

// The team section is hidden for now — the markup and data below are kept intact,
// so flipping this to true brings the whole section back.
const SHOW_TEAM_SECTION = false;

const LEAD_DIETICIAN = {
  name: 'Dr. [Lead Dietician Name]',
  title: 'Head of Clinical Nutrition',
  credentials: ['RD, Registered Dietician', 'M.Sc. Clinical Nutrition', '[N]+ years in practice'],
  intro:
    'Placeholder bio — two or three sentences on how the lead dietician approaches clinical nutrition, the conditions they specialise in, and what a patient can expect from their first consultation.',
  philosophy:
    '"Placeholder quote — the one belief that guides how this kitchen treats food as therapy."',
};

const CREDENTIAL_ICONS = [GraduationCap, Award, HeartPulse];

const TEAM_STATS = [
  { value: '[N]+', label: 'In-house dieticians' },
  { value: '[N]+', label: 'Patients guided' },
  { value: '[N]', label: 'Conditions covered' },
];

const TEAM_MEMBERS = [
  { name: '[Team Member One]', role: 'Clinical Dietician', focus: 'Diabetes & metabolic health' },
  { name: '[Team Member Two]', role: 'Clinical Dietician', focus: 'PCOD & hormonal nutrition' },
  { name: '[Team Member Three]', role: 'Therapeutic Chef', focus: 'Recipe & meal development' },
  { name: '[Team Member Four]', role: 'Nutrition Counsellor', focus: 'Gut health & follow-up care' },
];

const STAR_OF_THE_MONTH = {
  month: '[Month Year]',
  name: '[Star Performer Name]',
  role: 'Clinical Dietician',
  tenure: '[N] years with Robust Kitchen',
  story:
    'Placeholder story — a short paragraph on why this team member was chosen this month: the patients they supported, the outcome they helped achieve, and what their colleagues say about working with them.',
  highlights: ['[Highlight one]', '[Highlight two]', '[Highlight three]'],
  patientStory: {
    title: 'Patient story — health improved through nutrition',
    caption:
      'Video placeholder — a patient describing how their health changed on a dietician-designed plan. 60–90 sec · 16:9 · subtitles on.',
  },
};

function SectionEyebrow({ children, tone = 'rose' }) {
  const color = tone === 'yellow' ? 'text-hero-yellow' : 'text-hero-rose';
  return (
    <span className={`font-jetbrains-mono text-xs uppercase tracking-[0.3em] ${color} block mb-3`}>
      {children}
    </span>
  );
}

export default function DieticianTeam() {
  return (
    <>
      {/* ---------- 1. Hero: credentials + intro left, portrait right ---------- */}
      <section className="relative overflow-hidden bg-hero-ivory py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(240,120,108,0.10),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(252,228,84,0.16),transparent_32%)]"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-stretch">
            {/* Left column — small credentials card above, larger intro card below */}
            <div className="flex flex-col gap-6">
              <div
                className="bg-white rounded-2xl border border-hero-border p-7 shadow-sm animate-fade-in-up"
                style={{ animationFillMode: 'both' }}
              >
                <div className="inline-flex items-center gap-2 bg-hero-coral/12 border border-hero-coral/35 text-hero-coral text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Meet Your Dietician
                </div>

                <h1 className="font-cormorant-garamond text-4xl md:text-5xl font-bold text-hero-ink leading-tight mb-2">
                  {LEAD_DIETICIAN.name}
                </h1>
                <p className="text-hero-coral font-semibold mb-5">{LEAD_DIETICIAN.title}</p>

                <ul className="flex flex-col gap-2.5">
                  {LEAD_DIETICIAN.credentials.map((credential, index) => {
                    const Icon = CREDENTIAL_ICONS[index % CREDENTIAL_ICONS.length];
                    return (
                      <li key={credential} className="flex items-center gap-2.5 text-sm text-muted">
                        <Icon className="w-4 h-4 text-hero-coral shrink-0" strokeWidth={1.9} />
                        {credential}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div
                className="bg-white rounded-2xl border border-hero-border p-7 shadow-sm grow animate-fade-in-up"
                style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
              >
                <p className="text-muted leading-relaxed mb-6">{LEAD_DIETICIAN.intro}</p>

                <div className="border-l-4 border-hero-yellow pl-4">
                  <Quote className="w-5 h-5 text-hero-yellow mb-2" strokeWidth={2} />
                  <p className="font-cormorant-garamond text-xl text-hero-ink leading-snug italic">
                    {LEAD_DIETICIAN.philosophy}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — tall portrait */}
            <div
              className="animate-fade-in-up min-h-[420px] lg:min-h-full"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <div className="h-full rounded-2xl border-2 border-dashed border-hero-coral/40 bg-gradient-to-br from-cream to-light flex flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                  <Stethoscope className="w-10 h-10 text-hero-coral" strokeWidth={1.6} />
                </div>
                <div className="font-jetbrains-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Portrait photo
                </div>
                <p className="text-xs text-muted/80 leading-relaxed max-w-[15rem]">
                  Vertical portrait of the lead dietician · roughly 3:4 · natural light
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. Team intro (hidden — see SHOW_TEAM_SECTION) ---------- */}
      {SHOW_TEAM_SECTION && (
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="bg-white rounded-2xl border border-hero-border shadow-sm px-8 py-10 text-center">
            <SectionEyebrow>The Team</SectionEyebrow>
            <h2 className="font-cormorant-garamond text-3xl md:text-4xl font-bold text-dk leading-tight mb-4">
              Dieticians, Chefs and Counsellors — Under One Roof.
            </h2>
            <p className="text-muted leading-relaxed max-w-3xl mx-auto">
              Placeholder team intro — a short paragraph describing how the clinical team works
              together, what each discipline contributes, and why having dieticians and chefs in the
              same kitchen changes the food that reaches a patient.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-9 max-w-2xl mx-auto">
              {TEAM_STATS.map((stat) => (
                <div key={stat.label} className="bg-cream rounded-xl px-4 py-5">
                  <div className="font-cormorant-garamond text-3xl font-bold text-hero-coral mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-hero-border p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'both' }}
              >
                <div className="w-16 h-16 rounded-full bg-hero-coral/12 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-hero-coral" strokeWidth={1.7} />
                </div>
                <h3 className="font-cormorant-garamond text-xl font-bold text-dk mb-1">
                  {member.name}
                </h3>
                <p className="text-hero-coral text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-muted text-sm leading-relaxed">{member.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ---------- 3. Star of the month ---------- */}
      <section className="bg-dk py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-hero-coral/10 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-hero-yellow/10 -mb-20"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div className="text-center mb-12">
            <SectionEyebrow tone="yellow">Star of the Month · {STAR_OF_THE_MONTH.month}</SectionEyebrow>
            <h2 className="font-cormorant-garamond text-3xl md:text-4xl font-bold text-cream leading-tight">
              Star of the Month — and Their Story.
            </h2>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 items-stretch">
            {/* Employee intro — the smaller left box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col">
              <div className="w-20 h-20 rounded-full bg-hero-yellow/15 flex items-center justify-center mb-5">
                <Sparkles className="w-9 h-9 text-hero-yellow" strokeWidth={1.7} />
              </div>

              <h3 className="font-cormorant-garamond text-2xl font-bold text-cream mb-1">
                {STAR_OF_THE_MONTH.name}
              </h3>
              <p className="text-hero-yellow text-sm font-semibold mb-1">{STAR_OF_THE_MONTH.role}</p>
              <p className="text-light/50 text-xs mb-5">{STAR_OF_THE_MONTH.tenure}</p>

              <p className="text-light/75 text-sm leading-relaxed mb-6">{STAR_OF_THE_MONTH.story}</p>

              <ul className="mt-auto flex flex-col gap-2">
                {STAR_OF_THE_MONTH.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-light/70">
                    <Award className="w-4 h-4 text-hero-yellow shrink-0 mt-0.5" strokeWidth={1.9} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Patient video — the larger right box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col">
              <h3 className="text-cream font-semibold mb-4">{STAR_OF_THE_MONTH.patientStory.title}</h3>

              <div className="grow rounded-xl border-2 border-dashed border-hero-yellow/40 bg-white/5 flex flex-col items-center justify-center gap-3 p-8 text-center min-h-[280px]">
                <div className="w-16 h-16 rounded-full bg-hero-yellow/15 flex items-center justify-center">
                  <Play className="w-8 h-8 text-hero-yellow" strokeWidth={1.8} />
                </div>
                <div className="font-jetbrains-mono text-[11px] uppercase tracking-[0.2em] text-hero-yellow">
                  Video placeholder
                </div>
                <p className="text-light/60 text-xs leading-relaxed max-w-sm">
                  {STAR_OF_THE_MONTH.patientStory.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 4. Closing CTA ---------- */}
      <section className="bg-offwhite py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="rounded-3xl bg-gradient-to-br from-hero-coral to-hero-yellow p-[2px]">
            <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className="font-cormorant-garamond text-3xl md:text-4xl font-bold text-dk mb-3">
                  Share Your Journey
                </h2>
                <p className="text-muted leading-relaxed max-w-xl">
                  Has nutrition changed something for you? Tell our dieticians what shifted — your
                  story could be the one that helps someone else start theirs.
                </p>
              </div>

              <Link
                href={buildContactHref('story')}
                className="inline-flex items-center gap-2 shrink-0 bg-dk text-cream font-bold text-sm px-8 py-4 rounded-lg transition-all hover:bg-hero-coral hover:text-white hover:scale-105 active:scale-95 transform"
              >
                <Heart className="w-4 h-4" />
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
