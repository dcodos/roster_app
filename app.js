$(document).ready(function() {
  $.getJSON("https://raw.githubusercontent.com/kruser/interview-developer/master/javascript/roster.json", function(data) {
    loadData(data);
  });
});


function loadData(data) {
  var body = $("#roster_body");

  $.each(data, function(index, value) {
    console.log(value);
    body.append("<tr>");
    body.append("<td>" + value.firstname + " " + value.lastname + "</td>");
    body.append("<td>" + value.dob_dte + "</td>");
    body.append("<td>" + Math.floor(value.height / 12) + "'" + value.height % 12 + "\"" + "</td>");
    body.append("<td>" + value.weight + "</td>");
    body.append("<td>" + value.birth_place + "</td>");
    body.append("<td>" + value.school + "</td>");
    body.append("<td>" + value.bats + "/" + value.throws + "</td>");
    body.append("<td>" + value.position + "</td>");
    body.append("<td>" + value.mlb_debut + "</td>");
    body.append("</tr>");
  });
}
