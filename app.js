// listen for submit button
const form= document.querySelector('#loan-form');


// add event listener
form.addEventListener('submit', function (e) {
  // Hide Results
  document.getElementById('Results').style.display='None';

  // show loader
  document.getElementById('loading').style.display='block';


  setTimeout(calculateResults, 2000);

  e.preventDefault();
  
});

function calculateResults() {

  const ulamount= document.getElementById('amount');
  const ulInterest= document.getElementById('interest');
  const ulyears = document.getElementById('years');
  const ulmonthly= document.getElementById('monthly payments');
  const ultotalpayment = document.getElementById('Total-payment');
  const ultotalinterest = document.getElementById('total-interest');



  // calculations
   const principal= parseFloat(ulamount.value);
   const calculatedInterest = parseFloat(ulInterest.value) / 100 / 12;
   const calculatedPayment = parseFloat(ulyears.value) * 12

  //  compute monthly interest
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  // once calculation is done, check if value is a finite number

  if (isFinite(monthly)) 
  {ulmonthly.value= monthly.toFixed(2);
    ultotalpayment.value =(monthly * calculatedPayment).toFixed(2);
    ultotalinterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);

    // show results
    document.getElementById('Results').style.display='block';

    // hide loader
    document.getElementById('loading').style.display='None';
    
  } else {
    // console.log('please check yur numbers')
    showError('Please check your numbers')
  }


}
function showError(error) {
  const card = document.querySelector('.card')
  const heading = document.querySelector('.Heading')
  // create new element
  const errordiv = document.createElement("div");
  // add a class
  errordiv.className= 'alert alert-danger'
  // append text node
  errordiv.appendChild(document.createTextNode(error))
  
  // insert created element
   card.insertBefore(errordiv, heading)

  // clear error after 3 seconds
  setTimeout(clearError, 3000)

  // hide loader
  document.getElementById('loading').style.display='None';
}

// clear error
function clearError() {
  document.querySelector('.alert').remove();
}