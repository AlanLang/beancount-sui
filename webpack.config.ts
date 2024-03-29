import { type Configuration } from 'webpack'
import { ESBuildMinifyPlugin } from 'esbuild-loader'
import * as fs from 'fs'
import * as path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts'],
  },

  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${isProduction ? 'production' : 'development'}.user.js`,
  },

  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        banner: fs
          .readFileSync(path.resolve(__dirname, './src/user.ts'), 'utf-8')
          .replace(/(==\/UserScript==)[\s\S]+$/, '$1'),
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
    ],
  },
}

export default config
