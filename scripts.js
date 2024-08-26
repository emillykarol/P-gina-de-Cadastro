const end = document.querySelector('#endereco')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')
const cep = document.querySelector('#cep')
const num = document.querySelector('#numero')


function preencherEndereco(endereco) {
    bairro.value = endereco.bairro
    cidade.value = endereco.localidade
    estado.value = endereco.uf
    end.value = endereco.logradouro
    numero.focus()
}
// funcao q retorna bool geralmente começa com is...
// se for true retorna, se nao vai false
function isCepValid(cep){
    return cep.length === 8 && /^[0-9]+$/.test(cep)
}

// regexr.com  regular expression /^[0-9]+$/

// evento  focusout blur
function buscarEndereco(){
    const cep = document.querySelector('#cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`

    if (isCepValid(cep)){
        fetch(url)
            .then(response => {
                return response.json()
            }).then(dados => {
                if (dados.hasOwnProperty("erro")){
                    end.value = "Endereço não encontrado :/"
                }else{
                    preencherEndereco(dados)
                }
            })
    }
    else{
        end.value = 'Cep Inválido'
    }


}
// blur é o evento quando sair o foco
cep.addEventListener('blur', buscarEndereco)