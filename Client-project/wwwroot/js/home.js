console.log("INI DASBOARD")

$.ajax({
    url: "https://localhost:44381/employee/GetUserData"
}).done((result) => {
    $("#dasWelcom").html("Hi " + result.firstName + " " + result.lastName);
    $("#subWelcom").html("Welcome to Asset Procurement System");
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: 'https://localhost:44331/Api/Peminjaman/Loan/Active/' + localStorage.getItem("accountID")
}).done((result) => {
    $("#lengtActiveLoan").html(result.length);
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: 'https://localhost:44331/Api/Peminjaman/Loan/History/' + localStorage.getItem("accountID")
}).done((result) => {
    $("#lengtHistoryLoan").html(result.length);
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: 'https://localhost:44331/Api/Peminjaman/Loan/ReturnRequest'
}).done((result) => {
    $("#returnRequestLoan").html(result.length);
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: 'https://localhost:44331/Api/Peminjaman/Loan/Active'
}).done((result) => {
    $("#allActiveLoans").html(result.length);
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: 'https://localhost:44331/Api/Peminjaman/Loan/Request'
}).done((result) => {
    $("#lengtRequestLoan").html(result.length);
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: "https://localhost:44331/api/Tagihan/GetTagihan/" + localStorage.getItem("accountID")
}).done((result) => {
    $("#myBillLent").html(result.length);
}).fail((error) => {
    console.log(error);
});

$.ajax({
    url: "https://localhost:44331/api/tagihan"
}).done((result) => {
    $("#aproveBill").html(result.length);
}).fail((error) => {
    console.log(error);
});
