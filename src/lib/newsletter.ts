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
//
// The `umbrella` entry is not an engine: it's "Practical Math for
// Makers", the cross-site maker newsletter (the DoughMatrix / Saponis /
// MicroRadicle audience under one list), approved by Brad 2026-10-20.
// It resolves through the same newsletterActionUrl path as the engine
// forms; its ID gets pasted here once the Kit form is created.

export const NEWSLETTER_FORMS: Record<string, string> = {
  pizza: "9950600",
  bagel: "9950607",
  enriched: "9950613",
  umbrella: "10079829",
};

// NEWSLETTER_FORMS key for the umbrella "Practical Math for Makers" list.
export const UMBRELLA_FORM_KEY = "umbrella";

export function newsletterActionUrl(engineId: string): string | null {
  const formId = NEWSLETTER_FORMS[engineId]?.trim();
  if (!formId) return null;
  return `https://app.kit.com/forms/${formId}/subscriptions`;
}

export function umbrellaActionUrl(): string | null {
  return newsletterActionUrl(UMBRELLA_FORM_KEY);
}
