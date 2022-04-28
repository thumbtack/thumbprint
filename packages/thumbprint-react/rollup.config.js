import babel from '@rollup/plugin-babel';
import path from 'path';
import copy from 'rollup-plugin-cpy';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import { dependencies, peerDependencies } from './package.json';

const getConfig = format => {
    const dest = path.join('dist', format);

    return {
        input: 'index.ts',
        output: {
            dir: dest,
            format,
            sourcemap: true,
        },
        plugins: [
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs'],
            }),
            // Typescript plugin is needed in addition to Babel since we export our interfaces.
            typescript({}),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs'],
                root: '.',
            }),
            copy({
                files: ['**/*.scss', '**/*.css', '!dist/**'],
                dest,
                options: {
                    parents: true,
                },
            }),
        ],
        preserveModules: true,
        external: id =>
            // Don't attempt to bundle dependencies and peerDependencies.
            dependencies[id] ||
            peerDependencies[id] ||
            // Don't attempt to parse CSS modules.
            /module\.s?css$/.test(id) ||
            // Ignore `lodash/*` and `date-fns/*` imports. These imports that include a path are
            // needed because the packages don't support tree-shaking by default.
            id.startsWith('lodash/') ||
            id.startsWith('date-fns/'),
    };
};

export default [getConfig('es'), getConfig('cjs')];
