import tseslint from "typescript-eslint";

export default [
    {
        files: ["**/*Abstract.ts", "**/*Base.ts", "**/I*.ts"],
        rules: {
            "@typescript-eslint/no-unused-vars": "off"
        }
    }, {
        files: ["**/*.ts", "**/*.tsx", "**/*.js"],
        ignores: ["dist", "node_modules"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin
        },
        rules: {
            "no-unused-vars": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/explicit-function-return-type": "off"
        }
    }
];
