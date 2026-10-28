// The playground shows the recovery codes as the Cardan Academy API does:
// only when they are created. The MFA demo on /auth switches it off and on.
export default defineAppConfig({
  cardanAuth: {
    recoveryCodesOnlyAtSetup: true,
  },
});
