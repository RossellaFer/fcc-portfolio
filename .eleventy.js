module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "CV": "CV" });
  eleventyConfig.addPassthroughCopy({ "portfolio.css": "portfolio.css" });
  eleventyConfig.addPassthroughCopy({ "index.js": "index.js" });
  eleventyConfig.addPassthroughCopy({ "blogs-data.js": "blogs-data.js" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site"
    }
  };
};