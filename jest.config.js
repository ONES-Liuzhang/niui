module.exports = {
  testEnvironment: "jsdom",
  testMatch: ['**/__tests__/**/*.spec.ts'],
  // 使用 ts 编译
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  }
}