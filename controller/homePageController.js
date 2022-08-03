const ssr = require("../utils/SsrController.js");
const fs = require("fs");
const replaceHtmlTags = require("../utils/replaceHtmlTags");
const generateFile = require("../utils/generateFile.js");
const readGeneratedFile = require("../utils/readGenratedFile");

module.exports.getHomePage = async (req, res, next) => {
  let baseUrl = new URL("https://v2.kartmax.co");
  let generatedFileName = `public/${baseUrl.hostname
    .replace("www.", "")
    .replace(".com", "")}.json`;
  let finalHTML;

  try {
    if (!fs.existsSync(generatedFileName)) {
      const { html, ttRenderMs } = await ssr(baseUrl);
      let replacedHTML = await replaceHtmlTags(html);
      finalHTML = await generateFile(replacedHTML, generatedFileName);
    } else {
      finalHTML = await readGeneratedFile(generatedFileName);
    }

    res.send({
      htmlContent: JSON.stringify(JSON.parse(finalHTML).HTML),
      status: true,
    });
  } catch (error) {
    console.log("error", error);
    res.send({
      htmlContent: "",
      status: false,
    });
  }
};
