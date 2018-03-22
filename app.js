
$(document).ready(function() {
  $('.selectpicker').selectpicker();
  $.getJSON("https://raw.githubusercontent.com/kruser/interview-developer/master/javascript/roster.json", function(dataRes) {
    data = dataRes
    loadData(data);
  });
});


function loadData(dataToLoad) {
  var body = $("#roster_body");
  body.empty();
  $.each(dataToLoad, function(index, value) {
    body.append("<tr>");
    body.append("<td>" + value.firstname + " " + value.lastname + "</td>");
    body.append("<td><img width=\"50\" src=\"http://gdx.mlb.com/images/gameday/mugshots/mlb/" + value.player_id_mlbam + ".jpg\"></td>");
    body.append("<td>" + value.dob_dte + "</td>");
    body.append("<td>" + Math.floor(value.height / 12) + "'" + value.height % 12 + "\"" + "</td>");
    body.append("<td>" + value.weight + "</td>");
    body.append("<td>" + value.birth_place + "</td>");
    var school = "N/A";
    if (typeof value.school != 'undefined') {
      school = value.school;
    }
    body.append("<td>" + school + "</td>");
    body.append("<td>" + value.bats + "/" + value.throws + "</td>");
    body.append("<td>" + value.position + "</td>");
    var debut = "N/A";
    if (typeof value.mlb_debut != 'undefined') {
      debut = value.mlb_debut;
    }
    body.append("<td>" + debut + "</td>");
    body.append("</tr>");
  });
}

$(".clickable").click(function() {
    var field = $(this).data("field");
    var dir = $(this).data("dir");
    sortData(field, dir);
    $(this).data("dir", dir * -1);
});

$('#position-select').on('change', function(){
  var selected = $(this).children('option:selected');
  var posArr = [];
  $.each(selected, function(index, value) {
    var val = $(value).data("pos");
    if (val == "OF") {
      posArr.push("LF");
      posArr.push("RF");
      posArr.push("CF");
    } else if (val == "IF") {
      posArr.push("1B");
      posArr.push("2B");
      posArr.push("3B");
      posArr.push("SS");
    } else if (val == "P") {
      posArr.push("RHR");
      posArr.push("LHR");
      posArr.push("RHS");
      posArr.push("LHS");
    } else if (val == "R") {
      posArr.push("RHR");
      posArr.push("LHR");
    } else if (val == "S") {
      posArr.push("RHS");
      posArr.push("LHS");
    }
    posArr.push(val);
  });

  var filtered = $.grep(data, function(obj, i) {
    var status = $.inArray(obj.position, posArr);
    if (status < 0) return false;
    return true;
  });
  loadData(filtered);
});

function sortByField(field, dir) {
  return function (a, b) {
    var res = 0;
    if (typeof a[field] == 'undefined') return 1;
    if (typeof b[field] == 'undefined') return -1;
    if (a[field] < b[field]) res = -1;
    if (a[field] > b[field]) res = 1;
    return res * dir
  }
}

function sortData(field, dir) {
  data.sort(sortByField(field, dir));
  loadData(data);
}
