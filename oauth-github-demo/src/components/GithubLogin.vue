<template>
  <div class="github-login">
    <h1>GitHub OAuth PKCE Login Demo</h1>
    <button @click="loginWithGitHub">Login with GitHub</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GitHubLoginPKCE",
  setup() {
    // GitHub OAuth configuration
    const clientId = "Ov23li8UwlxVAIOjBuUV";
    const redirectUri = "http://localhost:5173/success";
    const authorizationEndpoint = "https://github.com/login/oauth/authorize";
    const scopes = "read:user user:email";

    /**
     * Generate a random string to serve as the code verifier (PKCE mechanism).
     */
    const generateCodeVerifier = () => {
      const array = new Uint32Array(56);
      crypto.getRandomValues(array);
      return Array.from(array, (num) => num.toString(36)).join("");
    };

    /**
     * Create a base64-encoded SHA256 hash of the code verifier.
     */
    const generateCodeChallenge = async (codeVerifier) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return btoa(
          hashArray.map((byte) => String.fromCharCode(byte)).join("")
      )
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
    };

    /**
     * Handle the GitHub login flow.
     */
    const loginWithGitHub = async () => {
      // Step 1: Generate PKCE code verifier and challenge
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Save the code verifier to session storage for later use
      sessionStorage.setItem("pkce_code_verifier", codeVerifier);

      // Step 2: Redirect user to GitHub's authorization endpoint
      const authUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          redirectUri
      )}&scope=${encodeURIComponent(scopes)}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`;
      window.location.href = authUrl;
    };

    return {
      loginWithGitHub,
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