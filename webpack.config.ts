import path from 'path';

interface ENV {
  MODE: 'production' | 'development';
}

const config = (env: ENV) => ({
  mode: env.MODE,
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
});

export default config;
