/**
 * Used until the API has answered, and when it cannot; the API validates
 * every password anyway, so a stale bound only affects the hint.
 */
const FALLBACK_POLICY: PasswordPolicyData = { min_length: 14, max_length: 128 };

/**
 * The password length the API enforces, read from `GET /api/v1/password-policy`
 * (`{ data: { min_length, max_length } }`) so it is never hard-coded. Until it
 * answers, the fallback applies. Only the length can be checked while someone
 * types: the breach, common-password and name checks run on the server and
 * come back as validation errors on submit.
 *
 * Fetched once per session and shared through `useState`.
 */
export function usePasswordPolicy() {
  const { client } = useAuth();

  const policy = useState<PasswordPolicyData>(
    'passwordPolicy',
    () => FALLBACK_POLICY,
  );
  const requested = useState('passwordPolicyRequested', () => false);

  if (!requested.value) {
    requested.value = true;

    client<{ data: PasswordPolicyData }>('/api/v1/password-policy')
      .then(({ data }) => {
        policy.value = {
          min_length: data.min_length,
          max_length: data.max_length,
        };
      })
      .catch((error) => {
        console.info(error);
        // Let the next form that asks try again.
        requested.value = false;
      });
  }

  const minLength = computed(() => policy.value.min_length);
  const maxLength = computed(() => policy.value.max_length);

  return {
    minLength,
    maxLength,
  };
}
