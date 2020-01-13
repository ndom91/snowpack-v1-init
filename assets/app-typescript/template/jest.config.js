module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  moduleNameMapper: {
    "/web_modules/(.*)": "<rootDir>/web_modules/$1"
  },
  testMatch: ["**/?(*.)spec.ts"],
  coverageReporters: ['text', 'html']
}
