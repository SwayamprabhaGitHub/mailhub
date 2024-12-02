export function useCurrentUser(user, docdata={}) {
  const createdAtTimeStamp = Number(user.metadata.createdAt);
  const lastLoginAtTimeStamp = Number(user.metadata.lastLoginAt);
  const loggedInUser = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: docdata?.phoneNumber ? docdata?.phoneNumber : null,
    photoURL: user.photoURL,
    token: user.accessToken,
    id: user.uid,
    createdAt: new Date(createdAtTimeStamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
    lastLoginAt: new Date(lastLoginAtTimeStamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };

  return loggedInUser;
}
