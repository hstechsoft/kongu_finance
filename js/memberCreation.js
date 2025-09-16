
var urlParams = new URLSearchParams(window.location.search);
var phone_id = urlParams.get('phone_id');
  var current_user_id =  localStorage.getItem("ls_uid") ;
var current_user_name =  localStorage.getItem("ls_uname") ; 
 var physical_stock_array = [];
  var property = "";
$(document).ready(function(){
 
  
  $("#menu_bar").load('menu.html',
    function() { 
      var lo = (window.location.pathname.split("/").pop());
      var web_addr = "#"+ (lo.substring(0, lo.indexOf(".")))
 
    
     if($(web_addr).find("a").hasClass('nav-link'))
     {
      $(web_addr).find("a").toggleClass('active')
     }
     else if($(web_addr).find("a").hasClass('dropdown-item'))
{
$(web_addr).parent().parent().find("a").eq(0).toggleClass('active')
}
      
     
    }
 );



    // check_login();
    
  $("#unamed").text(localStorage.getItem("ls_uname"))

get_team_dropdown()

 

    // Show/hide nominee address fields
    $('#different_address').on('change', function () {
        $('#nominee_address_fields').toggle(this.checked);
    });
$('#user_photo_preview').click(function () {
  

    $("#user_photo_up").trigger("click");
   
   });

   
   $('#user_photo_up').on('change',function ()
{
 property =this.files[0];

shw_toast("File Selected","File Name : " + property.name + " | File Size : " + (property.size/1024).toFixed(2) + " KB","info");
  var reader = new FileReader();
  reader.onload = function (e) {
      $('#user_photo_preview').attr('src', e.target.result);
  }
  reader.readAsDataURL(this.files[0]);
 

});

  $('#memberForm').on('submit', function (event) {
  event.preventDefault();

  if (!this.checkValidity()) {
    event.stopPropagation();
    $(this).addClass('was-validated');
    return;
  }

  $(this).addClass('was-validated');

  user_photo_addr = upload_user_photo(property,"user_photo","#user_photo_preview");
});

$("#team_select").on("change", function(event) {
  event.preventDefault();
  // your logic here

  if($(this).val() != "")
  {
    $("#amount").prop("disabled", false);
     $("#amount").focus()
  }

    
});


$("#amount").on("input", function(event) {
 
  // TODO: handle live input change
var selected = $('#team_select option:selected');

// Get its data attributes
var icFactor   = selected.data('ic_factor');
var dcFactor   = selected.data('dc_factor');
var timePeriod = selected.data('time_period');
var dc = parseFloat($(this).val()) * parseFloat(dcFactor)



var interest_only = (parseFloat($(this).val()) + parseFloat(dc)) * icFactor 
var total =  (parseFloat($(this).val()) + parseFloat(dc))  + interest_only
var amount_week = total/timePeriod;
console.log(total);



$("#summary_table").find("tr").eq(0).find("td").eq(0).html($(this).val() +  "(" + total + ")")
$("#summary_table").find("tr").eq(1).find("td").eq(0).html(timePeriod + " Weeks" + "(" + amount_week + ")")
$("#summary_table").find("tr").eq(2).find("td").eq(0).html(dc)
$("#summary_table").find("tr").eq(3).find("td").eq(0).html(parseFloat($(this).val()) - dc)

});

});


  function get_team_dropdown()
   {
    
   
   $.ajax({
     url: "php/get_team_dropdown.php",
     type: "get", //send it through get method
     data: {
     
     },
     success: function (response) {
   console.log(response);
   
   
   if (response.trim() != "error") {

    if (response.trim() != "0 result")
    {
   
     var obj = JSON.parse(response);
   var count =0 
   
   
     obj.forEach(function (obj) {
        count = count +1;
$('#team_select').append("<option value='"+obj.id+"' data-ic_factor='"+obj.ic_factor+"' data-dc_factor='"+obj.dc_charge_calculation+"' data-time_period='"+obj.time_period+"'>"+obj.group_mem+"</option>")

     });
   
    
   }
   else{
   // $("#@id@") .append("<td colspan='0' scope='col'>No Data</td>");
 
   }
  }
   
  
   
   
       
     },
     error: function (xhr) {
         //Do Something to handle error
     }
   });
   
   
   
      
   }


 function upload_user_photo(property,fname,preview)
  {
    if (!property) {
      return; // No file selected
  }
    var file_name = property.name;
    var file_extension = file_name.split('.').pop().toLowerCase();
  {
   var form_data = new FormData();
   form_data.append("file",property);
var different_address = "no"
var leader = "no"

if($("#leader").prop("checked") == true) 
{
    leader = "yes"
}
if($("#different_address").prop("checked") == true) 
{
    different_address = "yes"
}

   form_data.append("file_name", + "demo" + file_extension);
   form_data.append("file_name","demo" + "." + file_extension);
     form_data.append("file_ext",file_extension);
      form_data.append("user_name",$("#user_name").val());
   
    form_data.append("nominee_name",$("#nominee_name").val());
    form_data.append("phone",$("#phone").val());
    form_data.append("nominee_phone",$("#nominee_phone").val());
    form_data.append("phone2",$("#phone2").val());
    form_data.append("nominee_phone2",$("#nominee_phone2").val());
    form_data.append("aadhar",$("#aadhar").val());
    form_data.append("nominee_aadhar",$("#nominee_aadhar").val());
    form_data.append("city",$("#city").val());
    form_data.append("nominee_relationship",$("#nominee_relationship").val());
    form_data.append("different_address",different_address);
    form_data.append("district",$("#district").val());
    form_data.append("nominee_city",$("#nominee_city").val());
    form_data.append("pincode",$("#pincode").val());
    form_data.append("nominee_district",$("#nominee_district").val());
    form_data.append("location_url",$("#location_url").val());
    form_data.append("nominee_pincode",$("#nominee_pincode").val());
    form_data.append("nominee_location_url",$("#nominee_location_url").val());
    form_data.append("team_id",$("#team_id").val());
    form_data.append("amount",$("#amount").val());
    form_data.append("interest",$("#interest").val());
    form_data.append("verification",$("#verification").val());
    form_data.append("nominee_verification",$("#nominee_verification").val());
    form_data.append("leader",$("#leader").val());
   form_data.append("dc_amount","0");
       form_data.append("after_dc_factor_amount","0");
         form_data.append("interest","0");
         form_data.append("totalAmount","0");
           form_data.append("pending_amount","0");
       // Show the overlay and reset progress bar
      
   
        $.ajax({
            url:'upload_user_photo.php',
            method:'POST',
            data:form_data,
            contentType:false,
            cache:false,
            processData:false,
            beforeSend:function(){
            //  $('#msg').html('Loading......');
            console.log('Loading......');
           
            },
           
            success:function(data){
            
           
             console.log(data);
             // $('#msg').html(data);
             var timestamp = new Date().getTime(); // Get current timestamp
            
             $(preview).attr("src", "attachment/delivery/" + did + "/" + $("#chasis_no").val() + "." + file_extension + "?" + timestamp);
             $("#dsubmit").show()
         
          
            }
          });
        
    }
  return  "attachment/delivery/"+ did + "/" + $("#chasis_no").val() + "." + file_extension
  }


  

   



function check_login()
{
 
if (localStorage.getItem("logemail") == null && phone_id == null )  {
 window.location.replace("login.html");
}
else if (localStorage.getItem("logemail") == null && phone_id != null )
 {
get_current_userid_byphoneid();
$('#menu_bar').hide()
 }

 else
 {
   
 }
}


function get_current_userid_byphoneid()
   {
     $.ajax({
       url: "php/get_current_employee_id_byphoneid.php",
       type: "get", //send it through get method
       data: {
         phone_id:phone_id,
        
      
      },
       success: function (response) {
      
      
      if (response.trim() != "error") {
       var obj = JSON.parse(response);
      

      console.log(response);
      
      
       obj.forEach(function (obj) {
         current_user_id = obj.emp_id;
         current_user_name =  obj.emp_name;
       });
      
    //    get_sales_order()
      }
      
      else {
       salert("Error", "User ", "error");
      }
      
      
         
       },
       error: function (xhr) {
           //Do Something to handle error
       }
      });
   }

  
   function shw_toast(title,des,theme)
   {
   
     
         $('.toast-title').text(title);
         $('.toast-description').text(des);
   var toast = new bootstrap.Toast($('#myToast'));
   toast.show();
   }  

   function get_millis(t)
   {
    
    var dt = new Date(t);
    return dt.getTime();
   }



   function get_cur_millis()
   {
    var dt = new Date();
    return dt.getTime();
   }


   function get_today_date(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var hour = date.getHours();
    var mins = date.getMinutes();
  
console.log(mins)

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
 
    var today = year + "-" + month + "-" + day +"T"+ hour + ":"+ mins; 
    return today;
   }

   function get_today_start_millis(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
 
    var today = year + "-" + month + "-" + day +"T00:00"; 

    return get_millis(today)
     
   }


   function get_today_end_millis(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
 
    var today = year + "-" + month + "-" + day +"T23:59"; 

    return get_millis(today)
     
   }

   function salert(title, text, icon) {
  

    swal({
        title: title,
        text: text,
        icon: icon,
    });
}



function millis_to_date( millis)
{
  var d = new Date(millis); // Parameter should be long value

  
return d.toLocaleString('en-GB');

}