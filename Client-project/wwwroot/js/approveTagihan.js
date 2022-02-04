$(document).ready(function () {
    let isScrollX;
    if (window.matchMedia("(max-width: 425px)").matches) {
        // Viewport is less or equal to 700 pixels wide
        console.log('kurang dari atau sama dengan 425px');
        isScrollX = true;
    }
    else {
        console.log('lebih dari 425px');
        isScrollX = false;
    }

    let table = $('#Table').DataTable(
        {
            ajax: { url: "https://localhost:44331/api/tagihan", dataSrc: '' },
            dataType: 'json',
            columns: [
                {
                    data: null,
                    //bSortable: false,
                    render: (data, type, row, meta) => {
                        //return (meta.row + 1);
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                //{ data: 'name' },
                {
                    //data: 'uploadDate'
                    data: "null",
                    render: (data, type, row) => {
                        let myArray = row['uploadDate'].split("T");
                        myArray = myArray[0].split("-");
                        let tanggal = myArray[2] + "/" + myArray[1] + "/" + myArray[0];
                        return tanggal;
                        //var dataGet = new Date(row['uploadDate']);
                        //return dataGet.toLocaleDateString();
                    }
                },
                {
                    //data: 'totalBayar'
                    data: "totalBayar",
                    render: DataTable.render.number('.', ',', 2, 'Rp ')
                },
                {
                    //data: 'statusPembayaran'
                    data: null,
                    render: (data, type, row) => {
                        if (row['statusPembayaran'] == true) {
                            return "Paid";
                        }
                        else {
                            return "Unpaid";   
                        }
                    }
                },
                {
                    //data: 'isConfirm'
                    data: null,
                    render: (data, type, row) => {
                        if (row['isConfirm'] == true) {
                            return "Confirmed";
                        }
                        else {
                            return "Process";
                        }
                    }
                },
                {
                    data: null,
                    bSortable: false,
                    render: function (data, type, row) {
                        
                            return `
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#detailModel" onclick="showDetail('${row['id']}')" ><i class="fas fa-info-circle"></i></button>
                        <button class="btn btn-success text-white me-2" onclick="Approve('${row['id']}')"><i class=" fas fa-check"></i></button>
                       
                    </div>
                        `;

                    }
                },
            ],
            dom: 'Bfrtip',
            scrollX: isScrollX,
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: "Active Bills",
                    className: "btn btn-secondary",
                    text: "<i class='fas fa-clone'> Copy</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'csvHtml5',
                    title: "Active Bills",
                    className: "btn btn-warning",
                    text: "<i class='fas fa-table'> CSV</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: "Active Bills",
                    className: "btn btn-success",
                    text: "<i class='fas fa-file-excel'> Excel</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: "Active Bills",
                    className: "btn btn-danger",
                    text: "<i class='fas fa-file-pdf'> PDF</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'print',
                    title: "Active Bills",
                    className: "btn btn-primary",
                    text: "<i class='fas fa-print'> Print</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }
            ]

        });
});

function Approve(id) {
    // ajax here
    
    Swal.fire({
        title: 'Are you sure want to Approve?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:44331/api/tagihan/ApproveTagihan/"+id,
                contentType: "application/json;charset=utf-8",
                type: "PUT"
            }).done((result) => {
                Swal.fire(
                    'Approved!',
                    'Request Approved',
                    'success'
                );
                let table = $('#Table').DataTable();
                table.ajax.reload();
            }).fail((error) => {
                //alert pemberitahuan jika gagal
                console.log("data tidak masuk");
            })
            
        }
    })
}

//function Reject(id) {
//    // ajax here

//    Swal.fire({
//        title: 'Are you sure want to Reject?',
//        icon: 'warning',
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Yes',
//        cancelButtonText: 'No'
//    }).then((result) => {
//        if (result.isConfirmed) {
//            $.ajax({
//                url: "https://localhost:44331/api/tagihan/RejectTagihan/" + id,
//                contentType: "application/json;charset=utf-8",
//                type: "PUT"
//            }).done((result) => {
//                Swal.fire(
//                    'Reject!',
//                    'Request Reject',
//                    'success'
//                );
//                let table = $('#Table').DataTable();
//                table.ajax.reload();
//            }).fail((error) => {
//                //alert pemberitahuan jika gagal
//                console.log("data tidak masuk");
//            })

//        }
//    })
//}

function showDetail(id) {
    $.ajax({
        url: "https://localhost:44331/api/tagihan/" + id,
        contentType: "application/json;charset=utf-8"
    }).done((result) => {
        console.log(result);
        let myArray = result.uploadDate.split("T");
        myArray = myArray[0].split("-");
        let tanggal = myArray[2] + "/" + myArray[1] + "/" + myArray[0];
        $('#date').html(tanggal);

        $('#totalBill').html(formatRupiah(result.totalBayar,"Rp"));

        result.statusPembayaran ? $('#paymentStatus').html("Paid") : $('#paymentStatus').html("Unpaid");
        result.isConfirm ? $('#confirmStatus').html("Confirmed") : $('#confirmStatus').html("Process");
        if (result.notaID==null) {
            //$('#gambarBukti').attr("hidden", true);
            $('#gambarBukti').attr("src", 'https://localhost:44381/img/default.png');
        }
        else {
            $('#gambarBukti').attr("src", 'https://localhost:44381/img/' + result.nota.image);
        }
    }).fail((error) => {
        console.log(error);
    });
}

function formatRupiah(angka, prefix) {
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}