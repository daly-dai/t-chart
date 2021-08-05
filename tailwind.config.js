// [配置和定制 Tailwind 安装的指南](https://www.tailwindcss.cn/docs/configuration#-10)
module.exports = {
  prefix: 'tw-', // 添加 tw- 前缀（justify-start->tw-justify-start），防止和已有的 CSS 存在命名冲突
  important: false, // 是否将 Tailwind 的功能类标记为 !important（ !important 功能会覆盖style内联样式）
  // PurgeCSS会根据配置下的指定目录清理没有使用到的样式
  purge: [
    './public/*.html',
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx'
  ],
  // purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
