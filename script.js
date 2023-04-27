async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('CEP não existente')
        }
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;

        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

let cep = document.getElementById('cep')
cep.addEventListener('focus', () => buscaEndereco(cep.value));


