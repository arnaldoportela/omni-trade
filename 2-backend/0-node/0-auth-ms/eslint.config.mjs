import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default [
    {
        ignores: [
            "node_modules",
            "dist",
            "build",
            "db/migrations/**"
        ]
    }, {
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
                sourceType: "module",
                project: ["./tsconfig.json"],
                tsconfigRootDir: import.meta.dirname
            }
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            import: importPlugin
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/await-thenable": "warn",
            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/require-await": "warn",
            "no-shadow": "off",
            "@typescript-eslint/no-shadow": "warn",
            "no-fallthrough": "warn",
            "prefer-const": "warn",
            "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
            "no-unreachable": "warn",
            "@typescript-eslint/prefer-nullish-coalescing": "warn",
            "no-empty-function": "off",
            "@typescript-eslint/no-empty-function": "warn",
            "@typescript-eslint/naming-convention": [
                "warn",
                { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
                { selector: "class", modifiers: ["abstract"], format: ["PascalCase"], prefix: ["Abstract"] }
            ],
            "import/order": [
                "warn", {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always"
            }],
            "import/no-default-export": "warn",
            "no-async-promise-executor": "warn",
            "no-promise-executor-return": "warn"
        }
    }
];
