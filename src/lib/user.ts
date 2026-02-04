
export const getUser = () => {
  const jsonValue = localStorage.getItem("@user");
  if (jsonValue) {
    return JSON.parse(jsonValue);
  } else {
    return null;
  }
};
export const getBearerToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error retrieving token from localStorage:", err);
    return null;
  }
};
export const getRefreshToken = () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return refreshToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving refreshToken from localStorage", error);
  }
};
export const getTokenExpiry = () => {
  try {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (tokenExpiry) {
      return tokenExpiry;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error retrieving expiryToken from localStorage:", err);
  }
};
export const setTokenAndExpiry = (
  token: string,
  refreshToken: string,
  tokenExpiry: string
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("tokenExpiry", tokenExpiry);
};
export function isTokenExpire(tokenExpiry: string) {
  if (!tokenExpiry) return false;
 
  const currentTime = new Date();
  const expiryTime = new Date(localTime);
  const differenceInMillis = expiryTime.getTime() - currentTime.getTime();
  if (differenceInMillis <= 60000) return true;
  return false;
}
