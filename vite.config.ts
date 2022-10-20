import { defineConfig } from 'vite';
import glob from 'glob';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';
import FullReload from 'vite-plugin-full-reload';
import removeComments from './customPlugins/removeComments';

const getPathsScssFiles = (extname: string) => {
    let newEntry = {};

    glob.sync(`./src/**/*.${extname}`, {}).forEach((pathFile) => {
        const scriptName = path.parse(pathFile).name;
        // const scriptName = pathFile.split('/').at(-1);
        const folder = pathFile.split('/').at(-2);
        newEntry = {
            ...newEntry,
            [`${folder === 'src' ? '' : folder + '/'}${scriptName}`]:
                path.resolve(__dirname, pathFile),
        };
    });

    return newEntry;
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        handlebars({
            // helpers,
            partialDirectory: path.resolve(__dirname, 'src'),
            reloadOnPartialChange: true,
        }) as any,
        FullReload([path.resolve(__dirname, 'src/**/*')]),
        removeComments(),
    ],
    assetsInclude: [path.resolve(__dirname, 'src')],
    build: {
        minify: false,
        polyfillModulePreload: false,
        outDir: 'build',
        rollupOptions: {
            input: {
                ...getPathsScssFiles('scss'),
                handlebars: './index.html',
                'index.js': path.resolve(__dirname, './src/index.ts'),
            },
            plugins: [],
            output: {
                entryFileNames: ({ facadeModuleId, name }) => {
                    // console.log('facadeModuleId', facadeModuleId)
                    // console.log('name', name);
                    // if (/\.scss$/.test(facadeModuleId ?? '')) {
                    //     console.log(`text`)
                    //     return 'css/[name].[hash].css';
                    // }
                    return name;
                },
                assetFileNames: ({ name }) => {
                    console.log('name', name?.split('/').at(-2));

                    const folder = name?.split('/').at(-2);

                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'assets/[name][extname]';
                    }

                    if (/\.(ttf|otf|fnt|woff)$/.test(name ?? '')) {
                        return 'assets/[name][extname]';
                    }

                    if (/\.(css|sass|scss|less)$/.test(name ?? '')) {
                        return `css${
                            folder === 'src' ? '' : `/${folder}`
                        }/[name].[hash][extname]`;
                        // return 'css/[name].[hash][extname]';
                    }
                    if (/\.(js|ts)$/.test(name ?? '')) {
                        return 'js/[name].[hash][extname]';
                    }

                    return 'assets/[name].[hash][extname]';
                },
            },
        },
    },
});
