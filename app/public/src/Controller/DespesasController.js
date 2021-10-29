class DespesasController {

    constructor() {
        console.log('DespesasController on!');

        this.formEl = document.querySelector("#form-lancamento");
        this.tableEl = document.querySelector("#tabela-lancamentos");
        this.filtroMes = document.querySelector(".filtro-mes")
        this.filtroAno = document.querySelector(".filtro-ano");

        this.listaLancamento = [{
            comprovante: "",
            data: "2021-10-13",
            descricao: " dsfdfd",
            observacao: "",
            valor: 40.5
        }];
        this.listaLancamentosSelecionados = [];

        this.dataAtual = new Date();
        this.mesSelecionado = this.dataAtual.getMonth();
        this.anoSelecionado = this.dataAtual.getFullYear();

        this.onInit();
    }

    onInit() {

        this.salvarLancamento();
        this.eventoBtnComprovante();
        this.selecaoFiltros();
        this.carregarLista();

    }

    limparListaDisplay() {

        this.tableEl.querySelectorAll('tr').forEach(e => {

            e.remove();

        });

    }

    selecaoFiltros() {

        this.filtroAno.addEventListener('change', e => {

            this.carregarLista(this.mesSelecionado, this.filtroAno.value);

        });

        this.filtroMes.querySelectorAll(".btn-filtro-mes").forEach(e => {

            e.addEventListener("click", e => {

                this.carregarLista(e.target.value, this.anoSelecionado);

            });

        });

    }

    mudarMesConteiner(filtroMes) {

        let dataFiltradaEl = document.querySelector('#data-filtrado');

        switch (filtroMes) {
            case 0:
                dataFiltradaEl.innerHTML = 'Jan';
                break;
            case 1:
                dataFiltradaEl.innerHTML = 'Fev';
                break;
            case 2:
                dataFiltradaEl.innerHTML = 'Mar';
                break;
            case 3:
                dataFiltradaEl.innerHTML = 'Abr';
                break;
            case 4:
                dataFiltradaEl.innerHTML = 'Mai';
                break;
            case 5:
                dataFiltradaEl.innerHTML = 'Jun';
                break;
            case 6:
                dataFiltradaEl.innerHTML = 'Jul';
                break;
            case 7:
                dataFiltradaEl.innerHTML = 'Ago';
                break;
            case 8:
                dataFiltradaEl.innerHTML = 'Set';
                break;
            case 9:
                dataFiltradaEl.innerHTML = 'Out';
                break;
            case 10:
                dataFiltradaEl.innerHTML = 'Nov';
                break;
            case 12:
                dataFiltradaEl.innerHTML = 'Dez';
                break;

            default:
                break;
        }

    }

    carregarLista(filtroMes = this.mesSelecionado, filtroAno = this.anoSelecionado) {

        this.mesSelecionado = filtroMes;
        this.anoSelecionado = filtroAno;
        this.listaLancamentosSelecionados = [];
        this.mudarMesConteiner(filtroMes);
        this.limparListaDisplay();

        this.listaLancamento.sort(function(a, b) {
            if (a.data > b.data) {
                return 1;
            }
            if (a.data < b.data) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })

        this.listaLancamento.forEach(lancamento => {

            let mes = lancamento.data.split('-');

            if (filtroMes === mes[1] - 1 && filtroAno == mes[0]) {

                this.listaLancamentosSelecionados.push(lancamento);
                this.adicionarLista(lancamento);
                console.log(this.listaLancamentosSelecionados);
                this.calculoValorMes(this.listaLancamentosSelecionados);

            }
        });

    }

    calculoValorMes(listaLancamentosFiltrada) {

        let valorDataFiltrado = document.querySelector('#valor-data-filtrado');
        let valorMes = 0;
        console.log(valorMes);
        listaLancamentosFiltrada.forEach(element => {

            valorMes += element.valor;

        });

        valorDataFiltrado.style.color = 'rgb(221, 221, 221)';

        if (valorMes > 0) {
            valorDataFiltrado.style.color = "rgb(54, 181, 60)";
        } else if (valorMes < 0) {
            valorDataFiltrado.style.color = "rgb(211, 75, 75)";
        }

        valorDataFiltrado.innerHTML = `Saldo: ${valorMes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

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

            this.listaLancamento.push(lancamento);

            this.carregarLista();

        });
    }

    adicionarLista(dadosLancamento, tr = null) {

        let classeTd = '';

        if (tr == null) tr = document.createElement('tr');

        if (dadosLancamento.valor > 0) {
            classeTd = "valor-positivo";
        } else if (dadosLancamento.valor < 0) {
            classeTd = "valor-negativo";
        }

        let lancamentoValor = parseFloat(dadosLancamento.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        tr.innerHTML = `
            <td class="data-table ${classeTd}">${this.formatarData(dadosLancamento.data)}</td>
            <td class="descricao-table ${classeTd}">${dadosLancamento.descricao}</td>
            <td>
                <p class="observacao-item ${classeTd}">${dadosLancamento.observacao}</p>
            </td>
            <td class="valor-table ${classeTd}">${lancamentoValor}</td>
            <td class="documento-table ${classeTd}">
                <a href="https://i.pinimg.com/236x/15/ba/b4/15bab4ee6c41dae1c5cbe3af0d9b6ef2.jpg" target="_blank" rel="noopener noreferrer"><img src="assets/img/icon-documento.png" alt="" style="width: 1.3vw;"></a>
            </td>
        `
        this.tableEl.appendChild(tr);
    }

    formatarData(data) {

        let dataFormatada = data.split('-');

        return dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0];
    }




}