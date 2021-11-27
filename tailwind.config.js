module.exports = {
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
      noto: ["Noto Sans"],
    },
    extend: {
      colors: {
        primary: "#2F80ED",
        secondary: "#090729",
      },
      backgroundImage: (theme) => ({
        banner: "url('/images/banner.jpg')"
      }),
    },
  },
};
