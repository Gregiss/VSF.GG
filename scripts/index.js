var app = new Vue({
    el: "#app",
    data: {
        links: [
            { "name": "Home", "ativo": true},
            {"name": "Support"}
        ],
        linkAtivo: { "name": "Home", "ativo": true},
        domain: "VSF.GG",
        user: {"nickname" : null},
        logged: false,
        api: "RGAPI-4047f1e0-4555-42e9-9423-465b734b71ee"
    },
    mounted() {
        document.title = this.domain
        //this.post("https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/vsf%20alek%20vs?api_key=" + this.api)
        
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
        },
        post(url){
            axios.get(url)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            })
        },
        changeNickName(){
            if(this.user.nickname == '' || this.user.nickname == null)
            {
                 this.logged = false
                 this.post("https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/kaway404?api_key=" + this.api)
            }
            else{
                this.logged = true
            }
        }
    }

})