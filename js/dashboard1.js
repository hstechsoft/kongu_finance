
var urlParams = new URLSearchParams(window.location.search);
var phone_id = urlParams.get('phone_id');
  var current_user_id =  localStorage.getItem("ls_uid") ;
var current_user_name =  localStorage.getItem("ls_uname") ; 
 var physical_stock_array = [];
$(document).ready(function(){
 $("#individual_div").hide()
  
//   $("#menu_bar").load('menu.html',
//     function() { 
//       var lo = (window.location.pathname.split("/").pop());
//       var web_addr = "#"+ (lo.substring(0, lo.indexOf(".")))
 
    
//      if($(web_addr).find("a").hasClass('nav-link'))
//      {
//       $(web_addr).find("a").toggleClass('active')
//      }
//      else if($(web_addr).find("a").hasClass('dropdown-item'))
// {
// $(web_addr).parent().parent().find("a").eq(0).toggleClass('active')
// }
      
     
//     }
//  );



    // check_login();
    
  $("#unamed").text(localStorage.getItem("ls_uname"))

const dateInput = document.getElementById('demo_date');
  const today = new Date().toISOString().split('T')[0];

  // Disable dates after today
  dateInput.setAttribute('max', today);

  // Auto validate when user selects/enters a date
  dateInput.addEventListener('input', function () {
    if (dateInput.value > today) {
      dateInput.classList.add('is-invalid');
    } else {
      dateInput.classList.remove('is-invalid');
    }
  });



get_team_dropdown()

      $("#switch_view").on("change", function(event) {

 $("#group_div").toggle();
 
 $("#individual_div").toggle();

});


$("#team_select").on("change", function(event) {
  event.preventDefault();
  // your logic here
  get_team_members($(this).val())
});

$("#member_select").on("change", function(event) {
  event.preventDefault();
  // your logic here
  $("#group_txt").text("individual Payment Entry")
   $("#group_txt").closest(".card-header").addClass("text-bg-success")

    get_payment_dashboard($(this).val());
});


});


 function get_team_members(team_id)
   {
    
   
   $.ajax({
     url: "php/get_team_members_dropdown.php",
     type: "get", //send it through get method
     data: {
     team_id : team_id
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
$('#member_select').append("<option value='"+obj.id+"'>"+obj.member+"</option>")

     });
   
    get_emi_table(team_id)
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


   
 function get_emi_table(team_id)
   {
    
   
   $.ajax({
     url: "php/get_emi_table.php",
     type: "get", //send it through get method
     data: {
        team_id : team_id
     },
     success: function (response) {
   console.log(response);
   
   
   if (response.trim() != "error") {

    if (response.trim() != "0 result")
    {
   
     var obj = JSON.parse(response);
   var count =0 
let amountPay = parseInt($("#amount_pay").val()) || 0;

 
   
     obj.forEach(function (obj) {
        $("#pay_date").text("Payment On/Before - " + obj.collection_date)
        count = count +1;
        var pay_amount = obj.adv
        if(parseInt(obj.adv)<= 0)
        {
            let value = parseInt(obj.adv || 0, 10);

            pay_amount = "Advance available - " + Math.abs(value)
        }
$('#group_pay_table').append("<tr><td>"+count+"</td><td>"+obj.member+"</td><td>"+pay_amount+"</td><td contenteditable = 'true'>"+amountPay+"</td></tr>")

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
$('#team_select').append("<option value='"+obj.id+"' data-ic_factor='"+obj.ic_factor+"' data-dc_factor='"+obj.dc_charge_calculation+"' data-time_period='"+obj.time_period+"' data-leader='"+obj.leader_sts+"'>"+obj.group_mem+"</option>")

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




  function get_payment_dashboard(team_id)
   {
    
   
   $.ajax({
     url: "php/get_payment_dashboard.php",
     type: "get", //send it through get method
     data: {

team_id : team_id

     },
     success: function (response) {

      console.log(response);
   var count = 0;
    if (response.trim() != "error") {
       var obj = JSON.parse(response);
      

      
      
       obj.forEach(function (obj) {
     count = count + 1;
    //    $('#report_tbl').append("<tr><td>"+count+"</td><td>"+obj.collection_date+"</td><td>"+obj.expected_amount+"</td><td>"+obj.total_paid+"</td><td>"+obj.pending_balance+"</td><td>"+obj.amount_to_pay+"</td><td>"+obj.available_advance+"</td><td>"+obj.sts+"</td><td>"+obj.his_html+"</td></tr>")
       

        $('#report_tbl').append("<tr><td>"+count+"</td><td>"+obj.collection_date+"</td><td>"+obj.expected_amount+"</td><td>"+obj.total_paid+"</td><td>"+obj.amount_to_pay+"</td><td>"+obj.available_advance+"</td><td>"+obj.sts+"</td><td>"+obj.his_html+"</td></tr>")
       });
      
    //    get_sales_order()
      }
      
  
   
   
       
     },
     error: function (xhr) {
         //Do Something to handle error
     }
   });
   
   
   
      
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