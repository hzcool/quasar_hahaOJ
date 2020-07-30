
module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  plugins: [
    [
      "import",
      {
        "libraryName": "view-design",
        "libraryDirectory": "src/components"
      }
    ],
  ]
}
