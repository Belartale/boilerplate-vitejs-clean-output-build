import fs from 'fs'
import { resolve } from 'path'
const fileregex = /\.(js|ts)$/i
const vendorRegex = /vendor/

let viteConfig

export default function tomeMarkPlugin() {
    return {
        name: 'remove-comments-plugin',
        configResolved(config) {
            viteConfig = config
        },
        writeBundle: async (options, bundle) => {

            const bundles = Object.entries(bundle)
            const root = viteConfig.root
            const outDir = viteConfig.build.outDir || 'build'
            bundles.forEach(bundle => {
                const bundleFileName = bundle[0]
                const bundleFilePath = resolve(root, outDir, bundleFileName)
                if (fileregex.test(bundleFileName) && !vendorRegex.test(bundleFileName)) {
                    try {
                        const code = fs.readFileSync(bundleFilePath, {encoding: 'utf8'})

                        const newCode = code.split('\n').map((line, index) => {
                            let newLine = line;

                            if (/\/\*.*\*\//.test(line)) {
                                const re = new RegExp(/\/\*.*\*\//, 'g');
                                newLine = line.replace(re, '');
                            }

                            return newLine
                        }).join('\n');

                        fs.writeFileSync(bundleFilePath, newCode)
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        }
    }
}