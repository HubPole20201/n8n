export type SdLabsTool = {
	credits: number;
	method: 'GET' | 'POST';
	path: string;
	slug: string;
	summary: string;
};

export type SdLabsModule = {
	name: string;
	displayName: string;
	description: string;
	aliases: string[];
	tools: SdLabsTool[];
};

const t = (
	slug: string,
	summary: string,
	path: string,
	credits = 1,
	method: 'GET' | 'POST' = 'POST',
): SdLabsTool => ({ slug, summary, path, credits, method });

export const SD_LABS_MODULES: SdLabsModule[] = [
	{
		name: 'sdLabsEmailTools',
		displayName: 'SD Labs Email Tools',
		description: 'Score subjects, rewrite cold email, and run other Sales-IO email tools',
		aliases: ['email tools', 'subject line', 'cold email'],
		tools: [
			t(
				'subject-line-scorer',
				'AI rates your email subject line from 1–10',
				'/email-tools/subject-line-scorer',
			),
			t(
				'email-spam-checker',
				'Test if your email hits spam filters before sending',
				'/email-tools/email-spam-checker',
			),
			t(
				'cold-email-rewriter',
				'AI rewrites cold emails for higher replies',
				'/email-tools/cold-email-rewriter',
			),
			t(
				'follow-up-generator',
				'Generate a follow-up sequence from any email',
				'/email-tools/follow-up-generator',
			),
			t(
				'email-personalizer',
				'Add custom variables to bulk email campaigns',
				'/email-tools/email-personalizer',
			),
			t(
				'preview-text-generator',
				'Write perfect email snippet/preview text',
				'/email-tools/preview-text-generator',
			),
			t(
				'unsubscribe-analyzer',
				'Find which emails caused unsubscribes',
				'/email-tools/unsubscribe-analyzer',
			),
			t(
				'send-time-optimizer',
				'Best send time recommendations by industry',
				'/email-tools/send-time-optimizer',
			),
			t(
				'email-to-linkedin-matcher',
				'Match email list to LinkedIn profiles',
				'/email-tools/email-to-linkedin-matcher',
			),
			t(
				'plain-text-converter',
				'Convert HTML emails to clean plain text',
				'/email-tools/plain-text-converter',
			),
			t(
				'email-signature-builder',
				'Professional email signature generator',
				'/email-tools/email-signature-builder',
			),
			t(
				'bounce-categorizer',
				'Split and categorize soft vs hard bounces',
				'/email-tools/bounce-categorizer',
			),
			t(
				'cold-email-ab-tester',
				'Compare 2 email versions and predict opens',
				'/email-tools/cold-email-ab-tester',
			),
		],
	},
	{
		name: 'sdLabsDataCleaning',
		displayName: 'SD Labs Data Cleaning',
		description: 'Normalize names, phones, emails, and filter bad leads',
		aliases: ['data cleaning', 'dedupe', 'formatter'],
		tools: [
			t(
				'email-syntax-checker',
				'Fix malformed emails in bulk upload',
				'/data-cleaning/email-syntax-checker',
			),
			t(
				'duplicate-remover',
				'Remove duplicate leads from a row list',
				'/data-cleaning/duplicate-remover',
			),
			t('name-formatter', 'Standardize first/last name formats', '/data-cleaning/name-formatter'),
			t('phone-formatter', 'Format phone numbers to E.164', '/data-cleaning/phone-formatter'),
			t(
				'company-name-normalizer',
				'Clean Inc/Ltd/LLC naming variants',
				'/data-cleaning/company-name-normalizer',
			),
			t(
				'blacklist-filter',
				'Remove emails on suppression/unsubscribe list',
				'/data-cleaning/blacklist-filter',
			),
			t(
				'disposable-email-detector',
				'Flag temp/throwaway email addresses',
				'/data-cleaning/disposable-email-detector',
			),
			t(
				'csv-column-mapper',
				'Auto-map and rename messy CSV headers',
				'/data-cleaning/csv-column-mapper',
			),
			t(
				'spam-word-remover',
				'Remove leads with spam-flagged domains',
				'/data-cleaning/spam-word-remover',
			),
			t(
				'role-based-email-filter',
				'Remove info@, support@, admin@ and similar role emails',
				'/data-cleaning/role-based-email-filter',
			),
		],
	},
	{
		name: 'sdLabsLinkedinTools',
		displayName: 'SD Labs LinkedIn Tools',
		description: 'Scrape profiles, companies, posts, and convert LinkedIn URLs to email',
		aliases: ['linkedin', 'profile scraper'],
		tools: [
			t(
				'profile-scraper',
				'Extract profiles from any LinkedIn search',
				'/linkedin-tools/profile-scraper',
			),
			t(
				'company-scraper',
				'Scrape employees of any target company',
				'/linkedin-tools/company-scraper',
			),
			t(
				'connection-exporter',
				'Export 1st degree connections to CSV',
				'/linkedin-tools/connection-exporter',
			),
			t('post-scraper', 'Scrape all engagers on any LinkedIn post', '/linkedin-tools/post-scraper'),
			t(
				'message-personalizer',
				'AI-write personalized connection requests',
				'/linkedin-tools/message-personalizer',
			),
			t(
				'poll-voter-tracker',
				'See who voted on your LinkedIn polls',
				'/linkedin-tools/poll-voter-tracker',
			),
			t(
				'skills-extractor',
				'Bulk extract skills from multiple profiles',
				'/linkedin-tools/skills-extractor',
			),
			t(
				'job-scraper',
				'Scrape job postings by keyword and location',
				'/linkedin-tools/job-scraper',
			),
			t(
				'group-member-scraper',
				'Extract member data from any group',
				'/linkedin-tools/group-member-scraper',
			),
			t(
				'linkedin-url-to-email',
				'Convert LinkedIn profile URL to work email',
				'/linkedin-tools/linkedin-url-to-email',
			),
		],
	},
	{
		name: 'sdLabsCopyContentAi',
		displayName: 'SD Labs Copy & Content AI',
		description: 'Generate DMs, posts, bios, CTAs, and other sales copy',
		aliases: ['copy', 'content ai', 'linkedin post'],
		tools: [
			t(
				'cold-dm-writer',
				'AI-written LinkedIn and Twitter DMs that convert',
				'/copy-content-ai/cold-dm-writer',
			),
			t(
				'pitch-deck-summarizer',
				'Summarize any pitch deck into 3 bullet points',
				'/copy-content-ai/pitch-deck-summarizer',
			),
			t(
				'case-study-generator',
				'Turn bullet points into a polished case study',
				'/copy-content-ai/case-study-generator',
			),
			t(
				'testimonial-rewriter',
				'Polish rough client testimonials professionally',
				'/copy-content-ai/testimonial-rewriter',
			),
			t(
				'linkedin-post-generator',
				'Write viral-style posts from a topic or idea',
				'/copy-content-ai/linkedin-post-generator',
			),
			t(
				'bio-writer',
				'Write professional bios from a resume or summary',
				'/copy-content-ai/bio-writer',
			),
			t(
				'objection-handler',
				"AI crafts smart responses to 'not interested' replies",
				'/copy-content-ai/objection-handler',
			),
			t(
				'cta-generator',
				'Generate 10 call-to-action variants for any offer',
				'/copy-content-ai/cta-generator',
			),
			t(
				'value-prop-sharpener',
				'Sharpen vague value propositions into clear hooks',
				'/copy-content-ai/value-prop-sharpener',
			),
			t(
				'proposal-template-builder',
				'AI-fill a proposal template from a client brief',
				'/copy-content-ai/proposal-template-builder',
			),
		],
	},
	{
		name: 'sdLabsAnalyticsTracking',
		displayName: 'SD Labs Analytics & Tracking',
		description: 'UTM links, pixels, lead scoring, and campaign ROI',
		aliases: ['analytics', 'utm', 'lead scoring'],
		tools: [
			t(
				'utm-builder',
				'Build and manage UTM tracking links in bulk',
				'/analytics-tracking/utm-builder',
			),
			t(
				'link-click-tracker',
				'Trackable short links with full click analytics',
				'/analytics-tracking/link-click-tracker',
			),
			t(
				'email-open-tracker-pixel',
				'Drop-in tracking pixel for any email',
				'/analytics-tracking/email-open-tracker-pixel',
			),
			t(
				'campaign-roi-calculator',
				'Input your spend, output your ROI',
				'/analytics-tracking/campaign-roi-calculator',
			),
			t(
				'reply-rate-benchmarker',
				'Compare reply rate against industry average',
				'/analytics-tracking/reply-rate-benchmarker',
			),
			t(
				'lead-scoring-tool',
				'Score leads from 1–100 based on ICP fit',
				'/analytics-tracking/lead-scoring-tool',
			),
			t(
				'outreach-velocity-tracker',
				'Track how fast your team is reaching out',
				'/analytics-tracking/outreach-velocity-tracker',
			),
			t(
				'pipeline-value-estimator',
				'Estimate total pipeline value from a lead list',
				'/analytics-tracking/pipeline-value-estimator',
			),
		],
	},
	{
		name: 'sdLabsAgencyOps',
		displayName: 'SD Labs Agency Ops',
		description: 'Onboarding checklists, SOWs, invoices, and outreach plans',
		aliases: ['agency', 'sow', 'onboarding'],
		tools: [
			t(
				'client-onboarding-checklist',
				'Auto-generate onboarding checklist documents',
				'/agency-ops-tools/client-onboarding-checklist',
			),
			t(
				'sow-generator',
				'Draft a scope of work from a client brief',
				'/agency-ops-tools/sow-generator',
			),
			t(
				'invoice-template-builder',
				'Agency invoices with your own branding',
				'/agency-ops-tools/invoice-template-builder',
			),
			t(
				'meeting-agenda-generator',
				'AI-write structured meeting agendas from a topic',
				'/agency-ops-tools/meeting-agenda-generator',
			),
			t(
				'client-report-summarizer',
				'Turn raw data into client-ready reports',
				'/agency-ops-tools/client-report-summarizer',
			),
			t(
				'competitor-matrix-builder',
				'Side-by-side competitor comparison tables',
				'/agency-ops-tools/competitor-matrix-builder',
			),
			t(
				'pricing-page-analyzer',
				'Analyze and benchmark competitor pricing pages',
				'/agency-ops-tools/pricing-page-analyzer',
			),
			t(
				'agency-niche-finder',
				'Suggest underserved niches for agencies to target',
				'/agency-ops-tools/agency-niche-finder',
			),
			t(
				'cold-outreach-planner',
				'Full 30-day outreach strategy and plan builder',
				'/agency-ops-tools/cold-outreach-planner',
			),
		],
	},
	{
		name: 'sdLabsAutomationHelpers',
		displayName: 'SD Labs Automation Helpers',
		description: 'CSV/JSON converters, regex builder, webhooks, and data merge',
		aliases: ['automation', 'csv', 'json', 'regex', 'webhook'],
		tools: [
			t(
				'webhook-tester',
				'Test webhooks from any application or workflow',
				'/automation-helpers/webhook-tester',
			),
			t(
				'csv-to-json-converter',
				'Instantly convert between data formats',
				'/automation-helpers/csv-to-json-converter',
			),
			t(
				'json-formatter-validator',
				'Clean, format, and validate messy JSON payloads',
				'/automation-helpers/json-formatter-validator',
			),
			t(
				'api-response-parser',
				'Extract specific fields from any API response',
				'/automation-helpers/api-response-parser',
			),
			t(
				'cron-job-scheduler',
				'Schedule and manage recurring automations',
				'/automation-helpers/cron-job-scheduler',
			),
			t(
				'workflow-builder',
				'Simple trigger to action automation builder',
				'/automation-helpers/workflow-builder',
			),
			t(
				'data-merger-tool',
				'Merge 2 CSV files on a matching column key',
				'/automation-helpers/data-merger-tool',
			),
			t(
				'regex-builder',
				'AI writes regex patterns from plain English',
				'/automation-helpers/regex-builder',
			),
		],
	},
	{
		name: 'sdLabsWebDomainTools',
		displayName: 'SD Labs Web & Domain Tools',
		description: 'WHOIS, SSL, screenshots, tech detect, and page speed',
		aliases: ['whois', 'ssl', 'domain', 'screenshot'],
		tools: [
			t(
				'website-screenshot-tool',
				'Capture a full screenshot of any website URL',
				'/web-domain-tools/website-screenshot-tool',
			),
			t(
				'domain-availability-checker',
				'Check 50 domains at once for availability',
				'/web-domain-tools/domain-availability-checker',
			),
			t(
				'ssl-checker',
				'Verify SSL certificate validity of any domain',
				'/web-domain-tools/ssl-checker',
			),
			t(
				'whois-lookup',
				'Get domain ownership and registration details',
				'/web-domain-tools/whois-lookup',
			),
			t(
				'broken-link-checker',
				'Find all dead/broken links on any website',
				'/web-domain-tools/broken-link-checker',
			),
			t(
				'website-tech-detector',
				'Identify what CMS, tools and stack a site uses',
				'/web-domain-tools/website-tech-detector',
			),
			t(
				'page-speed-grader',
				'Speed score plus quick fix recommendations',
				'/web-domain-tools/page-speed-grader',
			),
		],
	},
	{
		name: 'sdLabsProspectIntelligence',
		displayName: 'SD Labs Prospect Intelligence',
		description: 'Hiring, funding, job-change, and review buying signals',
		aliases: ['prospect', 'intent', 'funding', 'hiring'],
		tools: [
			t(
				'hiring-signal-detector',
				'Find companies actively hiring — a key buying signal',
				'/prospect-intelligence/hiring-signal-detector',
			),
			t(
				'funding-alert-tool',
				'Companies who recently received funding',
				'/prospect-intelligence/funding-alert-tool',
			),
			t(
				'new-website-detector',
				'Companies with newly launched or redesigned sites',
				'/prospect-intelligence/new-website-detector',
			),
			t(
				'job-change-tracker',
				'Contacts who recently changed jobs or roles',
				'/prospect-intelligence/job-change-tracker',
			),
			t(
				'company-news-fetcher',
				'Pull latest news and press releases by company',
				'/prospect-intelligence/company-news-fetcher',
			),
			t(
				'g2-review-scraper',
				'Scrape competitor product reviews from G2',
				'/prospect-intelligence/g2-review-scraper',
			),
			t(
				'trustpilot-scraper',
				'Extract reviews and reviewer contact info',
				'/prospect-intelligence/trustpilot-scraper',
			),
			t(
				'glassdoor-signal',
				'Company growth or decline signals from reviews',
				'/prospect-intelligence/glassdoor-signal',
			),
			t(
				'domain-age-checker',
				"How old is a company's web domain",
				'/prospect-intelligence/domain-age-checker',
			),
			t(
				'social-media-presence-checker',
				'Check all active social profiles for a company',
				'/prospect-intelligence/social-media-presence-checker',
			),
		],
	},
	{
		name: 'sdLabsEnrichment',
		displayName: 'SD Labs Enrichment',
		description: 'Company, domain, email, phone, and LinkedIn enrichment',
		aliases: ['enrichment', 'company name', 'find email'],
		tools: [
			t('company-name-to-domain', 'Company name → domain(s)', '/enrichment/company-name-to-domain'),
			t('company-name-to-email', 'Company → key person email', '/enrichment/company-name-to-email'),
			t('company-name-to-logo', 'Company → logo URL', '/enrichment/company-name-to-logo'),
			t(
				'company-name-to-linkedin',
				'Company → LinkedIn company URL',
				'/enrichment/company-name-to-linkedin',
			),
			t('company-name-to-phone', 'Company → phone contacts', '/enrichment/company-name-to-phone'),
			t(
				'company-name-to-hq-address',
				'Company → HQ address',
				'/enrichment/company-name-to-hq-address',
			),
			t('company-name-to-industry', 'Company → industry', '/enrichment/company-name-to-industry'),
			t(
				'company-name-to-employee-count',
				'Company → employee count',
				'/enrichment/company-name-to-employee-count',
			),
			t('company-name-to-revenue', 'Company → revenue', '/enrichment/company-name-to-revenue'),
			t(
				'company-name-to-tech-stack',
				'Company → tech stack',
				'/enrichment/company-name-to-tech-stack',
			),
			t(
				'domain-to-company-info',
				'Domain → company profile bundle',
				'/enrichment/domain-to-company-info',
			),
			t(
				'email-to-full-name',
				'Email → full name via email-to-linkedin',
				'/enrichment/email-to-full-name',
			),
			t(
				'phone-to-owner-name',
				'Phone reverse lookup → owner name',
				'/enrichment/phone-to-owner-name',
			),
			t('linkedin-url-to-email', 'LinkedIn URL → email', '/enrichment/linkedin-url-to-email'),
			t(
				'name-company-email-guesser',
				'Name + domain/company → verified email guess',
				'/enrichment/name-company-email-guesser',
			),
		],
	},
	{
		name: 'sdLabsVerification',
		displayName: 'SD Labs Verification',
		description: 'Verify emails and find verified addresses by name + domain',
		aliases: ['verification', 'verify email'],
		tools: [
			t('verify-single', 'Verify a single email address', '/verification/verify-single', 5),
			t(
				'find-verified-email',
				'Find verified email for a person by name + domain',
				'/verification/find-verified-email',
				20,
			),
			t(
				'resolve-company-domains',
				'Resolve company names to domains in bulk',
				'/verification/resolve-company-domains',
				0,
			),
		],
	},
	{
		name: 'sdLabsEmailToLinkedin',
		displayName: 'SD Labs Email to LinkedIn',
		description: 'Resolve email addresses to LinkedIn profiles',
		aliases: ['email to linkedin', 'find linkedin'],
		tools: [
			t(
				'find-by-email',
				'Resolve a single email address to a LinkedIn profile',
				'/email-to-linkedin',
				2,
				'GET',
			),
			t('bulk', 'Resolve up to 100 emails to LinkedIn profiles', '/email-to-linkedin/bulk', 70),
		],
	},
];

export const SD_LABS_MODULE_BY_NAME = Object.fromEntries(
	SD_LABS_MODULES.map((mod) => [mod.name, mod]),
) as Record<string, SdLabsModule>;
