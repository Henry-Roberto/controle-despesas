class DespesasController {

    constructor(formLancamento, tabelaLancamentos) {

        console.log('DespesasController Ok!');
        this.formEl = document.getElementById(formLancamento);
        this.tableEl = document.getElementById(tabelaLancamentos);

        this.init();
    }

    init() {

        this.salvarLancamento();
        this.eventoBtnComprovante();

    }

    eventoBtnComprovante() {

        let btn = document.querySelector(".input-comprovante-lancamento-estilizado");

        btn.addEventListener('click', e => {

            let inputComprovante = document.querySelector("#input-comprovante-lancamento");

            inputComprovante.click();

        });

    }

    salvarLancamento() {
        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let lancamento = {};

            [...this.formEl].forEach(function(campo, index) {

                lancamento[campo.name] = campo.value;
                campo.value = '';
            });

            lancamento.valor = parseFloat(lancamento.valor);

            btn.disabled = false;

            if (!lancamento.descricao || !lancamento.data || !lancamento.valor) {
                alert(`Dados obrigatorios não preenchidos!`);
                return;
            }

            this.adicionarLista(lancamento);

        });
    }

    adicionarLista(dadosLancamento, tr = null) {

        let classeTd = '';

        if (tr == null) tr = document.createElement('tr');

        if (dadosLancamento.valor > 0) {
            classeTd = "td-positivo";
        } else if (dadosLancamento.valor < 0) {
            classeTd = "td-negativo";
        }

        let lancamentoValor = parseFloat(dadosLancamento.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        tr.innerHTML = `
        <tr class="tr-registro">
            <td class="data-table ${classeTd}">${this.formatarData(dadosLancamento.data)}</td>
            <td class="descricao-table ${classeTd}">${dadosLancamento.descricao}</td>
            <td>
                <p class="observacao-item ${classeTd}">${dadosLancamento.observacao}</p>
            </td>
            <td class="valor-table ${classeTd}">${lancamentoValor}</td>
            <td class="documento-table ${classeTd}">
                <a href="https://i.pinimg.com/236x/15/ba/b4/15bab4ee6c41dae1c5cbe3af0d9b6ef2.jpg" target="_blank" rel="noopener noreferrer"><img src="assets/img/icon-documento.png" alt="" style="width: 1.3vw;"></a>
            </td>
        </tr>
        `
        this.tableEl.appendChild(tr);

    }

    formatarData(data) {

        let dataFormatada = data.split('-');

        return dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0];
    }




}