document.addEventListener("DOMContentLoaded", function () {
    const labelRules = [
      {
        regex: /\b(shopify|checkout|theme|liquid|mechanic|metaobject|metafields)\b/i,
        label: "#Shopify",
        className: "shopify",
      },
      {
        regex: /\b(seo)\b/i,
        label: "#SEO",
        className: "seo",
      },
      {
        regex: /\b(journey|life|learning|nomad|remote|developer)\b/i,
        label: "#DevLife",
        className: "devlife",
      },
      {
        regex: /\b(react|javascript|tutorial|guide|how to|metaobject)\b/i,
        label: "#Tutorial",
        className: "tutorial",
      },
      {
        regex: /\b(react|wedding)\b/i,
        label: "#React",
        className: "react",
      },
      {
        regex: /\bsustainab(le|ility)\b/i,
        label: "#Sustainable web development",
        className: "sustainable",
      },
    ];
  
    document.querySelectorAll(".blog-list-title a").forEach((link) => {
      const title = link.textContent;
      const labelContainer = document.createElement("div");
      labelContainer.className = "blog-labels";
      let matched = false;
  
      labelRules.forEach(({ regex, label, className }) => {
        if (regex.test(title)) {
          const span = document.createElement("span");
          span.className = `label ${className}`;
          span.textContent = label;
          labelContainer.appendChild(span);
          matched = true;
        }
      });
  
      if (matched) {
        link.after(labelContainer);
      }
    });
  });