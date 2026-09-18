/**
 * Contact Subject Options
 * Single source of truth for the contact form's Subject dropdown, plus the
 * helpers other pages use to deep-link into the form with a subject preselected.
 */

export const CONTACT_SUBJECTS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'omad-tmad', label: 'OMAD & TMAD Subscription' },
  { value: 'orders', label: 'Order Support' },
  { value: 'product', label: 'Product Inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'story', label: 'Share Your Story' },
  { value: 'feedback', label: 'Feedback' },
];

export const CONTACT_SUBJECT_VALUES = CONTACT_SUBJECTS.map((option) => option.value);

/**
 * Look up the human-readable label for a subject value.
 * @param {string} value - Subject value, e.g. 'partnership'
 * @returns {string} - Matching label, or '' when the value is unknown
 */
export function getSubjectLabel(value) {
  return CONTACT_SUBJECTS.find((option) => option.value === value)?.label || '';
}

/**
 * Build a link into the contact form with a subject (and optionally a product)
 * preselected, e.g. buildContactHref('product', 'Energy Bar').
 * @param {string} subject - One of CONTACT_SUBJECT_VALUES
 * @param {string} [product] - Product name, for product enquiries
 * @returns {string} - Relative URL for the contact page
 */
export function buildContactHref(subject, product) {
  const params = new URLSearchParams({ subject });

  if (product) {
    params.set('product', product);
  }

  return `/contact?${params.toString()}`;
}

/**
 * Starter text for the message box, so a visitor arriving from a CTA does not
 * face an empty field and we can see which CTA they came from.
 * @param {string} subject - One of CONTACT_SUBJECT_VALUES
 * @param {string} [product] - Product name, for product enquiries
 * @returns {string} - Prefilled message, or '' when there is nothing useful to say
 */
export function getPrefilledMessage(subject, product) {
  if (subject === 'product') {
    return product
      ? `Hi Robust Kitchen team, I'm interested in the ${product}. Please notify me when it launches.`
      : 'Hi Robust Kitchen team, I would like early access and launch updates for your upcoming product range. Please add me to the list.';
  }

  if (subject === 'partnership') {
    return 'Hi Robust Kitchen team, I would like to explore a partnership. Here is a little about my organisation and what I have in mind:';
  }

  if (subject === 'story') {
    return 'Hi Robust Kitchen team, I would like to share my health journey. Here is what changed for me, and how your nutrition plan helped:';
  }

  if (subject === 'omad-tmad') {
    return 'Hi Robust Kitchen team, I would like to know more about the OMAD & TMAD subscription — plans, pricing and how to get started.';
  }

  return '';
}
