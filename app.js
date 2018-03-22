// Global rrays to store position and bats/throws filters
posArr = [];
throwsArr = [];
batsArr = [];

// When page first loads, activate select pickers and load data.
$(document).ready(function() {
  $('.selectpicker').selectpicker();
  $.getJSON("https://raw.githubusercontent.com/kruser/interview-developer/master/javascript/roster.json", function(dataRes) {
    data = dataRes
    filtered = data
    loadData(data);
  });
});

// Function to load data into table on page
function loadData(dataToLoad) {
  // Clear out the current table body
  var body = $("#roster_body");
  body.empty();

  // Loop through each row and format/insert them properly in a new table row
  $.each(dataToLoad, function(index, value) {
    body.append("<tr>");
    body.append("<td class=\"notes-click\" data-id=\"" + value.player_id_mlbam + "\">" + value.firstname + " " + value.lastname + "</td>");
    body.append("<td><img width=\"50\" src=\"http://gdx.mlb.com/images/gameday/mugshots/mlb/" + value.player_id_mlbam + ".jpg\"></td>");
    body.append("<td>" + value.dob_dte + "</td>");
    body.append("<td>" + Math.floor(value.height / 12) + "'" + value.height % 12 + "\"" + "</td>");
    body.append("<td>" + value.weight + "&nbsp;&nbsp;</td>");
    body.append("<td class=\"birth-place\">" + value.birth_place + "</td>");

    // If no school is listed, show N/A instead of undefined
    var school = "N/A";
    if (typeof value.school != 'undefined') {
      school = value.school;
    }
    body.append("<td>" + school + "</td>");
    body.append("<td>" + value.bats + "/" + value.throws + "&nbsp;&nbsp;&nbsp;&nbsp;</td>");
    body.append("<td>" + value.position + "&nbsp;&nbsp;&nbsp;</td>");

    // If no debut date is listed, show N/A instead of undefined
    var debut = "N/A";
    if (typeof value.mlb_debut != 'undefined') {
      debut = value.mlb_debut;
    }
    body.append("<td>" + debut + "</td>");
    body.append("</tr>");
  });
}

// Listener for player names. When clicked this launches the notes modal
$(document.body).on('click', '.notes-click', function() {
  // Get the name and ID of the selected player, and retrieve previous note
  var name = $(this).html();
  var playerId = $(this).data("id");
  var prevNote = localStorage.getItem(playerId);

  // If there is a previous note, fill the textarea with it
  if (prevNote != null) {
    $("#noteArea").val(prevNote);
  }

  // Update the modal header and ID data, then show the modal
  $("#modalPlayerName").html(name);
  $("#modalPlayerName").data("id", playerId);
  $('#notesModal').modal('show');
});

// Listener for save button on notes modal
$("#saveNote").click(function() {
  // Get the player ID and note text
  var playerId = $("#modalPlayerName").data("id");
  var note = $("#noteArea").val();

  // If the note is empty, delete it from local storage, otherwise add it
  if (note.length < 1) {
    localStorage.removeItem(playerId);
  } else {
    localStorage.setItem(playerId, note);
  }

  // Hide the modal once complete
  $('#notesModal').modal('hide');
});

$("#deleteNote").click(function() {
  var playerId = $("#modalPlayerName").data("id");
  localStorage.removeItem(playerId);
  $('#notesModal').modal('hide');
});

$('#notesModal').on('hidden.bs.modal', function (e) {
  $("#noteArea").val("");
})

init = false;
$(".clickable").click(function() {
    if (init) {
      oldHTML = sortedElem.html();
      sortedElem.html(oldHTML.split(" <")[0]);
    }
    sortedElem = $(this)
    var field = $(this).data("field");
    var dir = $(this).data("dir");
    if (dir == -1) {
      sortedElem.append(" <i class=\"fas fa-sort-down\">");
    } else {
      sortedElem.append(" <i class=\"fas fa-sort-up\">");
    }
    sortData(field, dir);
    $(this).data("dir", dir * -1);
    init = true;
});

$('#position-select').on('change', function(){
  posArr = [];
  var selected = $(this).children('option:selected');
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
  filterData();
});

$('#bats-select').on('change', function(){
  batsArr = [];
  var selected = $(this).children('option:selected');
  $.each(selected, function(index, value) {
    var val = $(value).data("bats");
    batsArr.push(val);
  });
  filterData();
});

$('#throws-select').on('change', function(){
  throwsArr = [];
  var selected = $(this).children('option:selected');
  $.each(selected, function(index, value) {
    var val = $(value).data("throws");
    throwsArr.push(val);
  });
  filterData();
});

function filterData() {
  filtered = $.grep(data, function(obj, i) {
    var posStatus = $.inArray(obj.position, posArr);
    var batsStatus = $.inArray(obj.bats, batsArr);
    var throwsStatus = $.inArray(obj.throws, throwsArr);
    if (posStatus < 0 && posArr.length > 0) return false;
    if (batsStatus < 0 && batsArr.length > 0) return false;
    if (throwsStatus < 0 && throwsArr.length > 0) return false;
    return true;
  });
  loadData(filtered)
};

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
  filtered.sort(sortByField(field, dir));
  loadData(filtered);
}
