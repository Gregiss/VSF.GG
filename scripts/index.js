var app = new Vue({
    el: "#app",
    data: {
        links: [
            { "name": "Home", "ativo": true},
            {"name": "Support"}
        ],
        linkAtivo: { "name": "Home", "ativo": true},
        domain: "VSF.GG",
        user: {"nickname" : null}
    },
    mounted() {
        document.title = this.domain
    },
    methods: {
        acessLink(link) {
            for(var i = 0; i < this.links.length; i++){
                this.links.ativo = false
            }
            link.ativo = true
            const index = this.links.indexOf(link)
            this.links[index].ativo = true
            this.linkAtivo = this.links[index]
            document.title = "VSF.GG |" + " " + link.name
        }
    }
})