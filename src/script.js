$(document).ready(function () {
  $("#inputName").change(function () {
    $("#name").html($("#inputName").val());

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#inputTitle").change(function () {
    $("#title").html($("#inputTitle").val());

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#writeinPronouns").change(function () {
    $("#pronouns").html($("#writeinPronouns").val());

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#inputURL").change(function () {
    $("#link").show();
    $("#area")
      .contents()
      .filter(function () {
        return this.nodeType == 3;
      })
      .remove();
    $("#link").attr("href", $("#inputURL").val());
    $("#link").html($("#inputArea").val());

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#inputArea").change(function () {
        $("#area")
      .contents()
      .filter(function () {
        return this.nodeType == 3;
      })
      .remove();
    if ($("#urlCheck").is(":checked")) {
      $("#link").attr("href", $("#inputURL").val());
      $("#link").html($("#inputArea").val());
    } else {
      $("#area").append($("#inputArea").val());
      $("#link").hide();
    }

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#urlCheck").change(function () {
    if ($("#urlCheck").is(":checked")) {
      $("#inputURL").prop('disabled',false);
      $("#link").show();
    $("#area")
      .contents()
      .filter(function () {
        return this.nodeType == 3;
      })
      .remove();
    $("#link").attr("href", $("#inputURL").val());
    $("#link").html($("#inputArea").val());
    } else {
      $("#inputURL").prop('disabled',true);
      $("#area").append($("#inputArea").val());
      $("#link").hide();
    }

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#inputPronouns").change(function () {
    if ($("#inputPronouns").val() == "Other") {
      $("#writeinPronounsRow").show();
    } else {
      $("#pronouns").html($("#inputPronouns").val())
            $("#writeinPronounsRow").hide();

    }

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#inputAddress").change(function () {
    $("#contact").empty();
    $.each($("#inputAddress").val().split(/\n/), function (i, line) {
      if (line) {
        $("#contact").append(line + "<br>");
      }
    });
    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#inputPhone").change(function () {
    $("#phone").html($("#inputPhone").val());

    $("#copybtn").html("Copy to Clipboard");
  });
});

$(document).ready(function () {
  $("#phoneCheck").change(function () {
   if ($("#phoneCheck").is(":checked")) {
      $("#inputPhone").prop('disabled',false);
      $("#phone").show();
   } else {
      $("#inputPhone").prop('disabled',true);
      $("#phone").hide();
    }
  });
});

//*********************************************************************
function copyToClip(str) {
  function listener(e) {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}

function CopyToClipboard(element) {
  // array off all block level elements
  var block_level_elements = [
    "P",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "OL",
    "UL",
    "DIV",
    "FORM",
    "HR",
    "TABLE"
  ];

  //create new Element so we can vhange elments like we need
  var newelment = document.createElement("div");

  //copy target Element to the new Element
  newelment.innerHTML = document.getElementById(element).innerHTML;

  //hide new Element to body
  newelment.style.opacity = 0;
  // add new Element to body
  document.body.appendChild(newelment);

  //get all element childs
  var descendents = newelment.getElementsByTagName("*");

  //loop in childs
  for (var i = 0; i < descendents.length; ++i) {
    //get defult Style
    var style = window.getComputedStyle(descendents[i]);
    var dis = style.getPropertyValue("display");
    //get defult tag name
    var tagname = descendents[i].tagName;

    //---------------------------
    //this part is little tricky
    //---------------------------
    //true : Element is a block level elements and css display is inline
    if (dis.includes("inline") && block_level_elements.includes(tagname)) {
      //get all Element style include default style
      var defultcss = document.defaultView.getComputedStyle(descendents[i], "")
        .cssText;
      //chang Element tag from block level elements to inline level elements (span)
      descendents[i].outerHTML = descendents[i].outerHTML.replace(
        new RegExp(tagname, "ig"),
        "span"
      ); //todo: need to change RegExp to tag name only not inner text
      //add all Element style include default style to new tag
      descendents[i].style.cssText = defultcss;
    }
  }
  //-----------------copy new Element--------------
  var doc = document;
  var range, selection;

  if (doc.body.createTextRange) {
    range = doc.body.createTextRange();
    range.moveToElementText(newelment);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = doc.createRange();
    range.selectNodeContents(newelment);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand("copy");
  window.getSelection().removeAllRanges();

  // remove new Element from document
  document.body.removeChild(newelment);

  document.getElementById("copybtn").innerHTML = "Copied";
}
