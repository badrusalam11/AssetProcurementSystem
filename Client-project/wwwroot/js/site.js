// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
//$.ajax({
//    url: "https://localhost:44331/API/types"
//}).done((result) => {
//    console.log(result);
//}).fail((error) => {
//    console.log(error);
//});

$.ajax({
    url: "https://localhost:44381/employee/GetUserData"
}).done((result) => {
    localStorage.setItem("employeeID", result.id);
    localStorage.setItem("accountID", result.account.id);
    $("#user_name").html(result.firstName + " " + result.lastName);
}).fail((error) => {
    console.log(error);
});

