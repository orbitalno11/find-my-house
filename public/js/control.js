/* Set the width of the side navigation to 250px */
function openNav() {
  // document.getElementById("mySidenav").style.width = "250px";
  $('#mySidenav').css("width", "250px");
  mySidenavStatus = 1;
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  // document.getElementById("mySidenav").style.width = "0";
  $('#mySidenav').css("width", "0");
  mySidenavStatus = 0;
}

let mySidenavStatus = 0;

// $(document).on('click',function(){
//   if(mySidenavStatus === 1){
//     closeNav();
//   }
// });

$(document).ready(function () {
  $(document).on('change', '.btn-file :file', function () {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function (event, label) {

    var input = $(this).parents('.input-group').find(':text'),
      log = label;

    if (input.length) {
      input.val(log);
    } else {
      if (log) alert(log);
    }

  });
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#img-upload').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imgInp").change(function () {
    readURL(this);
  });
});

// need to get date from server
function getToday(){
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const days = ['01','02','03','04','05','06','07','08','09'];
  let date = new Date();

  let day = date.getDate();
  let month = (date.getMonth()+1);

  if(day.valueOf() < 10){
    for(let i=0; i<10; i++){
      if(day.valueOf() == days[i].toString()){
        day = days[i].toString();
        break;
      }
    }
  }

  if(month.valueOf() < 10){
    for(let i=0; i<10; i++){
      if(month.valueOf() == months[i].toString()){
        month = months[i].toString();
        break;
      }
    }
  }

  let data = date.getFullYear()+"-"+month+"-"+day;

  return data;
}

$(document).ready(()=>{
  $('#reportDate').val(getToday());
});