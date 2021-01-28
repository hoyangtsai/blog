import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// import { default as importHTTP } from 'import-http/rollup';
import babel from 'rollup-plugin-babel';

const dev = {
  input: 'js/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: 'inline',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/env', {
          targets: { esmodules: true },
          bugfixes: true,
        }]
      ]
    }),
  ],
  watch: {
    exclude: ['node_modules/**'],
  }
}

const prod = {
  input: 'js/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/env', { modules: false }]
      ]
    }),
    terser(),
  ]
}

export default process.env.NODE_ENV === 'production'
  ? prod
  : dev
