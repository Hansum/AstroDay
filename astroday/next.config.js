// module.exports = {
//   env: {
//     APIKEY: "coiqo0XgqiLg0jdUjdbzw6uWclK3xcFXaBoRYn4Y",
//   },
// };

const withImages = require("next-images");

module.exports = withImages({
  env: {
    APIKEY: "coiqo0XgqiLg0jdUjdbzw6uWclK3xcFXaBoRYn4Y",
  },
  webpack(config, options) {
    return config;
  },
});
