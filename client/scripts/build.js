var app = {
    init: function () {

    },
    config: {
        host: location.origin,
        token: localStorage.getItem("token"),
        timeOutCache: null,
        timeOutCache2: null,
        timeOutTemp: null,
        traducaoDT: {
            "sProcessing": '<h1 id="loadAnimation" class="ajax-loading - animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>',
            "sLengthMenu": "_MENU_",
            "sZeroRecords": '<span id="noResults">Nenhum registro encontrado.</span>',
            "sInfoEmpty": "Exibindo 0 a 0 de 0 registros",
            "sInfo": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
            "sInfoFiltered": "",
            "sSearch": "",
            "oPaginate": {
                "sFirst": "Primeiro",
                "sPrevious": "Anterior",
                "sNext": "Próximo",
                "sLast": "Último"
            }
        },
        infoServidor: null
    },
}



/* Variaveis */
//......
/* fim Variaveis */

app.init();