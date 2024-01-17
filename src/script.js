  content(Body, `
    <div id="opt">
      <textarea id="view" readonly></textarea>
    </div>
  `);

  click("#preview", (e)=> {
    e.preventDefault();  
    var target = val("#target"); 
    var url = val("#input-url");
    if (url) {
      html("#view", "");
      timeOut(()=> {
        if (url.match(/githubusercontent/g) && url.match(/raw/gi)) {
          if (target === "View") {
            hide("#intro"); show("#opt");
            return preview(url, "console");
          } else if (target === "Alert") {
            show("#intro"); hide("#opt");
            return preview(url, "alert");
          } else if (target === "Open") {
            show("#intro"); hide("#opt");
            return preview(url, "open");
          }
        } else {
          hide("#intro"); show("#opt");
          var host = url.split("/")[2];
           html("#view", `Invalid Host: ${host}`);
           timeOut(()=> {
             html("#view", "");
             show("#intro"); hide("#opt");
           }, 10000);
        }
      }, 100);
    }
  });

  on("#input-url", "keyup", ()=> {
     html("#view", "");
     show("#intro");
     hide("#opt");
  });

  if (typeof console != "undefined") {
    if (typeof console.log != "undefined") {
      console.olog = console.log;
    } else {
      console.olog = function() {};
    }
    console.log = function(data) {
      console.olog(data);
      html("#view", data);
    };
  }

  content(Body, `<pre id="intro"></pre>`);
  
  html("#intro", `
   <b>Target:</b> <span style="color:#444;">(View)</span>

     &bull; View  > <span style="color:#333;background:#eee;padding:1.5px 4px;border-radius:3px;">View in the current page</span>
     &bull; Alert > <span style="color:#333;background:#eee;padding:1.5px 4px;border-radius:3px;">Show in Pop Up Alerts</span>
     &bull; Open  > <span style="color:#333;background:#eee;padding:1.5px 4px;border-radius:3px;">Open and serve the file</span>

   <b>URL:</b> <span style="color:#444;">(https://raw.githubusercontent.com/)</span>

     &bull; Any GitHub file can be viewed if supported.
     &bull; Make sure the file is GitHub <span style="color:#333;background:#eee;padding:1.5px 4px;border-radius:3px;">raw</span>.
     
   <b>URL reference:</b>

     &bull; https://raw.githubusercontent.com/username/repo/main/file-name
     &bull; https://gist.githubusercontent.com/username/file-id/raw/file-name <span style="color:#333;background:#eee;padding:1.5px 4px;border-radius:3px;">Public/Secret</span>
     
   <b>Embed File:</b>
   
     &bull; Add it to your HTML file.
     <span style="color:#333;font-weight:600;">
     &lt;div id="embed" style="position:absolute;top:0;left:0;right:0;bottom:0;width:95%;height:95%;margin:auto;"&gt;&lt;/div&gt;

     &lt;script src="https://cdn.statically.io/gist/ZazerConer/a32d8963edd4a0ae56297135906f692a/raw/jShort.js"&gt;&lt;/script&gt;
     &lt;script&gt;
       ready(()=> {
         embedFile("#embed", "https://github-file");
       });
     &lt;/script&gt;
     </span>
  `);
  
   attr("#gh-link", {
     href: "https://github.com/ZazerConer/preview",
     target: "_blank"
   });
});
