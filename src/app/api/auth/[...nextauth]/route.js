import NextAuth from "next-auth";

const provider = {
  id: "affinidi",
  name: "Affinidi",
  clientId: process.env.AFFINIDI_CLIENT_ID,
  clientSecret: process.env.AFFINIDI_CLIENT_SECRET,
  type: "oauth",
  wellKnown: `${process.env.AFFINIDI_ISSUER}/.well-known/openid-configuration`,
  authorization: {
    params: {
      prompt: "login",
      scope: "openid offline_access",
    },
  },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  idToken: true,
  profile(profile) {
    // console.log("afff profile", profile);
    const profileItems = profile?.custom;

    const country = profileItems.find(
      (item) => typeof item.country === "string"
    )?.country;
    const address = profileItems.find(
      (item) => typeof item.streetAddress === "string"
    )?.streetAddress;
    const gender = profileItems.find(
      (item) => typeof item.gender === "string"
    )?.gender;
    console.log(country, address, gender);
    return {
      id: profile.sub,
      email: profile.custom?.find((i) => typeof i.email === "string")?.email,
      address: address,
      // country: country,
      // gender: gender,
      name: profile.custom?.find((i) => typeof i.givenName === "string")
        ?.givenName,
    };
  },
};
export const authOptions = {
  // debug: true,
  providers: [provider],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return `${baseUrl}/menu/dashboard`;
    // },
    async jwt({ token, account, profile }) {
      const profileItems = profile?.custom;
      console.log("profile", profileItems);
      if (profile && profileItems) {
        let userDID;
        let user = {};
        userDID = profileItems.find(
          (item) => typeof item.did === "string"
        )?.did;
        user.email = profileItems.find(
          (item) => typeof item.email === "string"
        )?.email;
        user.country = profileItems.find(
          (item) => typeof item.country === "string"
        )?.country;
        user.gender = profileItems.find(
          (item) => typeof item.gender === "string"
        )?.gender;
        user.surname = profileItems.find(
          (item) => typeof item.familyName === "string"
        )?.familyName;
        user.city = profileItems.find(
          (item) => typeof item.locality === "string"
        )?.locality;
        user.postalCode = profileItems.find(
          (item) => typeof item.postalCode === "string"
        )?.postalCode;
        user.number = profileItems.find(
          (item) => typeof item.phoneNumber === "string"
        )?.phoneNumber;
        user.address = profileItems.find(
          (item) => typeof item.streetAddress === "string"
        )?.streetAddress;
        user.picture = profileItems.find(
          (item) => typeof item.picture === "string"
        )?.picture;
        token = {
          ...token,
          user,
          ...(userDID && { userId: userDID }),
        };
      }

      if (account) {
        token = {
          ...token,
          ...(account?.access_token && { accessToken: account.access_token }),
          ...(account?.id_token && { idToken: account.id_token }),
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        ...(token.user && { user: { ...session.user, ...token.user } }),
        ...(token.accessToken && { accessToken: token.accessToken }),
        ...(token.idToken && { idToken: token.idToken }),
        ...(token.userId && { userId: token.userId }),
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
