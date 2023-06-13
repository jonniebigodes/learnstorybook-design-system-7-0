import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],
      }),
      commonjs(),
      terser(),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx'],
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
    ],
    external: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
  },
];
