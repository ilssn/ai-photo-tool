module.exports = {
  apps: [
    {
      name: 'AI-Photo-Tool',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3055', //3005是我们希望nextjs程序运行的端口号，你也可以修改为其他端口号
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};