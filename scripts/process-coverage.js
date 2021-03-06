const fs = require("fs");
const glob = require("glob");
const inline = require("inline-css");
const mkdirp = require("mkdirp");
const path = require("path");

const CODE_COVERAGE_DIRECTORY = "./.test-results/coverage/";
const CODE_COVERAGE_VSTS_DIRECTORY = "./.test-results/coverage-vsts/";

// Create VSTS directory if it does not exist.
if (!fs.existsSync(CODE_COVERAGE_VSTS_DIRECTORY)) {
  fs.mkdirSync(CODE_COVERAGE_VSTS_DIRECTORY);
}

// Find all HTML files.
const files = glob.sync(`${CODE_COVERAGE_DIRECTORY}/**/*.html`);
files.forEach(async (file) => {
  file = file.replace(CODE_COVERAGE_DIRECTORY, "");

  const filePath = path.resolve(CODE_COVERAGE_DIRECTORY, file);
  let options = {
    url: "file://" + filePath,
    extraCss: `
      div.body {
        margin-top: 0px;
      }

      div.clearfix {
        overflow: hidden;
        width: 100%;
      }

      div.coverage-summary table {
        margin: 16px;
        width: calc(100% - 32px);
      }

      div.footer {
        display: none;
      }

      div.header.high {
        padding-top: 4px;
        position: relative;
      }

      div.status-line {
        margin: 0px 10px;
      }

      p.quiet {
        display: none;
      }

      pre.prettyprint, td.line-count, td.line-coverage {
        font-size: 12px;
        line-height: 16.8px;
      }

      pre.prettyprint {
        padding: 0px 5px !important;
      }

      span.missing-if-branch {
        display: none;
      }

      td.line-count {
        padding: 0px 5px;
        white-space: pre;
      }
    `
  };

  // Inline all CSS to HTML file.
  const data = fs.readFileSync(filePath).toString();
  let html = await inline(data, options);

  // Replace unsupported HTML codes.
  html = html.replace(/&#187;/g, ">");

  // Save new HTML file.
  const outputFile = path.resolve(CODE_COVERAGE_VSTS_DIRECTORY, file);
  const dirname = path.dirname(outputFile);

  // Create directory if it does not exist.
  mkdirp.sync(dirname);

  fs.writeFileSync(outputFile, html);
});
