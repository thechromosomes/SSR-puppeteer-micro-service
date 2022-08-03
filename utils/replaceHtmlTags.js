const replaceHtmlTags = async function (content) {
  if (typeof String.prototype.replaceAll === "undefined") {
    String.prototype.replaceAll = function (match, replace) {
      return this.replace(new RegExp(match, "g"), () => replace);
    };
  }

  var cmsContent;
  var style;

//   let extractStyle = async function (item) {
//     const doc = new DOMParser().parseFromString(item, "text/html");
//     let extractedCss = [...doc.querySelectorAll("style")][0];
//     style = extractedCss.textContent;
//     cmsContent = item.replaceAll(extractedCss.outerHTML, "");
//   };
  let addHrefToAncher = async (item) => {
    // var anchers = item.match("<a(?:(?!\bhref=)[^>])*>");
    var anchers = await item.match(
      /<a(?=\s|>)(?!(?:[^>=]|=(['"])(?:(?!\1).)*\1)*?\shref=['"])[^>]*>.*?<\/a>/g
    );
    if (anchers == null) {
      cmsContent = item;
      return;
    }

    for (let i = 0; i < anchers.length; i++) {
      let tag = anchers[i].toString();
      let tag2 = tag.replaceAll("<a", "<a href='#' ");  
      cmsContent = item.replaceAll(tag, tag2);
    }
  };
  await addHrefToAncher(content);
  //   extractStyle(cmsContent);

  let finalContent = await cmsContent || content;
  finalContent = await finalContent.replaceAll("<a", "<nuxt-link");
  finalContent = await finalContent.replaceAll("</a>", "</nuxt-link>");
  finalContent = await finalContent.replaceAll("href=", "to=");

  //   return {
  //     finalContent,
  //     style,
  //   };
  return { HTML: finalContent };
};

module.exports = replaceHtmlTags;
