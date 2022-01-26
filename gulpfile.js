const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');

const buildServerConfig = {
  server: './',
  tsconfig: './tsconfig.server.json',
  outputDir: 'build-server',
  pathWatch: ['./src/server', './src/shared'],
};

const buildServer = (done) => {
  const tsProject = ts.createProject(buildServerConfig.tsconfig);
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest(buildServerConfig.outputDir))
    .on('error', (error) => done(error))
    .on('end', () => done());
};

gulp.task('server:ts', buildServer);

const watchServer = (done) => {
  const stream = nodemon({
    script: 'build-server/src/server/index.js',
    env: { NODE_ENV: 'development' },
    ext: 'ts',
    watch: buildServerConfig.pathWatch,
    tasks: ['server:ts'],
    stdout: true,
  });
  return stream.on('quit', function () {
    done();
  });
};

const buildClient = (cb) => {
  shell.task('nuxt build')();
  cb();
};

const clean = (cb) => {
  shell.task('rm -rf build-client build-server .nuxt')();
  cb();
};
exports.build = gulp.series(clean, buildServer, buildClient);
exports.default = gulp.series(clean, buildServer, watchServer);
