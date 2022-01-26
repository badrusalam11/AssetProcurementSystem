$(document).ready(function () {
    let api = $('#Table').DataTable(
        {
            //ajax: { url: "https://localhost:44378/API/Employees", dataSrc: '' },
            //dataType: 'json',
            //columns: [
            //    {
            //        data: null,
            //        render: (data, type, row, meta) => {
            //            return (meta.row + 1);
            //        }
            //    },
            //    { data: "nik" },
            //    {
            //        data: "null",
            //        render: function (data, type, row) {
            //            return `${row['firstName']} ${row['lastName']}`;
            //        }
            //    },
            //    { data: "phone" },
            //    {
            //        data: "null",
            //        render: function (data, type, row) {
            //            if (row['gender'] == 0) {
            //                return "Laki-laki";
            //            }
            //            else {
            //                return "Perempuan";
            //            }
            //        }
            //    },
            //    {
            //        data: "null",
            //        render: (data, type, row) => {
            //            var dataGet = new Date(row['birthDate']);
            //            return dataGet.toLocaleDateString();
            //        }
            //    },
            //    { data: "email" },
            //    { data: "salary" },
            //    {
            //        data: "null",
            //        render: function (data, type, row) {
            //            return `<button class="btn btn-warning fa fa-edit"></button> <button class="btn btn-danger fa fa-trash"></button>`;
            //        }
            //    }

            //],
            ////    dom: 'Bfrtip',
            ////    buttons: [
            ////        'copy', 'csv', 'excel', 'pdf', 'print'
            ////    ]

            ////}
            dom: 'Bfrtip',
            scrollX: 'true',
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: "List Barang",
                    className: "btn btn-secondary",
                    text: "<i class='fas fa-clone'> Copy</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'csvHtml5',
                    title: "List Barang",
                    className: "btn btn-warning",
                    text: "<i class='fas fa-table'> CSV</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: "List Barang",
                    className: "btn btn-success",
                    text: "<i class='fas fa-file-excel'> Excel</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: "List Barang",
                    className: "btn btn-danger",
                    text: "<i class='fas fa-file-pdf'> PDF</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'print',
                    title: "List Barang",
                    className: "btn btn-primary",
                    text: "<i class='fas fa-print'> Print</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }
            ]

        });
    console.log(api);
});

function insertKeranjang() {
    // ajax here

    Swal.fire({
        iconHtml: '<i class="fas fa-shopping-cart"></i>',
        title: 'Berhasil',
        text: "Dimasukkan ke keranjang"
    })
}