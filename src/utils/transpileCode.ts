import { transform } from "@babel/standalone";

const importsRegex =
  /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g;
const pureRegex = /\/\*#__PURE__\*\//g;

function replace(string: string, regex: RegExp, value = ""): string {
  return string.replace(regex, value).trim();
}

export default function transpileCode(code: string): {
  iframeCode: string;
  sourceCode: string;
} {
  const codeToTranspile = replace(code, importsRegex);

  const options = { presets: ["es2015-loose", "react"] };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { code: transpiledCode } = transform(codeToTranspile, options);

  if (!transpiledCode) {
    // syntax errors get caught by the `error` listener
    throw new Error(`Something went wrong transpiling ${codeToTranspile}.`);
  }

  const hasImports = Boolean(code.match(importsRegex));
  const imports = code.match(importsRegex)?.join("\n") ?? "";

  return {
    // this is passed to `updateIframe`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-template-expressions
    iframeCode: hasImports ? `${imports}\n${transpiledCode}` : transpiledCode,
    // this is passed to `updateSource`
    // ignore /*#__PURE__*/ from transpiled output to reduce noise
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    sourceCode: replace(transpiledCode, pureRegex),
  };
}
