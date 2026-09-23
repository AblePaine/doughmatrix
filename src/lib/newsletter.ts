// Newsletter / launch-notify signup configuration.
//
// Each upcoming engine gets its own Kit (ConvertKit) form so signups are
// tagged per engine. To wire this up:
//   1. Create a free Kit account at https://kit.com
//   2. Create one form per engine below (Forms -> Create form -> Inline)
//   3. Paste each form's ID here (it's the number in the form's embed URL:
//      https://app.kit.com/forms/<THIS_NUMBER>/subscriptions)
//
// Form IDs are public (they appear in every Kit embed code), so keeping
// them in the repo is fine. Leave an entry empty to keep showing the
// plain "Coming soon" line for that engine.

export const NEWSLETTER_FORMS: Record<string, string> = {
  pizza: "9950600",
  bagel: "9950607",
  enriched: "9950613",
};

export function newsletterActionUrl(engineId: string): string | null {
  const formId = NEWSLETTER_FORMS[engineId]?.trim();
  if (!formId) return null;
  return `https://app.kit.com/forms/${formId}/subscriptions`;
}
