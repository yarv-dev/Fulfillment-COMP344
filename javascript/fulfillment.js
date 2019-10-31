(function () {
    let markedAsFulfilled = [];
    // Add Click even listener to print 
    let icons = document.querySelectorAll('.print-icon');
    icons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            let rowToPrintId = event.target.parentNode.parentNode.parentNode.children[0].innerHTML;
            console.log(rowToPrintId);
            $('#shipment').load('./print.php?shipmentId='+rowToPrintId,function(){
                var printContent = document.getElementById('shipment');
                var WinPrint = window.open('', '', 'width=1000,height=650');
                WinPrint.document.write(printContent.innerHTML);
                WinPrint.document.close();
                WinPrint.focus();
                setTimeout(() => {
                    WinPrint.print();
                    WinPrint.close();
                }, 200)
                
            });          
        });
    });
    

    // Add Change event listener to print 
    let checkboxes = document.querySelectorAll('.fulfillable-checkbox');
    checkboxes.forEach((checkbox)=>{
       checkbox.addEventListener('change', (e) => {
           let id = event.target.parentNode.parentNode.parentNode.children[0].innerHTML;
            if (event.target.checked) {
                // Get Shipment id in row selected and add it to marked as filfilled array
                markedAsFulfilled.push(id);
            } else {
                // get shipment id in row selected and remove it from marked as fulfilled array
                let index = markedAsFulfilled.indexOf(id);
                if (index !== -1) markedAsFulfilled.splice(index, 1);
            }
            
        })
    })

    // Attempt to fulfill marked orders in marked orders array

    document.querySelector('#process').addEventListener('click', (e) => {
        const url = '/api/update.php';
        const data = { orderids: markedAsFulfilled };
        console.log(data);
        fetch(url, {  
            method: 'POST',  
             body: JSON.stringify(data)
        })
        .then(function (response) {
            return response.text();
          })
          .then(function (body) {
            console.log(body);
            location.reload(true);
          });
    });
    
})();

$(document).ready(function(){
   
});