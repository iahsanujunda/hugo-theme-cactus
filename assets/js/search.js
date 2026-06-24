// A local search script, originally for hexo-generator-search
// (https://github.com/PaicHyperionDev/hexo-generator-search), GNU LGPL.
// Copyright (C) 2015 Joseph Pan, Shuhao Mao. Modified by Pieter Robberechts.
// Ported to Hugo for hugo-theme-cactus: reads /index.json (JSON) instead of
// search.xml, and uses fetch instead of jQuery $.ajax. The search engine
// (matching/ranking/snippet/highlight) is unchanged.

/*exported searchFunc*/
var searchFunc = function(path, searchId, contentId) {

  function stripHtml(html) {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
    html = html.replace(/<figure([\s\S]*?)<\/figure>/gi, "");
    html = html.replace(/<\/div>/ig, "\n");
    html = html.replace(/<\/li>/ig, "\n");
    html = html.replace(/<li>/ig, "  *  ");
    html = html.replace(/<\/ul>/ig, "\n");
    html = html.replace(/<\/p>/ig, "\n");
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/ig, "");
    return html;
  }

  function getAllCombinations(keywords) {
    var i, j, result = [];

    for (i = 0; i < keywords.length; i++) {
        for (j = i + 1; j < keywords.length + 1; j++) {
            result.push(keywords.slice(i, j).join(" "));
        }
    }
    return result;
  }

  fetch(path).then(function(response) {
    return response.json();
  }).then(function(datas) {
    var $input = document.getElementById(searchId);
    if (!$input) { return; }
    var $resultContent = document.getElementById(contentId);

    $input.addEventListener("input", function(){
      var resultList = [];
      var keywords = getAllCombinations(this.value.trim().toLowerCase().split(" "))
        .sort(function(a,b) { return b.split(" ").length - a.split(" ").length; });
      $resultContent.innerHTML = "";
      if (this.value.trim().length <= 0) {
        return;
      }
      // perform local searching
      datas.forEach(function(data) {
        var matches = 0;
        if (!data.title || data.title.trim() === "") {
          data.title = "Untitled";
        }
        var dataTitle = data.title.trim().toLowerCase();
        var dataTitleLowerCase = dataTitle.toLowerCase();
        var dataContent = stripHtml(data.content.trim());
        var dataContentLowerCase = dataContent.toLowerCase();
        var dataUrl = data.url;
        var indexTitle = -1;
        var indexContent = -1;
        var firstOccur = -1;
        // only match artiles with not empty contents
        if (dataContent !== "") {
          keywords.forEach(function(keyword) {
            indexTitle = dataTitleLowerCase.indexOf(keyword);
            indexContent = dataContentLowerCase.indexOf(keyword);

            if( indexTitle >= 0 || indexContent >= 0 ){
              matches += 1;
              if (indexContent < 0) {
                indexContent = 0;
              }
              if (firstOccur < 0) {
                firstOccur = indexContent;
              }
            }
          });
        }
        // show search results
        if (matches > 0) {
          var searchResult = {};
          searchResult.rank = matches;
          searchResult.str = "<li><a href='"+ dataUrl +"' class='search-result-title'>"+ dataTitle +"</a>";
          if (firstOccur >= 0) {
            // cut out 100 characters
            var start = firstOccur - 20;
            var end = firstOccur + 80;

            if(start < 0){
              start = 0;
            }

            if(start == 0){
              end = 100;
            }

            if(end > dataContent.length){
              end = dataContent.length;
            }

            var matchContent = dataContent.substring(start, end);

            // highlight all keywords
            var regS = new RegExp(keywords.join("|"), "gi");
            matchContent = matchContent.replace(regS, function(keyword) {
              return "<em class=\"search-keyword\">"+keyword+"</em>";
            });

            searchResult.str += "<p class=\"search-result\">" + matchContent +"...</p>";
          }
          searchResult.str += "</li>";
          resultList.push(searchResult);
        }
      });
      if (resultList.length) {
        resultList.sort(function(a, b) {
            return b.rank - a.rank;
        });
        var result ="<ul class=\"search-result-list\">";
        for (var i = 0; i < resultList.length; i++) {
          result += resultList[i].str;
        }
        result += "</ul>";
        $resultContent.innerHTML = result;
      }
    });
  });
};
