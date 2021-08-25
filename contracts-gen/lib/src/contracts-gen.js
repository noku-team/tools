#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sol_compiler_1 = require("@0x/sol-compiler");
const sol_resolver_1 = require("@0x/sol-resolver");
const utils_1 = require("@0x/utils");
const fs = require("fs");
const _ = require("lodash");
const mkdirp = require("mkdirp");
const path = require("path");
const prettier = require("prettier");
const toSnakeCase = require("to-snake-case");
const SOLIDITY_EXTENSION = '.sol';
const DEFAULT_ARTIFACTS_DIR = 'test/artifacts';
const DEFAULT_CONTRACTS_DIR = 'contracts';
const DEFAULT_WRAPPERS_DIR = 'test/generated-wrappers';
const SRC_ARTIFACTS_TS_FILE_PATH = 'src/artifacts.ts';
const TEST_ARTIFACTS_TS_FILE_PATH = 'test/artifacts.ts';
const SRC_WRAPPERS_TS_FILE_PATH = 'src/wrappers.ts';
const TEST_WRAPPERS_TS_FILE_PATH = 'test/wrappers.ts';
const AUTO_GENERATED_BANNER = `/*
* -----------------------------------------------------------------------------
* Warning: This file is auto-generated by contracts-gen. Don't edit manually.
* -----------------------------------------------------------------------------
*/`;
const AUTO_GENERATED_BANNER_FOR_LISTS = `This list is auto-generated by contracts-gen. Don't edit manually.`;
const ALL_CONTRACTS_IDENTIFIER = '*';
const GENERATE = 'generate';
const COPY = 'copy';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const command = process.argv.pop();
    if (command !== GENERATE && command !== COPY) {
        throw new Error(`Unknown command found: ${command}`);
    }
    const compilerJSON = readJSONFile('compiler.json');
    const compiler = new sol_compiler_1.Compiler(compilerJSON);
    const testContracts = compiler.getContractNamesToCompile();
    if (!_.isArray(testContracts)) {
        throw new Error('Unable to run the generator bacause contracts key in compiler.json is not of type array');
    }
    let srcContracts = testContracts;
    const packageJSON = readJSONFile('package.json');
    if (packageJSON.config !== undefined && packageJSON.config.publicInterfaceContracts !== undefined) {
        srcContracts = packageJSON.config.publicInterfaceContracts.split(',');
    }
    if (!_.isArray(testContracts)) {
        throw new Error('Unable to run the generator bacause contracts key in compiler.json is not of type array');
    }
    const testArtifactsDir = compilerJSON.artifactsDir || DEFAULT_ARTIFACTS_DIR;
    const srcArtifactsDir = convertToTopLevelDir('testArtifactsDir', testArtifactsDir);
    const testWrappersDir = DEFAULT_WRAPPERS_DIR;
    const srcWrappersDir = convertToTopLevelDir('testWrappersDir', testWrappersDir);
    // Make sure all dirs exist, if not, create them
    mkdirp.sync(testArtifactsDir);
    mkdirp.sync(srcArtifactsDir);
    mkdirp.sync(testWrappersDir);
    mkdirp.sync(srcWrappersDir);
    if (command === GENERATE) {
        yield regenerateContractPackageAsync(testContracts, srcContracts, testArtifactsDir, srcArtifactsDir, testWrappersDir, srcWrappersDir);
    }
    else if (command === COPY) {
        copyOverTestArtifactsAndWrappersToSrc(srcContracts, testArtifactsDir, srcArtifactsDir, testWrappersDir, srcWrappersDir);
    }
    process.exit(0);
}))().catch(err => {
    utils_1.logUtils.log(err);
    process.exit(1);
});
function copyOverTestArtifactsAndWrappersToSrc(srcContracts, testArtifactsDir, srcArtifactsDir, testWrappersDir, srcWrappersDir) {
    // Copy over artifacts
    srcContracts.forEach(contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        const srcPath = `${srcArtifactsDir}/${contractName}.json`;
        mkdirp.sync(srcArtifactsDir);
        fs.copyFileSync(`${testArtifactsDir}/${contractName}.json`, srcPath);
    });
    // Copy over wrappers
    srcContracts.forEach(contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        const wrapperFileName = makeOutputFileName(contractName);
        const srcPath = `${srcWrappersDir}/${wrapperFileName}.ts`;
        mkdirp.sync(srcWrappersDir);
        fs.copyFileSync(`${testWrappersDir}/${wrapperFileName}.ts`, srcPath);
    });
}
function regenerateContractPackageAsync(testContracts, srcContracts, testArtifactsDir, srcArtifactsDir, testWrappersDir, srcWrappersDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const compilerJSON = readJSONFile('compiler.json');
        const packageDir = process.cwd();
        const testContractsDir = compilerJSON.contractsDir || DEFAULT_CONTRACTS_DIR;
        const prettierConfig = yield prettier.resolveConfig(packageDir);
        generateCompilerJSONContractsList(testContracts, testContractsDir, prettierConfig);
        generateArtifactsTs(testContracts, testArtifactsDir, TEST_ARTIFACTS_TS_FILE_PATH, prettierConfig);
        generateArtifactsTs(srcContracts, srcArtifactsDir, SRC_ARTIFACTS_TS_FILE_PATH, prettierConfig);
        generateWrappersTs(testContracts, testWrappersDir, TEST_WRAPPERS_TS_FILE_PATH, prettierConfig);
        generateWrappersTs(srcContracts, srcWrappersDir, SRC_WRAPPERS_TS_FILE_PATH, prettierConfig);
        generateTsConfigJSONFilesList(testContracts, testArtifactsDir, srcContracts, srcArtifactsDir, prettierConfig);
        generatePackageJSONABIConfig(testContracts, 'abis', testArtifactsDir, prettierConfig);
    });
}
function convertToTopLevelDir(name, aPath) {
    let finalPath = aPath;
    const hasDotPrefix = aPath.startsWith('./');
    if (hasDotPrefix) {
        finalPath = aPath.substr(2);
    }
    const segments = finalPath.split('/');
    if (segments.length === 0) {
        throw new Error(`Cannot have empty path for ${name}`);
    }
    if (segments.length === 1) {
        return aPath;
    }
    segments.shift();
    return `${hasDotPrefix ? './' : ''}${segments.join('/')}`;
}
function generateCompilerJSONContractsList(contracts, contractsDir, prettierConfig) {
    const COMPILER_JSON_FILE_PATH = 'compiler.json';
    const compilerJSON = readJSONFile(COMPILER_JSON_FILE_PATH);
    if (compilerJSON.contracts !== undefined && compilerJSON.contracts !== ALL_CONTRACTS_IDENTIFIER) {
        compilerJSON.contracts = _.map(contracts, contract => {
            if (contract.endsWith(SOLIDITY_EXTENSION)) {
                // If it's already a relative path - NO-OP.
                return contract;
            }
            else {
                // If it's just a contract name - resolve it and rewrite.
                return new sol_resolver_1.NameResolver(contractsDir).resolve(contract).path;
            }
        });
        compilerJSON.contracts = _.sortBy(compilerJSON.contracts);
    }
    const compilerJSONString = JSON.stringify(compilerJSON);
    const formattedCompilerJSON = prettier.format(compilerJSONString, Object.assign(Object.assign({}, prettierConfig), { filepath: COMPILER_JSON_FILE_PATH }));
    fs.writeFileSync(COMPILER_JSON_FILE_PATH, formattedCompilerJSON);
}
function generateArtifactsTs(contracts, artifactsDir, artifactsTsFilePath, prettierConfig) {
    const imports = _.map(contracts, contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        const importPath = path.join('..', artifactsDir, `${contractName}.json`);
        return `import * as ${contractName} from '${importPath}';`;
    });
    const sortedImports = _.sortBy(imports, _import => _import.toLowerCase());
    const artifacts = _.map(contracts, contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        if (contractName === 'ZRXToken') {
            // HACK(albrow): "as any" hack still required here because ZRXToken does not
            // conform to the v2 artifact type.
            return `${contractName}: (${contractName} as any) as ContractArtifact,`;
        }
        else {
            return `${contractName}: ${contractName} as ContractArtifact,`;
        }
    });
    const artifactsTs = `
    ${AUTO_GENERATED_BANNER}
    import { ContractArtifact } from 'ethereum-types';

    ${sortedImports.join('\n')}
    export const artifacts = {${artifacts.join('\n')}};
    `;
    const formattedArtifactsTs = prettier.format(artifactsTs, Object.assign(Object.assign({}, prettierConfig), { filepath: artifactsTsFilePath }));
    fs.writeFileSync(artifactsTsFilePath, formattedArtifactsTs);
}
function generateWrappersTs(contracts, wrappersDir, wrappersTsFilePath, prettierConfig) {
    const imports = _.map(contracts, contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        const outputFileName = makeOutputFileName(contractName);
        const exportPath = path.join('..', wrappersDir, outputFileName);
        return `export * from '${exportPath}';`;
    });
    const sortedImports = _.sortBy(imports);
    const wrappersTs = `
    ${AUTO_GENERATED_BANNER}
    ${sortedImports.join('\n')}
    `;
    const formattedArtifactsTs = prettier.format(wrappersTs, Object.assign(Object.assign({}, prettierConfig), { filepath: wrappersTsFilePath }));
    fs.writeFileSync(wrappersTsFilePath, formattedArtifactsTs);
}
function generateTsConfigJSONFilesList(testContracts, testArtifactsDir, srcContracts, srcArtifactsDir, prettierConfig) {
    const TS_CONFIG_FILE_PATH = 'tsconfig.json';
    const tsConfig = readJSONFile(TS_CONFIG_FILE_PATH);
    const testFiles = _.map(testContracts, contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        const artifactPath = path.join(testArtifactsDir, `${contractName}.json`);
        return artifactPath;
    });
    const srcFiles = _.map(srcContracts, contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        const artifactPath = path.join(srcArtifactsDir, `${contractName}.json`);
        return artifactPath;
    });
    tsConfig.files = [...testFiles, ...srcFiles];
    tsConfig.files = _.sortBy(tsConfig.files);
    const tsConfigString = JSON.stringify(tsConfig);
    const formattedTsConfig = prettier.format(tsConfigString, Object.assign(Object.assign({}, prettierConfig), { filepath: TS_CONFIG_FILE_PATH }));
    fs.writeFileSync(TS_CONFIG_FILE_PATH, formattedTsConfig);
}
function generatePackageJSONABIConfig(contracts, configName, artifactsDir, prettierConfig) {
    let packageJSON = readJSONFile('package.json');
    const contractNames = _.map(contracts, contract => {
        const contractName = path.basename(contract, SOLIDITY_EXTENSION);
        return contractName;
    });
    const sortedContractNames = _.sortBy(contractNames);
    packageJSON = Object.assign(Object.assign({}, packageJSON), { config: Object.assign(Object.assign({}, packageJSON.config), { [`${configName}:comment`]: AUTO_GENERATED_BANNER_FOR_LISTS, [configName]: `${artifactsDir}/@(${sortedContractNames.join('|')}).json` }) });
    const PACKAGE_JSON_FILE_PATH = 'package.json';
    const packageJSONString = JSON.stringify(packageJSON);
    const formattedPackageJSON = prettier.format(packageJSONString, Object.assign(Object.assign({}, prettierConfig), { filepath: PACKAGE_JSON_FILE_PATH }));
    fs.writeFileSync(PACKAGE_JSON_FILE_PATH, formattedPackageJSON);
}
function makeOutputFileName(name) {
    let fileName = toSnakeCase(name);
    // HACK: Snake case doesn't make a lot of sense for abbreviated names but we can't reliably detect abbreviations
    // so we special-case the abbreviations we use.
    fileName = fileName.replace('z_r_x', 'zrx').replace('e_r_c', 'erc');
    return fileName;
}
function readJSONFile(filePath) {
    const JSONString = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(JSONString);
    return parsed;
}
//# sourceMappingURL=contracts-gen.js.map