import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
    input: "src/nine-patch.js",
    output: [
        {
            file: "dist/nine-patch.js",
            format: "umd",
            name: "NinePatch",
        },
        {
            file: "dist/nine-patch.min.js",
            format: "umd",
            name: "NinePatch",
            plugins: [
                terser({
                    keep_classnames: true,
                }),
            ],
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: "node_modules/**",
            babelHelpers: "bundled",
        }),
    ],
};
