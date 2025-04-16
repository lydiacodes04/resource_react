export const coordinates = {
  latitude: 29.424122,
  longitude: -98.493629,
};
export const APIkey = "a562052a9800bf432ffc60528926e77f";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr4me.justlearning.net"
    : "http://localhost:3001";

export { baseUrl };
