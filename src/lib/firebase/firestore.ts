const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1';

/**
 * Thrown when NEXT_PUBLIC_FIREBASE_PROJECT_ID / NEXT_PUBLIC_FIREBASE_API_KEY
 * aren't set, so callers can distinguish "not configured yet" from a real
 * Firestore failure.
 */
export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super('Firebase is not configured (missing NEXT_PUBLIC_FIREBASE_PROJECT_ID / NEXT_PUBLIC_FIREBASE_API_KEY).');
    this.name = 'FirebaseNotConfiguredError';
  }
}

function getConfig() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return null;
  return { projectId, apiKey };
}

/**
 * Sets `unsubscribed = 1` (plus an `unsubscribedAt` timestamp) on an
 * existing document in the `leads` collection.
 *
 * This project's Firebase service-account key creation is blocked by a GCP
 * organization policy (`iam.disableServiceAccountKeyCreation`), so this
 * uses the Firestore REST API with the public web app config instead of the
 * Admin SDK. The public API key is NOT a secret — access is scoped entirely
 * by the Firestore Security Rules deployed for the `leads` collection (see
 * /firestore.rules), which only allow an unauthenticated request to flip
 * these two fields on a document that already exists.
 *
 * Returns 'updated' on success, or 'not_found' if the lead doc doesn't
 * exist (treated as a silent no-op by the caller). Throws on any other
 * failure — including a rules rejection, which usually means the rules in
 * /firestore.rules haven't been published yet.
 */
export async function markLeadUnsubscribed(leadId: string): Promise<'updated' | 'not_found'> {
  const config = getConfig();
  if (!config) {
    throw new FirebaseNotConfiguredError();
  }

  const url =
    `${FIRESTORE_BASE}/projects/${config.projectId}/databases/(default)/documents/leads/${encodeURIComponent(leadId)}` +
    `?updateMask.fieldPaths=unsubscribed&updateMask.fieldPaths=unsubscribedAt` +
    `&currentDocument.exists=true&key=${config.apiKey}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      fields: {
        unsubscribed: { integerValue: '1' },
        // Stamped by this server, not a Firestore serverTimestamp() sentinel
        // (the simple REST patch endpoint doesn't support field transforms).
        unsubscribedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });

  if (res.ok) return 'updated';

  const body: { error?: { status?: string; message?: string } } | null = await res.json().catch(() => null);
  const status = body?.error?.status;

  // The doc not existing surfaces as FAILED_PRECONDITION (from
  // currentDocument.exists=true) or occasionally NOT_FOUND.
  if (status === 'FAILED_PRECONDITION' || status === 'NOT_FOUND' || res.status === 404) {
    return 'not_found';
  }

  throw new Error(`Firestore REST update failed (${res.status} ${status ?? 'unknown'}): ${body?.error?.message ?? 'no details'}`);
}
