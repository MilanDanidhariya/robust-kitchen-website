'use client';

import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CONTACT_SUBJECTS,
  CONTACT_SUBJECT_VALUES,
  getPrefilledMessage,
} from '@/utils/contactSubjects';

/**
 * ContactForm Component
 * Validated contact form that posts to FormSubmit.
 *
 * Deep links preselect the subject and prefill the message, e.g.
 *   /contact?subject=partnership
 *   /contact?subject=product&product=Energy%20Bar
 *
 * Uses useSearchParams, so the caller must wrap it in a <Suspense> boundary.
 */

// FormSubmit delivers submissions straight to this inbox — no backend required.
// Swap in the masked endpoint (https://formsubmit.co/ajax/<token>) once FormSubmit
// emails the activation link, so the address is not exposed in the page source.
const FORMSUBMIT_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ENDPOINT ||
  'https://formsubmit.co/ajax/milandanidhariya777@gmail.com';

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

const LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 80,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 2000,
  PHONE_DIGITS_MIN: 7,
  PHONE_DIGITS_MAX: 15,
};

// Deliberately permissive: catches typos like "a@b" or a missing dot without
// rejecting the many legitimately odd real-world addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[+()\d\s-]+$/;

/**
 * Validate a single field.
 * @param {string} field - Field name
 * @param {string} value - Current value
 * @returns {string} - Error message, or '' when the field is valid
 */
export function validateField(field, value) {
  const trimmed = (value || '').trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Please enter your full name.';
      if (trimmed.length < LIMITS.NAME_MIN) return 'Your name looks too short.';
      if (trimmed.length > LIMITS.NAME_MAX) return `Please keep your name under ${LIMITS.NAME_MAX} characters.`;
      return '';

    case 'email':
      if (!trimmed) return 'Please enter your email address.';
      if (!EMAIL_PATTERN.test(trimmed)) return 'That does not look like a valid email address.';
      return '';

    case 'phone': {
      if (!trimmed) return 'Please enter your mobile number.';
      if (!PHONE_PATTERN.test(trimmed)) return 'Phone numbers can only contain digits, spaces, +, - and ().';
      const digits = trimmed.replace(/\D/g, '').length;
      if (digits < LIMITS.PHONE_DIGITS_MIN || digits > LIMITS.PHONE_DIGITS_MAX) {
        return 'Please enter a valid phone number.';
      }
      return '';
    }

    case 'subject':
      if (!trimmed) return 'Please choose a subject.';
      return '';

    case 'message':
      if (!trimmed) return 'Please tell us how we can help.';
      if (trimmed.length < LIMITS.MESSAGE_MIN) return `Please write at least ${LIMITS.MESSAGE_MIN} characters.`;
      if (trimmed.length > LIMITS.MESSAGE_MAX) return `Please keep your message under ${LIMITS.MESSAGE_MAX} characters.`;
      return '';

    default:
      return '';
  }
}

/**
 * Validate every field at once.
 * @param {object} values - Current form values
 * @returns {object} - Map of field name to error message, for invalid fields only
 */
export function validateAll(values) {
  return Object.keys(EMPTY_FORM).reduce((errors, field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
    return errors;
  }, {});
}

const FIELD_ORDER = ['name', 'email', 'phone', 'subject', 'message'];

const baseFieldClass =
  'w-full px-4 py-3 border rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors';

function fieldClass(hasError) {
  return `${baseFieldClass} ${
    hasError
      ? 'border-red-500 focus:ring-red-400'
      : 'border-gray-300 focus:ring-lime'
  }`;
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get('subject') || '';
  const productParam = searchParams.get('product') || '';
  const presetSubject = CONTACT_SUBJECT_VALUES.includes(subjectParam) ? subjectParam : '';

  const [formData, setFormData] = useState(() => ({
    ...EMPTY_FORM,
    subject: presetSubject,
    message: getPrefilledMessage(presetSubject, productParam),
  }));
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Only correct an error the user has already been shown — don't nag mid-typing.
    if (touched[name] || errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const nextErrors = validateAll(formData);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      // Send focus to the first problem so keyboard users are not left hunting.
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          ...(productParam ? { product: productParam } : {}),
          _subject: `Robust Kitchen enquiry — ${formData.subject || 'General'}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === 'false') {
        throw new Error(result.message || `Submission failed (${response.status})`);
      }

      setStatus('sent');
      setFormData(EMPTY_FORM);
      setErrors({});
      setTouched({});
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message === 'Failed to fetch'
          ? 'We could not reach the mail service. Please check your connection and try again.'
          : error.message
      );
    }
  };

  const showError = (field) => (touched[field] && errors[field]) || '';

  const errorFor = (field) => {
    const message = showError(field);
    if (!message) return null;

    return (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-red-600">
        {message}
      </p>
    );
  };

  const a11yProps = (field) => ({
    'aria-invalid': showError(field) ? 'true' : 'false',
    'aria-describedby': showError(field) ? `${field}-error` : undefined,
  });

  return (
    <div>
      <h2 className="text-3xl font-cormorant font-bold text-dk mb-8">Send us a Message</h2>
      {/* noValidate: we show our own messages instead of the browser's native bubbles */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass(showError('name'))}
              placeholder="Your full name"
              {...a11yProps('name')}
            />
            {errorFor('name')}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass(showError('email'))}
              placeholder="your@email.com"
              {...a11yProps('email')}
            />
            {errorFor('email')}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass(showError('phone'))}
              placeholder="+91 XXXXX XXXXX"
              {...a11yProps('phone')}
            />
            {errorFor('phone')}
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass(showError('subject'))}
              {...a11yProps('subject')}
            >
              <option value="">Select a subject</option>
              {CONTACT_SUBJECTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errorFor('subject')}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={LIMITS.MESSAGE_MAX}
            className={fieldClass(showError('message'))}
            placeholder="Tell us how we can help you..."
            {...a11yProps('message')}
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <div>{errorFor('message')}</div>
            <span className="shrink-0 text-xs text-gray-500">
              {formData.message.length}/{LIMITS.MESSAGE_MAX}
            </span>
          </div>
        </div>

        {/* Honeypot — bots fill this in, humans never see it */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-lime text-white py-3 px-6 rounded-lg font-semibold hover:bg-lime/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>

        <div aria-live="polite" role="status">
          {status === 'sent' && (
            <p className="rounded-lg border border-lime/40 bg-lime/10 px-4 py-3 text-sm text-dk">
              Thank you for your message! We&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="rounded-lg border border-rust/40 bg-rust/10 px-4 py-3 text-sm text-dk">
              Sorry, your message could not be sent. {errorMessage} You can also reach
              us directly at{' '}
              <a href="mailto:eatrobust@gmail.com" className="font-semibold underline">
                eatrobust@gmail.com
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
