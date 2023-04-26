async function buscaendereco() {
    const consultaCep = await fetch('https://viacep.com.br/ws/81250615/json/')
    const consultaCepConvertida = await consultaCep.json();
    console.log(consultaCepConvertida);
}

buscaendereco();