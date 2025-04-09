const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Aprovado" width="20" height="20">';
const imgReprovado = '<img src="./images/reprovado.png" alt="Reprovado" width="20" height="20">';
let linhas = '';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Qual a nota mínima para aprovação?'));

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
    // Limpar os campos de entrada após adicionar a linha
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Verifica se a atividade já foi adicionada
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi adicionada`);
        return;
    } else {
        // Verifica se os campos estão preenchidos
        if (inputNomeAtividade.value && inputNotaAtividade.value) {
            let linha = '<tr>';
            linha += `<td>${inputNomeAtividade.value}</td>`;
            linha += `<td>${inputNotaAtividade.value}</td>`;
            linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
            linha += '</tr>';

            linhas += linha;

            // Adiciona os valores aos arrays
            atividades.push(inputNomeAtividade.value);
            notas.push(parseFloat(inputNotaAtividade.value));

            // Limpa os campos de entrada
            inputNomeAtividade.value = '';
            inputNotaAtividade.value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal(); 

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}

function calculaMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}