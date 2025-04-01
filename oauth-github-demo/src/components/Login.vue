<template>
  <div class="login">
    <h1>GitHub OAuth PKCE Login Demo</h1>
    <button @click="loginWithKeycloak">Login with Keycloak</button>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import pkceChallenge from "pkce-challenge";

export default defineComponent({
  name: "LoginPKCE",
  setup() {
    // GitHub OAuth configuration
    const clientId = "Ov23li8UwlxVAIOjBuUV";
    const redirectUri = "http://localhost:5173/success";
    const authorizationEndpoint = "http://localhost:8080/realms/Demo/protocol/openid-connect/auth";
    const scopes = "openid email profile";


    /**
     * Handle the Authorization code login flow.
     */
    const loginWithKeycloak
        = async () => {

      // Step 1: Generate PKCE code verifier and challenge
      const challenge = await pkceChallenge();

      // Save the code verifier to session storage for later use
      sessionStorage.setItem("pkce_code_verifier", challenge.code_verifier);

      // Step 2: Redirect user to GitHub's authorization endpoint
      const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          redirectUri
      )}&scope=${encodeURIComponent(scopes)}&response_type=code&code_challenge=${challenge.code_challenge}&code_challenge_method=S256`;
      window.location.href = authUrl;
    };

    return {
      loginWithKeycloak,
    };
  },
});
</script>

<style scoped>
button {
  background-color: #24292e;
  color: #ffffff;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #444d56;
}
</style>