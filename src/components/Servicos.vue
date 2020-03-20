<template>
    <div id="servicos">
        <div class="principal">
            <div class="principal__box">
                <h2 v-for="servico in checkedEspecialidades">{{ servico }}</h2>
            </div>
        </div>
        <br>
        <div class="lista_servico" >
            <hr>
            <input type="checkbox" id="AGÊNCIA DE VIAGENS E TURISMO" value="AGÊNCIA DE VIAGENS E TURISMO" v-model="checkedEspecialidades">
            <label for="AGÊNCIA DE VIAGENS E TURISMO">AGÊNCIA DE VIAGENS E TURISMO</label>
            <hr>
            <input type="checkbox" id="ÁGUA PERSONALIZADA" value="ÁGUA PERSONALIZADA" v-model="checkedEspecialidades">
            <label for="ÁGUA PERSONALIZADA">ÁGUA PERSONALIZADA</label>
            <hr>
            <input type="checkbox" id="AMBULÂNCIA E UTI" value="AMBULÂNCIA E UTI" v-model="checkedEspecialidades">
            <label for="AMBULÂNCIA E UTI">AMBULÂNCIA E UTI</label>
            <hr>
            <input type="checkbox" id="AR CONDICIONADO" value="AR CONDICIONADO" v-model="checkedEspecialidades">
            <label for="AR CONDICIONADO">AR CONDICIONADO</label>
            <hr>
            <input type="checkbox" id="ARRANJO FLORAL" value="ARRANJO FLORAL" v-model="checkedEspecialidades">
            <label for="ARRANJO FLORAL">ARRANJO FLORAL</label>
            <hr>
            <input type="checkbox" id="ARTIGOS ESPORTIVOS" value="ARTIGOS ESPORTIVOS" v-model="checkedEspecialidades">
            <label for="ARTIGOS ESPORTIVOS">ARTIGOS ESPORTIVOS</label>
            <hr>
            <input type="checkbox" id="ATIVAÇÃO" value="ATIVAÇÃO" v-model="checkedEspecialidades">
            <label for="ATIVAÇÃO">ATIVAÇÃO</label>
            <hr>
            <input type="checkbox" id="ATRAÇÃO MUSICAL" value="ATRAÇÃO MUSICAL" v-model="checkedEspecialidades">
            <label for="ATRAÇÃO MUSICAL">ATRAÇÃO MUSICAL</label>
            <hr>
            <input type="checkbox" id="BALÕES/BEXIGAS" value="BALÕES/BEXIGAS" v-model="checkedEspecialidades">
            <label for="BALÕES/BEXIGAS">BALÕES/BEXIGAS</label>
            <hr>
            <input type="checkbox" id="BANDA" value="BANDA" v-model="checkedEspecialidades">
            <label for="BANDA">BANDA</label>
            <hr>
            <input type="checkbox" id="BAR SERVIÇO" value="BAR SERVIÇO" v-model="checkedEspecialidades">
            <label for="BAR SERVIÇO">BAR SERVIÇO</label>
            <hr>
            <input type="checkbox" id="BARMAN" value="BARMAN" v-model="checkedEspecialidades">
            <label for="BARMAN">BARMAN</label>
            <hr>
            <input type="checkbox" id="BIJUTERIAS E PEÇAS" value="BIJUTERIAS E PEÇAS" v-model="checkedEspecialidades">
            <label for="BIJUTERIAS E PEÇAS">BIJUTERIAS E PEÇAS</label>
            <hr>
            <input type="checkbox" id="BIKE FOOD" value="BIKE FOOD" v-model="checkedEspecialidades">
            <label for="BIKE FOOD">BIKE FOOD</label>
            <hr>
            <input type="checkbox" id="BLIMP" value="BLIMP" v-model="checkedEspecialidades">
            <label for="BLIMP">BLIMP</label>
            <hr>
            <input type="checkbox" id="BOLSA, SACOLA E MALA" value="BOLSA, SACOLA E MALA" v-model="checkedEspecialidades">
            <label for="BOLSA, SACOLA E MALA">BOLSA, SACOLA E MALA</label>
            <hr>
            <input type="checkbox" id="BOMBEIRO E EQUIPAMENTOS" value="BOMBEIRO E EQUIPAMENTOS" v-model="checkedEspecialidades">
            <label for="BOMBEIRO E EQUIPAMENTOS">BOMBEIRO E EQUIPAMENTOS</label>
            <hr>
            <input type="checkbox" id="BOTTON" value="BOTTON" v-model="checkedEspecialidades">
            <label for="BOTTON">BOTTON</label>
            <hr>
            <input type="checkbox" id="BRIGADEIRO" value="BRIGADEIRO" v-model="checkedEspecialidades">
            <label for="BRIGADEIRO">BRIGADEIRO</label>
            <hr>
            <input type="checkbox" id="BRINDE" value="BRINDE" v-model="checkedEspecialidades">
            <label for="BRINDE">BRINDE</label>
            <hr>
            <input type="checkbox" id="BRINDE SUSTENTÁVEL" value="BRINDE SUSTENTÁVEL" v-model="checkedEspecialidades">
            <label for="BRINDE SUSTENTÁVEL">BRINDE SUSTENTÁVEL</label>
            <hr>
            <input type="checkbox" id="BUFFET" value="BUFFET" v-model="checkedEspecialidades">
            <label for="BUFFET">BUFFET</label>
            <hr>
            <input type="checkbox" id="BUFFET MATERIAIS" value="BUFFET MATERIAIS" v-model="checkedEspecialidades">
            <label for="BUFFET MATERIAIS">BUFFET MATERIAIS</label>
            <hr>
            <input type="checkbox" id="BUREAU DE EVENTOS" value="BUREAU DE EVENTOS" v-model="checkedEspecialidades">
            <label for="BUREAU DE EVENTOS">BUREAU DE EVENTOS</label>
            <hr>
            <input type="checkbox" id="CABINE E TOTEM DE FOTOS" value="CABINE E TOTEM DE FOTOS" v-model="checkedEspecialidades">
            <label for="CABINE E TOTEM DE FOTOS">CABINE E TOTEM DE FOTOS</label>
            <hr>
            <input type="checkbox" id="CADERNO E MOLESQUINE" value="CADERNO E MOLESQUINE" v-model="checkedEspecialidades">
            <label for="CADERNO E MOLESQUINE">CADERNO E MOLESQUINE</label>
            <hr>
            <input type="checkbox" id="CAMISETA" value="CAMISETA" v-model="checkedEspecialidades">
            <label for="CAMISETA">CAMISETA</label>
            <hr>
            <input type="checkbox" id="CANECA PERSONALIZADA" value="CANECA PERSONALIZADA" v-model="checkedEspecialidades">
            <label for="CANECA PERSONALIZADA">CANECA PERSONALIZADA</label>
            <hr>
            <input type="checkbox" id="CANETA" value="CANETA" v-model="checkedEspecialidades">
            <label for="CANETA">CANETA</label>
            <hr>
            <input type="checkbox" id="CARGA TRANSPORTE" value="CARGA TRANSPORTE" v-model="checkedEspecialidades">
            <label for="CARGA TRANSPORTE">CARGA TRANSPORTE</label>
            <hr>
            <input type="checkbox" id="CARICATURA" value="CARICATURA" v-model="checkedEspecialidades">
            <label for="CARICATURA">CARICATURA</label>
            <hr>
            <input type="checkbox" id="CARICATURA DIGITAL" value="CARICATURA DIGITAL" v-model="checkedEspecialidades">
            <label for="CARICATURA DIGITAL">CARICATURA DIGITAL</label>
            <hr>
            <input type="checkbox" id="CARREGADOR" value="CARREGADOR" v-model="checkedEspecialidades">
            <label for="CARREGADOR">CARREGADOR</label>
            <hr>
            <input type="checkbox" id="CARRINHO FOOD" value="CARRINHO FOOD" v-model="checkedEspecialidades">
            <label for="CARRINHO FOOD">CARRINHO FOOD</label>
            <hr>
            <input type="checkbox" id="CENOGRAFIA" value="CENOGRAFIA" v-model="checkedEspecialidades">
            <label for="CENOGRAFIA">CENOGRAFIA</label>
            <hr>
            <input type="checkbox" id="CHAVEIRO" value="CHAVEIRO" v-model="checkedEspecialidades">
            <label for="CHAVEIRO">CHAVEIRO</label>
            <hr>
            <input type="checkbox" id="CHOCOLATE" value="CHOCOLATE" v-model="checkedEspecialidades">
            <label for="CHOCOLATE">CHOCOLATE</label>
            <hr>
            <input type="checkbox" id="CHURRASCARIA" value="CHURRASCARIA" v-model="checkedEspecialidades">
            <label for="CHURRASCARIA">CHURRASCARIA</label>
            <hr>
            <input type="checkbox" id="CLIMATIZAÇÃO" value="CLIMATIZAÇÃO" v-model="checkedEspecialidades">
            <label for="CLIMATIZAÇÃO">CLIMATIZAÇÃO</label>
            <hr>
            <input type="checkbox" id="COMUNICAÇÃO VISUAL" value="COMUNICAÇÃO VISUAL" v-model="checkedEspecialidades">
            <label for="COMUNICAÇÃO VISUAL">COMUNICAÇÃO VISUAL</label>
            <hr>
            <input type="checkbox" id="CONFEITARIA" value="CONFEITARIA" v-model="checkedEspecialidades">
            <label for="CONFEITARIA">CONFEITARIA</label>
            <hr>
            <input type="checkbox" id="CONSULTORIA ESTRATÉGIA" value="CONSULTORIA ESTRATÉGIA" v-model="checkedEspecialidades">
            <label for="CONSULTORIA ESTRATÉGIA">CONSULTORIA ESTRATÉGIA</label>
            <hr>
            <input type="checkbox" id="COPIADORA" value="COPIADORA" v-model="checkedEspecialidades">
            <label for="COPIADORA">COPIADORA</label>
            <hr>
            <input type="checkbox" id="CORDÃO DE CRACHÁ" value="CORDÃO DE CRACHÁ" v-model="checkedEspecialidades">
            <label for="CORDÃO DE CRACHÁ">CORDÃO DE CRACHÁ</label>
            <hr>
            <input type="checkbox" id="COREOGRAFIA" value="COREOGRAFIA" v-model="checkedEspecialidades">
            <label for="COREOGRAFIA">COREOGRAFIA</label>
            <hr>
            <input type="checkbox" id="COZINHA INCLUSIVA" value="COZINHA INCLUSIVA" v-model="checkedEspecialidades">
            <label for="COZINHA INCLUSIVA">COZINHA INCLUSIVA</label>
            <hr>
            <input type="checkbox" id="CREDENCIAL" value="CREDENCIAL" v-model="checkedEspecialidades">
            <label for="CREDENCIAL">CREDENCIAL</label>
            <hr>
            <input type="checkbox" id="CURSOS" value="CURSOS" v-model="checkedEspecialidades">
            <label for="CURSOS">CURSOS</label>
            <hr>
            <input type="checkbox" id="DEGUSTAÇÃO CERVEJA" value="DEGUSTAÇÃO CERVEJA" v-model="checkedEspecialidades">
            <label for="DEGUSTAÇÃO CERVEJA">DEGUSTAÇÃO CERVEJA</label>
            <hr>
            <input type="checkbox" id="DEPARTAMENTO DE PROMOÇÃO" value="DEPARTAMENTO DE PROMOÇÃO" v-model="checkedEspecialidades">
            <label for="DEPARTAMENTO DE PROMOÇÃO">DEPARTAMENTO DE PROMOÇÃO</label>
            <hr>
            <input type="checkbox" id="DINÂMICA CORPORATIVA" value="DINÂMICA CORPORATIVA" v-model="checkedEspecialidades">
            <label for="DINÂMICA CORPORATIVA">DINÂMICA CORPORATIVA</label>
            <hr>
            <input type="checkbox" id="DIRETOR TÉCNICO" value="DIRETOR TÉCNICO" v-model="checkedEspecialidades">
            <label for="DIRETOR TÉCNICO">DIRETOR TÉCNICO</label>
            <hr>
            <input type="checkbox" id="DISTRIBUIDORA BEBIDAS" value="DISTRIBUIDORA BEBIDAS" v-model="checkedEspecialidades">
            <label for="DISTRIBUIDORA BEBIDAS">DISTRIBUIDORA BEBIDAS</label>
            <hr>
            <input type="checkbox" id="DJ" value="DJ" v-model="checkedEspecialidades">
            <label for="DJ">DJ</label>
            <hr>
            <input type="checkbox" id="DOCE" value="DOCE" v-model="checkedEspecialidades">
            <label for="DOCE">DOCE</label>
            <hr>
            <input type="checkbox" id="EMBALAGEM" value="EMBALAGEM" v-model="checkedEspecialidades">
            <label for="EMBALAGEM">EMBALAGEM</label>
            <hr>
            <input type="checkbox" id="EQUIPAMENTO CREDENCIAMENTO" value="EQUIPAMENTO CREDENCIAMENTO" v-model="checkedEspecialidades">
            <label for="EQUIPAMENTO CREDENCIAMENTO">EQUIPAMENTO CREDENCIAMENTO</label>
            <hr>
            <input type="checkbox" id="EQUIPAMENTO INFORMÁTICA" value="EQUIPAMENTO INFORMÁTICA" v-model="checkedEspecialidades">
            <label for="EQUIPAMENTO INFORMÁTICA">EQUIPAMENTO INFORMÁTICA</label>
            <hr>
            <input type="checkbox" id="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA" value="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA" v-model="checkedEspecialidades">
            <label for="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA">EQUIPAMENTO TRADUÇÃO SIMULTÂNEA</label>
            <hr>
            <input type="checkbox" id="ESPAÇO DE EVENTO" value="ESPAÇO DE EVENTO" v-model="checkedEspecialidades">
            <label for="ESPAÇO DE EVENTO">ESPAÇO DE EVENTO</label>
            <hr>
            <input type="checkbox" id="ESTACIONAMENTO" value="ESTACIONAMENTO" v-model="checkedEspecialidades">
            <label for="ESTACIONAMENTO">ESTACIONAMENTO</label>
            <hr>
            <input type="checkbox" id="ETIQUETA PARA UNIFORMES" value="ETIQUETA PARA UNIFORMES" v-model="checkedEspecialidades">
            <label for="ETIQUETA PARA UNIFORMES">ETIQUETA PARA UNIFORMES</label>
            <hr>
            <input type="checkbox" id="FOTOGRAFO" value="FOTOGRAFO" v-model="checkedEspecialidades">
            <label for="FOTOGRAFO">FOTOGRAFO</label>
            <hr>
            <input type="checkbox" id="GAMES" value="GAMES" v-model="checkedEspecialidades">
            <label for="GAMES">GAMES</label>
            <hr>
            <input type="checkbox" id="GERADOR" value="GERADOR" v-model="checkedEspecialidades">
            <label for="GERADOR">GERADOR</label>
            <hr>
            <input type="checkbox" id="GRAFICA DIGITAL" value="GRAFICA DIGITAL" v-model="checkedEspecialidades">
            <label for="GRAFICA DIGITAL">GRAFICA DIGITAL</label>
            <hr>
            <input type="checkbox" id="GRÁFICA OFFSET" value="GRÁFICA OFFSET" v-model="checkedEspecialidades">
            <label for="GRÁFICA OFFSET">GRÁFICA OFFSET</label>
            <hr>
            <input type="checkbox" id="HOTEL" value="HOTEL" v-model="checkedEspecialidades">
            <label for="HOTEL">HOTEL</label>
            <hr>
            <input type="checkbox" id="ILUMINAÇÃO" value="ILUMINAÇÃO" v-model="checkedEspecialidades">
            <label for="ILUMINAÇÃO">ILUMINAÇÃO</label>
            <hr>
            <input type="checkbox" id="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV" value="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV" v-model="checkedEspecialidades">
            <label for="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV">IMPRESSÃO COMUNICAÇÃO VISUAL E PDV</label>
            <hr>
            <input type="checkbox" id="INFRAESTRUTURA ELÉTRICA" value="INFRAESTRUTURA ELÉTRICA" v-model="checkedEspecialidades">
            <label for="INFRAESTRUTURA ELÉTRICA">INFRAESTRUTURA ELÉTRICA</label>
            <hr>
            <input type="checkbox" id="INFRAESTRUTURA HIDRÁULICA" value="INFRAESTRUTURA HIDRÁULICA" v-model="checkedEspecialidades">
            <label for="INFRAESTRUTURA HIDRÁULICA">INFRAESTRUTURA HIDRÁULICA</label>
            <hr>
            <input type="checkbox" id="INTERNET WI-FI" value="INTERNET WI-FI" v-model="checkedEspecialidades">
            <label for="INTERNET WI-FI">INTERNET WI-FI</label>
            <hr>
            <input type="checkbox" id="LIMPEZA" value="LIMPEZA" v-model="checkedEspecialidades">
            <label for="LIMPEZA">LIMPEZA</label>
            <hr>
            <input type="checkbox" id="LOCAÇÃO DE TABLET" value="LOCAÇÃO DE TABLET" v-model="checkedEspecialidades">
            <label for="LOCAÇÃO DE TABLET">LOCAÇÃO DE TABLET</label>
            <hr>
            <input type="checkbox" id="LOCADORA CARRO" value="LOCADORA CARRO" v-model="checkedEspecialidades">
            <label for="LOCADORA CARRO">LOCADORA CARRO</label>
            <hr>
            <input type="checkbox" id="MÁGICO" value="MÁGICO" v-model="checkedEspecialidades">
            <label for="MÁGICO">MÁGICO</label>
            <hr>
            <input type="checkbox" id="MÃO DE OBRA" value="MÃO DE OBRA" v-model="checkedEspecialidades">
            <label for="MÃO DE OBRA">MÃO DE OBRA</label>
            <hr>
            <input type="checkbox" id="MARCENARIA" value="MARCENARIA" v-model="checkedEspecialidades">
            <label for="MARCENARIA">MARCENARIA</label>
            <hr>
            <input type="checkbox" id="MASSAGEM" value="MASSAGEM" v-model="checkedEspecialidades">
            <label for="MASSAGEM">MASSAGEM</label>
            <hr>
            <input type="checkbox" id="MESTRE DE CERIMÔNIAS" value="MESTRE DE CERIMÔNIAS" v-model="checkedEspecialidades">
            <label for="MESTRE DE CERIMÔNIAS">MESTRE DE CERIMÔNIAS</label>
            <hr>
            <input type="checkbox" id="MOBILIÁRIO" value="MOBILIÁRIO" v-model="checkedEspecialidades">
            <label for="MOBILIÁRIO">MOBILIÁRIO</label>
            <hr>
            <input type="checkbox" id="MOBILIÁRIO LED" value="MOBILIÁRIO LED" v-model="checkedEspecialidades">
            <label for="MOBILIÁRIO LED">MOBILIÁRIO LED</label>
            <hr>
            <input type="checkbox" id="OBJETOS DE CASA" value="OBJETOS DE CASA" v-model="checkedEspecialidades">
            <label for="OBJETOS DE CASA">OBJETOS DE CASA</label>
            <hr>
            <input type="checkbox" id="ÔNIBUS E VAN" value="ÔNIBUS E VAN" v-model="checkedEspecialidades">
            <label for="ÔNIBUS E VAN">ÔNIBUS E VAN</label>
            <hr>
            <input type="checkbox" id="PAISAGISMO" value="PAISAGISMO" v-model="checkedEspecialidades">
            <label for="PAISAGISMO">PAISAGISMO</label>
            <hr>
            <input type="checkbox" id="PALESTRANTE" value="PALESTRANTE" v-model="checkedEspecialidades">
            <label for="PALESTRANTE">PALESTRANTE</label>
            <hr>
            <input type="checkbox" id="PAPELARIA PERSONALIZADA" value="PAPELARIA PERSONALIZADA" v-model="checkedEspecialidades">
            <label for="PAPELARIA PERSONALIZADA">PAPELARIA PERSONALIZADA</label>
            <hr>
            <input type="checkbox" id="PIPOCA" value="PIPOCA" v-model="checkedEspecialidades">
            <label for="PIPOCA">PIPOCA</label>
            <hr>
            <input type="checkbox" id="PISO EASYFLOOR" value="PISO EASYFLOOR" v-model="checkedEspecialidades">
            <label for="PISO EASYFLOOR">PISO EASYFLOOR</label>
            <hr>
            <input type="checkbox" id="PLANTA PROJETO" value="PLANTA PROJETO" v-model="checkedEspecialidades">
            <label for="PLANTA PROJETO">PLANTA PROJETO</label>
            <hr>
            <input type="checkbox" id="PLATAFORMAS DIGITAIS" value="PLATAFORMAS DIGITAIS" v-model="checkedEspecialidades">
            <label for="PLATAFORMAS DIGITAIS">PLATAFORMAS DIGITAIS</label>
            <hr>
            <input type="checkbox" id="PRODUTOR" value="PRODUTOR" v-model="checkedEspecialidades">
            <label for="PRODUTOR">PRODUTOR</label>
            <hr>
            <input type="checkbox" id="PROJEÇÃO" value="PROJEÇÃO" v-model="checkedEspecialidades">
            <label for="PROJEÇÃO">PROJEÇÃO</label>
            <hr>
            <input type="checkbox" id="PROJEÇÃO 3D" value="PROJEÇÃO 3D" v-model="checkedEspecialidades">
            <label for="PROJEÇÃO 3D">PROJEÇÃO 3D</label>
            <hr>
            <input type="checkbox" id="PROJEÇÃO LED" value="PROJEÇÃO LED" v-model="checkedEspecialidades">
            <label for="PROJEÇÃO LED">PROJEÇÃO LED</label>
            <hr>
            <input type="checkbox" id="PULSEIRA IDENTIFICAÇÃO" value="PULSEIRA IDENTIFICAÇÃO" v-model="checkedEspecialidades">
            <label for="PULSEIRA IDENTIFICAÇÃO">PULSEIRA IDENTIFICAÇÃO</label>
            <hr>
            <input type="checkbox" id="RÁDIO COMUNICAÇÃO" value="RÁDIO COMUNICAÇÃO" v-model="checkedEspecialidades">
            <label for="RÁDIO COMUNICAÇÃO">RÁDIO COMUNICAÇÃO</label>
            <hr>
            <input type="checkbox" id="RECEPCIONISTA" value="RECEPCIONISTA" v-model="checkedEspecialidades">
            <label for="RECEPCIONISTA">RECEPCIONISTA</label>
            <hr>
            <input type="checkbox" id="SEGURANÇA" value="SEGURANÇA" v-model="checkedEspecialidades">
            <label for="SEGURANÇA">SEGURANÇA</label>
            <hr>
            <input type="checkbox" id="SEGURO" value="SEGURO" v-model="checkedEspecialidades">
            <label for="SEGURO">SEGURO</label>
            <hr>
            <input type="checkbox" id="SERRALHERIA" value="SERRALHERIA" v-model="checkedEspecialidades">
            <label for="SERRALHERIA">SERRALHERIA</label>
            <hr>
            <input type="checkbox" id="SITE" value="SITE" v-model="checkedEspecialidades">
            <label for="SITE">SITE</label>
            <hr>
            <input type="checkbox" id="SONORIZAÇÃO" value="SONORIZAÇÃO" v-model="checkedEspecialidades">
            <label for="SONORIZAÇÃO">SONORIZAÇÃO</label>
            <hr>
            <input type="checkbox" id="STREAMING" value="STREAMING" v-model="checkedEspecialidades">
            <label for="STREAMING">STREAMING</label>
            <hr>
            <input type="checkbox" id="TAPEÇARIA" value="TAPEÇARIA" v-model="checkedEspecialidades">
            <label for="TAPEÇARIA">TAPEÇARIA</label>
            <hr>
            <input type="checkbox" id="TELEPROMPTER" value="TELEPROMPTER" v-model="checkedEspecialidades">
            <label for="TELEPROMPTER">TELEPROMPTER</label>
            <hr>
            <input type="checkbox" id="TENDA E COBERTURA" value="TENDA E COBERTURA" v-model="checkedEspecialidades">
            <label for="TENDA E COBERTURA">TENDA E COBERTURA</label>
            <hr>
            <input type="checkbox" id="TOTEM CARREGADOR" value="TOTEM CARREGADOR" v-model="checkedEspecialidades">
            <label for="TOTEM CARREGADOR">TOTEM CARREGADOR</label>
            <hr>
            <input type="checkbox" id="TOTEM INTERATIVO" value="TOTEM INTERATIVO" v-model="checkedEspecialidades">
            <label for="TOTEM INTERATIVO">TOTEM INTERATIVO</label>
            <hr>
            <input type="checkbox" id="TRADUTOR INTÉRPRETE" value="TRADUTOR INTÉRPRETE" v-model="checkedEspecialidades">
            <label for="TRADUTOR INTÉRPRETE">TRADUTOR INTÉRPRETE</label>
            <hr>
            <input type="checkbox" id="TROFÉU E PLACAS" value="TROFÉU E PLACAS" v-model="checkedEspecialidades">
            <label for="TROFÉU E PLACAS">TROFÉU E PLACAS</label>
            <hr>
            <input type="checkbox" id="UNIFILA" value="UNIFILA" v-model="checkedEspecialidades">
            <label for="UNIFILA">UNIFILA</label>
            <hr>
            <input type="checkbox" id="UNIFORME" value="UNIFORME" v-model="checkedEspecialidades">
            <label for="UNIFORME">UNIFORME</label>
            <hr>
            <input type="checkbox" id="VIDEO" value="VIDEO" v-model="checkedEspecialidades">
            <label for="VIDEO">VIDEO</label>
            <hr>
            <div class="input" >
                <input type="checkbox" v-on:click="mostrarInput" id="outros">
                <label for="outros" id="idMostrarLabel" class="mostrar">OUTROS</label>
                <input type="checkbox" v-on:click="mostrarInput" id="outros1">
                <label for="outros1" id="idOcultoLabel" class="oculto" style="width: 50% !important;">OUTROS: {{this.valor}}</label>
                <input type="text"  id="ocultoMostar" class="oculto"/>
                <br>
                <br>
            </div>
            <br>
            <div class="input">
                <span id="ocultoMostar1" class="oculto">Click novamente para adicionar</span>
            </div>
            <hr>
            <br>

        </div>
    </div>
</template>

<script>
    import servicos from "../services/servicos";
    export default {
        data() {
            return {
                checkedEspecialidades: [],
                valor: "",
            }
        },
        methods: {
            mostrarInput() {
                let inputOculto = document.getElementById("ocultoMostar");
                let inputOculto1 = document.getElementById("ocultoMostar1");
                if (inputOculto.classList.contains('oculto')){
                    inputOculto.classList.remove('oculto')
                    inputOculto.classList.add('mostrar')
                    inputOculto1.classList.remove('oculto')
                    inputOculto1.classList.add('mostrar')
                    return console.log(inputOculto.value);
                } else {
                    inputOculto.classList.remove('mostrar')
                    inputOculto.classList.add('oculto')
                    inputOculto1.classList.remove('mostrar')
                    inputOculto1.classList.add('oculto')
                    return this.listarOcutos();
                }
            },
            listarOcutos() {
                let inputOculto = document.getElementById("ocultoMostar");
                let idOcultoLabel = document.getElementById("idOcultoLabel");
                let idMostrarLabel = document.getElementById("idMostrarLabel");

                if(inputOculto.value !== "") {
                    this.checkedEspecialidades.push(inputOculto.value);
                    this.valor = inputOculto.value

                    idMostrarLabel.classList.remove("mostrar")
                    idMostrarLabel.classList.add('oculto')
                    idOcultoLabel.classList.remove('oculto')
                    idOcultoLabel.classList.add('mostrar')

                } else if(inputOculto.value === "" && this.valor !== 0) {
                    let index = this.checkedEspecialidades.indexOf(this.valor);
                    if(index > -1){
                        this.checkedEspecialidades.splice(index, 1);
                        this.valor = ""
                    }
                    idOcultoLabel.classList.remove("mostrar")
                    idOcultoLabel.classList.add('oculto')
                    idMostrarLabel.classList.remove('oculto')
                    idMostrarLabel.classList.add('mostrar')
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/variables.scss";

#servicos{

   .principal {
       display: flex;
       flex-direction: column;
       align-items: center;
       width: 100%;
       overflow-y: scroll;
       overflow-x: hidden;
       @media(max-width: $max-xs) {
           width: 75%;
       }

       &__box {
           border: 0;
           width: 100%;
           border-radius: .5rem;
           h2 {
               display: inline-block;
               flex-grow: 3;
               margin-right: .75rem;
               padding: 1rem;
               margin-top: 0.75rem;
               background-color:#F5F5F5;
               border-radius: 1.6rem;
               font-size: 1.5rem;
               color: #35364D;
           }

       }
   }
     .lista_servico {
        hr {
            border: 0.5px solid #E3E3EB;
        }
        input[type='checkbox'] {
            position: absolute;
            z-index: -1;
            opacity: 0;
        }
        label {
            font-size: 1.5rem;
        }

        input[type='checkbox'] + label {
            position: relative;
            cursor: pointer;
            display: flex;
            padding-left: 30px;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        input[type='checkbox'] + label::before {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            left: 0;
            bottom: -1.5px;
            border: 1px solid #E3E3EB;
            vertical-align: bottom;
        }

        input[type='checkbox']:checked + label::after {
            content: '';
            position: absolute;
            left: 7px;
            bottom: 3px;
            width: 5px;
            height: 14px;
            border-right: solid 1px green;
            border-bottom: solid 1px green;
            transform: rotate(45deg);
        }
         .input{
             display: flex;
             input{
                 margin-bottom: -3rem;
                 width: 80%;
             }
             label {
                 margin-bottom: 0;
                 margin-right: 2rem;
             }
             input[type='checkbox']:checked + label::after {
                 content: '';
                 position: absolute;
                 left: 7px;
                 bottom: 3px;
                 width: 5px;
                 height: 14px;
                 border-right: solid 1px green;
                 border-bottom: solid 1px green;
                 transform: rotate(45deg);
             }
             hr {
                 border: 0.5px solid #E3E3EB;
             }
             .oculto{
                 display: none;
             }
         }
     }
    }
</style>