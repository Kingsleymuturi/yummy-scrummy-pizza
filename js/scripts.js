var price, crust_price, topping_price;
let total = 0;
function getPizza(size, crust, topping, number, total) {
  this.size = size;
  this.crust = crust;
  this.topping = topping;
	this.number = number;
	this.total = total;
}

$(document).ready(function () {
  $("button.proceed").click(function(event){
  $("button.proceed").hide();
  $("#information").hide();
	$("div.choice").slideDown(1000);

	event.preventDefault();
	});
	$("button.proceed").click(function(event){
    let psize = $("#size option:selected").val();
		let pcrust = $("#crust option:selected").val();
		let pnumber = $("#number").val();
    let ptopping = [];
    $.each($("input[name='toppings']:checked"), function () {
      ptopping.push($(this).val());
    });
    
		
		switch (psize) {case "0": price = 0; break;
		case "small": price = 600; break;
		case "medium": price = 850; break;
    case "large": price = 1200; break;
    default:console.log("error");}
		
	if (psize == "large"){
		topping_value = ptopping.length *100;
	} else if(psize == "medium"){
		topping_value = ptopping.length *70;
	} else if(psize == "small"){
		topping_value = ptopping.length *50;
	}

	switch (pcrust) {case "0": crust_price = 0; break;
	case "Chicago Style Pan": crust_price = 300; break;
	case "Flat Bread": crust_price = 200; break;
	case "Stuffed Dough": crust_price = 150; break;
	case "Beer Battered": crust_price = 180; break;
	case "Neopolitan": crust_price = 150; break;
	case "St. Louis": crust_price = 250; break;
	default: console.log("No price");}

	if (psize == "0") {
		$("button.proceed").show();
		$("#information").show();
		$("div.choice").hide();
		document.getElementById("Invalid").innerText = "Please select size!"
    document.getElementById("Invalid").style.color ="yellow"
	} else if(pcrust == "0"){
		$("button.proceed").show();
		$("#information").show();
		$("div.choice").hide();
		document.getElementById("Invalid1").innerText = "Please select crust!"
    document.getElementById("Invalid1").style.color ="yellow"
	}  else if(ptopping.length == 0){
		$("button.proceed").show();
		$("#information").show();
		$("div.choice").hide();
		document.getElementById("Invalid3").innerText = "Please select at least one topping!"
    document.getElementById("Invalid3").style.color ="yellow"
	} else if(pnumber <= 0 || pnumber > 100){
		$("button.proceed").show();
		$("#information").show();
		$("div.choice").hide();
		document.getElementById("Invalid2").innerText = "Please select quantity among 1-100!"
    document.getElementById("Invalid2").style.color ="yellow"
	} else {
		$("button.proceed").hide();
		$("#information").hide();
		$("div.choice").slideDown(1000);
		$("button.deliver").hide();
		$("button#pick").hide();
	}

	total = pnumber*(price + crust_price + topping_value);
    let checkoutTotal = 0;
		checkoutTotal = checkoutTotal + total;
	
		
    $("#pizzasize").html($("#size option:selected").val());
		$("#pizzacrust").html($("#crust option:selected").val());
		$("#pizzanumber").html($("#number").val());
    $("#pizzatopping").html(ptopping.join(", "));
		$("#totals").html(total);
  
	
		$("button#checkout").click(function (event) {event.preventDefault();
      $("button#checkout").hide();
			$("button.deliver").slideDown(1000);
			$("button#pick").slideDown(1000);
			$("#addedprice").slideDown(1000);
      $("#pizzatotal").append("Your bill is sh. " + checkoutTotal);
		});
		
		$("button.deliver").click(function (event) {event.preventDefault();
			$(".pizzatable").hide();
			$("button#pick").hide();
      $(".choice h2").hide();
      $(".delivery").slideDown(1000);
      $("#addedprice").hide();
      $("button.deliver").hide();
      $("#pizzatotal").hide();
      let delamount = checkoutTotal + 300;
      console.log("Prepare sh. " + delamount + " to pay on delivery");
      $("#totalbill").append("Your total bill plus delivery fee is: " + delamount);
		});

		$("button#pick").click(function (event) {event.preventDefault();
			$("button#pick").hide();
			$("button.deliver").hide();
			$(".pizzatable").hide();
			$("#pizzatotal").hide();
			$("#addedprice").hide();
			$(".choice h2").hide();
			$(".pickitup").slideDown(1000);
		});

		$("button#final-pick").click(function (event) {event.preventDefault();
			$(".pickitup").hide();
			$("button#final-pick").hide();
			let personpick = $("input#pickname").val();

			if ($("input#pickname").val() != ""){
				$("#pickup").append("Your bill is sh. " + checkoutTotal + " .Come with this amount to our shop to pick up your order. Call 0732998119 to confirm if your order is ready. Thank you " + personpick + " for shopping at Yummy Scrummy Pizza!");
			  $("#pickup").slideDown(1200);
			} else {
				$(".pickitup").show();
			  $("button#final-pick").show();
				document.getElementById("invalid1").innerText = "Please enter your name"
			  document.getElementById("invalid1").style.color ="yellow"
			}
		});

		
		$("button#final-order").click(function (event) {
      event.preventDefault();

      $("#pizzatotal").hide();
      $(".delivery").hide();
      $("button#final-order").hide();
      let delamount = checkoutTotal + 300;
      console.log("Final Bill is: " + delamount);
      let person = $("input#name").val();
      let phone = $("input#phone").val();
      let location = $("input#location").val();

      if ($("input#name").val() && $("input#phone").val() && $("input#location").val() != "") {

        $("#finallmessage").append(person + ", " + phone +", We have recieved your order and it will be delivered to you at " + location + ". Prepare sh. " + delamount);
        $("#totalbill").hide();
        $("#finallmessage").slideDown(1200);
      } else {
        alert("Please fill in the details for delivery!");
        $(".delivery").show();
        $("button#final-order").show();
      }
    });
    event.preventDefault();
	});
});



function sendMsg() {
	var name = $("#NAME").val();
	var email = $("#EMAIL").val();
	var message = $("#MESSAGE").val();
	if (name !== "" && email !== "" && message !== ""){
		alert("Hey " + name + "! Thank you for your message! We will review it and give you feedback. Check your email for our feedback soon.")
  }
};
