<template>
    <div>
        <div class="container-fornecedor" v-bind:style="{ borderLeft: '1rem solid ' + borderLeft}">
            <h1>
                {{fornecedor.nome_fantasia}}
            </h1>
            <h2>
                {{fornecedor.servico[0]}}
            </h2>
            <h2 id="inscricao">
                {{fornecedor.inscricao_estadual}}
            </h2>
            <h2 v-if="fornecedor.telefone1" class="telefone">
                {{fornecedor.telefone1}}
            </h2>
            <h2 v-if="!fornecedor.telefone1" class="telefone">
                Sem telefone
            </h2>
            <star-rating :rating="this.ratingServico"
                         @rating-selected="atualizaRatingServico"
                         v-if="!rateStarLoading"
                         :item-size="17"
                         :show-rating="false"
                         :read-only="true"
                         :border-width="0"
                         class="star">
            </star-rating>
            <rotate-square5 v-if="rateStarLoading"></rotate-square5>
            <button v-on:click="mostrar" id="maisInfo">
                Mais informações
            </button>
            <button v-on:click="mostrar" id="maisInfoCel">
                +
            </button>
        </div>

        <div class="div" :id="chave">
            <div class="container-informacoes" :style="{ borderTop: '1rem solid '+ this.border}">
                <div class="img">
                    <button v-on:click="esconder">
                        <img src="@/assets/close.svg" alt=""/>
                    </button>
                </div>
                <div class="principal">

                    <div class="principal__header">
                        <h1>
                            Ficha de Cadastro
                        </h1>
                        <div>
                        <button v-if="this.editar && !this.updating && this.adm === 1" @click="excluir" class="excluir">Excluir</button>
                        </div>
                        <button v-if="!this.editar && !this.updating" @click="edit">Editar</button>
                        <div>
                        <button v-if="this.editar && !this.updating" @click="verificar"
                                style="border:0;" :style="{ background: borderLeft}">
                            Salvar
                        </button>
                        </div>
                        <circle6 v-if="this.updating"></circle6>
                    </div>

                    <div class="principal__box principal__box--rating">
                        <h3>
                            Avaliação por serviço:
                        </h3>
                        <star-rating :rating="this.ratingServico"
                                     @rating-selected="atualizaRatingServico"
                                     v-if="!rateStarLoading" :item-size="15"
                                     :show-rating="false"
                                     :read-only="!this.starEdit"
                                     :border-width="1"
                                     border-color="#ffd055">
                        </star-rating>
                        <rotate-square5 v-if="rateStarLoading" style="margin-left: 1rem;"></rotate-square5>
                    </div>

                    <div class="principal__box">
                        <h3 :class="{invalido: $v.fornecedorUpdated.razao_social.$error}">
                            Razão Social:
                        </h3>
                        <h2 v-if="!editar">
                            {{fornecedor.razao_social}}
                        </h2>
                        <input type="text"
                               v-model="fornecedorUpdated.razao_social"
                               v-if="editar"/>
                    </div>

                    <div class="principal__box">
                        <h3 :class="{invalido: $v.fornecedorUpdated.nome_fantasia.$error}">
                            Nome fantasia:
                        </h3>
                        <h2 v-if="!editar">
                            {{fornecedor.nome_fantasia}}
                        </h2>
                        <input type="text"
                               v-model="fornecedorUpdated.nome_fantasia"
                               v-if="editar"/>
                    </div>

                    <div class="principal__box">
                        <h3 :class="{invalido: $v.fornecedorUpdated.cnpj.$error}">
                            CNPJ ou CPF:
                        </h3>
                        <h2 v-if="!editar">{{fornecedor.cnpj}}</h2>
                        <input type="text"
                               v-model="fornecedorUpdated.cnpj"
                               v-if="editar"
                               v-mask='["###.###.###-##", "##.###.###/####-##"]'/>
                    </div>

                    <div class="principal__box principal__box--servico">
                        <h3>
                            Especialidade:
                        </h3>
                        <div class="principal3">
                            <div class="principal__box1" v-if="!editar">
                                <h2 v-for="serv in fornecedor.servico" style="background-color: #F5F5F5; margin-bottom: .2rem; margin-right: .2rem; border-radius: 1.6rem; padding: .5rem; display: inline-block">{{ serv }}</h2>
                            </div>
                        </div>
                        <div class="form" v-if="editar">
                            <div id="servicos" style="display: none">
                                <div class="principal4">
                                    <div class="principal__box1">
                                        <h2 v-for="serv in servicos"
                                            style="background-color: #fdf9da; margin-bottom: .2rem; margin-right: .2rem; border-radius: 1.6rem; padding: .5rem; display: inline-block">
                                            {{ serv }}</h2>
                                    </div>
                                    <br>
                                    <div class="lista_servico">
                                        <hr>
                                        <input type="checkbox" id="AGÊNCIA DE VIAGENS E TURISMO"
                                               value="AGÊNCIA DE VIAGENS E TURISMO" v-model="servicos">
                                        <label for="AGÊNCIA DE VIAGENS E TURISMO">AGÊNCIA DE VIAGENS E TURISMO</label>
                                        <hr>
                                        <input type="checkbox" id="ÁGUA PERSONALIZADA" value="ÁGUA PERSONALIZADA"
                                               v-model="servicos">
                                        <label for="ÁGUA PERSONALIZADA">ÁGUA PERSONALIZADA</label>
                                        <hr>
                                        <input type="checkbox" id="AMBULÂNCIA E UTI" value="AMBULÂNCIA E UTI"
                                               v-model="servicos">
                                        <label for="AMBULÂNCIA E UTI">AMBULÂNCIA E UTI</label>
                                        <hr>
                                        <input type="checkbox" id="AR CONDICIONADO" value="AR CONDICIONADO"
                                               v-model="servicos">
                                        <label for="AR CONDICIONADO">AR CONDICIONADO</label>
                                        <hr>
                                        <input type="checkbox" id="ARRANJO FLORAL" value="ARRANJO FLORAL"
                                               v-model="servicos">
                                        <label for="ARRANJO FLORAL">ARRANJO FLORAL</label>
                                        <hr>
                                        <input type="checkbox" id="ARTIGOS ESPORTIVOS" value="ARTIGOS ESPORTIVOS"
                                               v-model="servicos">
                                        <label for="ARTIGOS ESPORTIVOS">ARTIGOS ESPORTIVOS</label>
                                        <hr>
                                        <input type="checkbox" id="ATIVAÇÃO" value="ATIVAÇÃO" v-model="servicos">
                                        <label for="ATIVAÇÃO">ATIVAÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="ATRAÇÃO MUSICAL" value="ATRAÇÃO MUSICAL"
                                               v-model="servicos">
                                        <label for="ATRAÇÃO MUSICAL">ATRAÇÃO MUSICAL</label>
                                        <hr>
                                        <input type="checkbox" id="BALÕES/BEXIGAS" value="BALÕES/BEXIGAS"
                                               v-model="servicos">
                                        <label for="BALÕES/BEXIGAS">BALÕES/BEXIGAS</label>
                                        <hr>
                                        <input type="checkbox" id="BANDA" value="BANDA" v-model="servicos">
                                        <label for="BANDA">BANDA</label>
                                        <hr>
                                        <input type="checkbox" id="BAR SERVIÇO" value="BAR SERVIÇO"
                                               v-model="servicos">
                                        <label for="BAR SERVIÇO">BAR SERVIÇO</label>
                                        <hr>
                                        <input type="checkbox" id="BARMAN" value="BARMAN" v-model="servicos">
                                        <label for="BARMAN">BARMAN</label>
                                        <hr>
                                        <input type="checkbox" id="BIJUTERIAS E PEÇAS" value="BIJUTERIAS E PEÇAS"
                                               v-model="servicos">
                                        <label for="BIJUTERIAS E PEÇAS">BIJUTERIAS E PEÇAS</label>
                                        <hr>
                                        <input type="checkbox" id="BIKE FOOD" value="BIKE FOOD"
                                               v-model="servicos">
                                        <label for="BIKE FOOD">BIKE FOOD</label>
                                        <hr>
                                        <input type="checkbox" id="BLIMP" value="BLIMP" v-model="servicos">
                                        <label for="BLIMP">BLIMP</label>
                                        <hr>
                                        <input type="checkbox" id="BOLSA, SACOLA E MALA" value="BOLSA, SACOLA E MALA"
                                               v-model="servicos">
                                        <label for="BOLSA, SACOLA E MALA">BOLSA, SACOLA E MALA</label>
                                        <hr>
                                        <input type="checkbox" id="BOMBEIRO E EQUIPAMENTOS"
                                               value="BOMBEIRO E EQUIPAMENTOS"
                                               v-model="servicos">
                                        <label for="BOMBEIRO E EQUIPAMENTOS">BOMBEIRO E EQUIPAMENTOS</label>
                                        <hr>
                                        <input type="checkbox" id="BOTTON" value="BOTTON" v-model="servicos">
                                        <label for="BOTTON">BOTTON</label>
                                        <hr>
                                        <input type="checkbox" id="BRIGADEIRO" value="BRIGADEIRO"
                                               v-model="servicos">
                                        <label for="BRIGADEIRO">BRIGADEIRO</label>
                                        <hr>
                                        <input type="checkbox" id="BRINDE" value="BRINDE" v-model="servicos">
                                        <label for="BRINDE">BRINDE</label>
                                        <hr>
                                        <input type="checkbox" id="BRINDE SUSTENTÁVEL" value="BRINDE SUSTENTÁVEL"
                                               v-model="servicos">
                                        <label for="BRINDE SUSTENTÁVEL">BRINDE SUSTENTÁVEL</label>
                                        <hr>
                                        <input type="checkbox" id="BUFFET" value="BUFFET" v-model="servicos">
                                        <label for="BUFFET">BUFFET</label>
                                        <hr>
                                        <input type="checkbox" id="BUFFET MATERIAIS" value="BUFFET MATERIAIS"
                                               v-model="servicos">
                                        <label for="BUFFET MATERIAIS">BUFFET MATERIAIS</label>
                                        <hr>
                                        <input type="checkbox" id="BUREAU DE EVENTOS" value="BUREAU DE EVENTOS"
                                               v-model="servicos">
                                        <label for="BUREAU DE EVENTOS">BUREAU DE EVENTOS</label>
                                        <hr>
                                        <input type="checkbox" id="CABINE E TOTEM DE FOTOS"
                                               value="CABINE E TOTEM DE FOTOS"
                                               v-model="servicos">
                                        <label for="CABINE E TOTEM DE FOTOS">CABINE E TOTEM DE FOTOS</label>
                                        <hr>
                                        <input type="checkbox" id="CADERNO E MOLESQUINE" value="CADERNO E MOLESQUINE"
                                               v-model="servicos">
                                        <label for="CADERNO E MOLESQUINE">CADERNO E MOLESQUINE</label>
                                        <hr>
                                        <input type="checkbox" id="CAMISETA" value="CAMISETA" v-model="servicos">
                                        <label for="CAMISETA">CAMISETA</label>
                                        <hr>
                                        <input type="checkbox" id="CANECA PERSONALIZADA" value="CANECA PERSONALIZADA"
                                               v-model="servicos">
                                        <label for="CANECA PERSONALIZADA">CANECA PERSONALIZADA</label>
                                        <hr>
                                        <input type="checkbox" id="CANETA" value="CANETA" v-model="servicos">
                                        <label for="CANETA">CANETA</label>
                                        <hr>
                                        <input type="checkbox" id="CARGA TRANSPORTE" value="CARGA TRANSPORTE"
                                               v-model="servicos">
                                        <label for="CARGA TRANSPORTE">CARGA TRANSPORTE</label>
                                        <hr>
                                        <input type="checkbox" id="CARICATURA" value="CARICATURA"
                                               v-model="servicos">
                                        <label for="CARICATURA">CARICATURA</label>
                                        <hr>
                                        <input type="checkbox" id="CARICATURA DIGITAL" value="CARICATURA DIGITAL"
                                               v-model="servicos">
                                        <label for="CARICATURA DIGITAL">CARICATURA DIGITAL</label>
                                        <hr>
                                        <input type="checkbox" id="CARREGADOR" value="CARREGADOR"
                                               v-model="servicos">
                                        <label for="CARREGADOR">CARREGADOR</label>
                                        <hr>
                                        <input type="checkbox" id="CARRINHO FOOD" value="CARRINHO FOOD"
                                               v-model="servicos">
                                        <label for="CARRINHO FOOD">CARRINHO FOOD</label>
                                        <hr>
                                        <input type="checkbox" id="CENOGRAFIA" value="CENOGRAFIA"
                                               v-model="servicos">
                                        <label for="CENOGRAFIA">CENOGRAFIA</label>
                                        <hr>
                                        <input type="checkbox" id="CHAVEIRO" value="CHAVEIRO" v-model="servicos">
                                        <label for="CHAVEIRO">CHAVEIRO</label>
                                        <hr>
                                        <input type="checkbox" id="CHOCOLATE" value="CHOCOLATE"
                                               v-model="servicos">
                                        <label for="CHOCOLATE">CHOCOLATE</label>
                                        <hr>
                                        <input type="checkbox" id="CHURRASCARIA" value="CHURRASCARIA"
                                               v-model="servicos">
                                        <label for="CHURRASCARIA">CHURRASCARIA</label>
                                        <hr>
                                        <input type="checkbox" id="CLIMATIZAÇÃO" value="CLIMATIZAÇÃO"
                                               v-model="servicos">
                                        <label for="CLIMATIZAÇÃO">CLIMATIZAÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="COMUNICAÇÃO VISUAL" value="COMUNICAÇÃO VISUAL"
                                               v-model="servicos">
                                        <label for="COMUNICAÇÃO VISUAL">COMUNICAÇÃO VISUAL</label>
                                        <hr>
                                        <input type="checkbox" id="CONFEITARIA" value="CONFEITARIA"
                                               v-model="servicos">
                                        <label for="CONFEITARIA">CONFEITARIA</label>
                                        <hr>
                                        <input type="checkbox" id="CONSULTORIA ESTRATÉGIA"
                                               value="CONSULTORIA ESTRATÉGIA"
                                               v-model="servicos">
                                        <label for="CONSULTORIA ESTRATÉGIA">CONSULTORIA ESTRATÉGIA</label>
                                        <hr>
                                        <input type="checkbox" id="COPIADORA" value="COPIADORA"
                                               v-model="servicos">
                                        <label for="COPIADORA">COPIADORA</label>
                                        <hr>
                                        <input type="checkbox" id="CORDÃO DE CRACHÁ" value="CORDÃO DE CRACHÁ"
                                               v-model="servicos">
                                        <label for="CORDÃO DE CRACHÁ">CORDÃO DE CRACHÁ</label>
                                        <hr>
                                        <input type="checkbox" id="COREOGRAFIA" value="COREOGRAFIA"
                                               v-model="servicos">
                                        <label for="COREOGRAFIA">COREOGRAFIA</label>
                                        <hr>
                                        <input type="checkbox" id="COZINHA INCLUSIVA" value="COZINHA INCLUSIVA"
                                               v-model="servicos">
                                        <label for="COZINHA INCLUSIVA">COZINHA INCLUSIVA</label>
                                        <hr>
                                        <input type="checkbox" id="CREDENCIAL" value="CREDENCIAL"
                                               v-model="servicos">
                                        <label for="CREDENCIAL">CREDENCIAL</label>
                                        <hr>
                                        <input type="checkbox" id="CURSOS" value="CURSOS" v-model="servicos">
                                        <label for="CURSOS">CURSOS</label>
                                        <hr>
                                        <input type="checkbox" id="DEGUSTAÇÃO CERVEJA" value="DEGUSTAÇÃO CERVEJA"
                                               v-model="servicos">
                                        <label for="DEGUSTAÇÃO CERVEJA">DEGUSTAÇÃO CERVEJA</label>
                                        <hr>
                                        <input type="checkbox" id="DEPARTAMENTO DE PROMOÇÃO"
                                               value="DEPARTAMENTO DE PROMOÇÃO" v-model="servicos">
                                        <label for="DEPARTAMENTO DE PROMOÇÃO">DEPARTAMENTO DE PROMOÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="DINÂMICA CORPORATIVA" value="DINÂMICA CORPORATIVA"
                                               v-model="servicos">
                                        <label for="DINÂMICA CORPORATIVA">DINÂMICA CORPORATIVA</label>
                                        <hr>
                                        <input type="checkbox" id="DIRETOR TÉCNICO" value="DIRETOR TÉCNICO"
                                               v-model="servicos">
                                        <label for="DIRETOR TÉCNICO">DIRETOR TÉCNICO</label>
                                        <hr>
                                        <input type="checkbox" id="DISTRIBUIDORA BEBIDAS" value="DISTRIBUIDORA BEBIDAS"
                                               v-model="servicos">
                                        <label for="DISTRIBUIDORA BEBIDAS">DISTRIBUIDORA BEBIDAS</label>
                                        <hr>
                                        <input type="checkbox" id="DJ" value="DJ" v-model="servicos">
                                        <label for="DJ">DJ</label>
                                        <hr>
                                        <input type="checkbox" id="DOCE" value="DOCE" v-model="servicos">
                                        <label for="DOCE">DOCE</label>
                                        <hr>
                                        <input type="checkbox" id="EMBALAGEM" value="EMBALAGEM"
                                               v-model="servicos">
                                        <label for="EMBALAGEM">EMBALAGEM</label>
                                        <hr>
                                        <input type="checkbox" id="EQUIPAMENTO CREDENCIAMENTO"
                                               value="EQUIPAMENTO CREDENCIAMENTO" v-model="servicos">
                                        <label for="EQUIPAMENTO CREDENCIAMENTO">EQUIPAMENTO CREDENCIAMENTO</label>
                                        <hr>
                                        <input type="checkbox" id="EQUIPAMENTO INFORMÁTICA"
                                               value="EQUIPAMENTO INFORMÁTICA"
                                               v-model="servicos">
                                        <label for="EQUIPAMENTO INFORMÁTICA">EQUIPAMENTO INFORMÁTICA</label>
                                        <hr>
                                        <input type="checkbox" id="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA"
                                               value="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA" v-model="servicos">
                                        <label for="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA">EQUIPAMENTO TRADUÇÃO
                                            SIMULTÂNEA</label>
                                        <hr>
                                        <input type="checkbox" id="ESPAÇO DE EVENTO" value="ESPAÇO DE EVENTO"
                                               v-model="servicos">
                                        <label for="ESPAÇO DE EVENTO">ESPAÇO DE EVENTO</label>
                                        <hr>
                                        <input type="checkbox" id="ESTACIONAMENTO" value="ESTACIONAMENTO"
                                               v-model="servicos">
                                        <label for="ESTACIONAMENTO">ESTACIONAMENTO</label>
                                        <hr>
                                        <input type="checkbox" id="ETIQUETA PARA UNIFORMES"
                                               value="ETIQUETA PARA UNIFORMES"
                                               v-model="servicos">
                                        <label for="ETIQUETA PARA UNIFORMES">ETIQUETA PARA UNIFORMES</label>
                                        <hr>
                                        <input type="checkbox" id="FOTOGRAFO" value="FOTOGRAFO"
                                               v-model="servicos">
                                        <label for="FOTOGRAFO">FOTOGRAFO</label>
                                        <hr>
                                        <input type="checkbox" id="GAMES" value="GAMES" v-model="servicos">
                                        <label for="GAMES">GAMES</label>
                                        <hr>
                                        <input type="checkbox" id="GERADOR" value="GERADOR" v-model="servicos">
                                        <label for="GERADOR">GERADOR</label>
                                        <hr>
                                        <input type="checkbox" id="GRAFICA DIGITAL" value="GRAFICA DIGITAL"
                                               v-model="servicos">
                                        <label for="GRAFICA DIGITAL">GRAFICA DIGITAL</label>
                                        <hr>
                                        <input type="checkbox" id="GRÁFICA OFFSET" value="GRÁFICA OFFSET"
                                               v-model="servicos">
                                        <label for="GRÁFICA OFFSET">GRÁFICA OFFSET</label>
                                        <hr>
                                        <input type="checkbox" id="HOTEL" value="HOTEL" v-model="servicos">
                                        <label for="HOTEL">HOTEL</label>
                                        <hr>
                                        <input type="checkbox" id="ILUMINAÇÃO" value="ILUMINAÇÃO"
                                               v-model="servicos">
                                        <label for="ILUMINAÇÃO">ILUMINAÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV"
                                               value="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV" v-model="servicos">
                                        <label for="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV">IMPRESSÃO COMUNICAÇÃO VISUAL E
                                            PDV</label>
                                        <hr>
                                        <input type="checkbox" id="INFRAESTRUTURA ELÉTRICA"
                                               value="INFRAESTRUTURA ELÉTRICA"
                                               v-model="servicos">
                                        <label for="INFRAESTRUTURA ELÉTRICA">INFRAESTRUTURA ELÉTRICA</label>
                                        <hr>
                                        <input type="checkbox" id="INFRAESTRUTURA HIDRÁULICA"
                                               value="INFRAESTRUTURA HIDRÁULICA" v-model="servicos">
                                        <label for="INFRAESTRUTURA HIDRÁULICA">INFRAESTRUTURA HIDRÁULICA</label>
                                        <hr>
                                        <input type="checkbox" id="INTERNET WI-FI" value="INTERNET WI-FI"
                                               v-model="servicos">
                                        <label for="INTERNET WI-FI">INTERNET WI-FI</label>
                                        <hr>
                                        <input type="checkbox" id="LIMPEZA" value="LIMPEZA" v-model="servicos">
                                        <label for="LIMPEZA">LIMPEZA</label>
                                        <hr>
                                        <input type="checkbox" id="LOCAÇÃO DE TABLET" value="LOCAÇÃO DE TABLET"
                                               v-model="servicos">
                                        <label for="LOCAÇÃO DE TABLET">LOCAÇÃO DE TABLET</label>
                                        <hr>
                                        <input type="checkbox" id="LOCADORA CARRO" value="LOCADORA CARRO"
                                               v-model="servicos">
                                        <label for="LOCADORA CARRO">LOCADORA CARRO</label>
                                        <hr>
                                        <input type="checkbox" id="MÁGICO" value="MÁGICO" v-model="servicos">
                                        <label for="MÁGICO">MÁGICO</label>
                                        <hr>
                                        <input type="checkbox" id="MÃO DE OBRA" value="MÃO DE OBRA"
                                               v-model="servicos">
                                        <label for="MÃO DE OBRA">MÃO DE OBRA</label>
                                        <hr>
                                        <input type="checkbox" id="MARCENARIA" value="MARCENARIA"
                                               v-model="servicos">
                                        <label for="MARCENARIA">MARCENARIA</label>
                                        <hr>
                                        <input type="checkbox" id="MASSAGEM" value="MASSAGEM" v-model="servicos">
                                        <label for="MASSAGEM">MASSAGEM</label>
                                        <hr>
                                        <input type="checkbox" id="MESTRE DE CERIMÔNIAS" value="MESTRE DE CERIMÔNIAS"
                                               v-model="servicos">
                                        <label for="MESTRE DE CERIMÔNIAS">MESTRE DE CERIMÔNIAS</label>
                                        <hr>
                                        <input type="checkbox" id="MOBILIÁRIO" value="MOBILIÁRIO"
                                               v-model="servicos">
                                        <label for="MOBILIÁRIO">MOBILIÁRIO</label>
                                        <hr>
                                        <input type="checkbox" id="MOBILIÁRIO LED" value="MOBILIÁRIO LED"
                                               v-model="servicos">
                                        <label for="MOBILIÁRIO LED">MOBILIÁRIO LED</label>
                                        <hr>
                                        <input type="checkbox" id="OBJETOS DE CASA" value="OBJETOS DE CASA"
                                               v-model="servicos">
                                        <label for="OBJETOS DE CASA">OBJETOS DE CASA</label>
                                        <hr>
                                        <input type="checkbox" id="ÔNIBUS E VAN" value="ÔNIBUS E VAN"
                                               v-model="servicos">
                                        <label for="ÔNIBUS E VAN">ÔNIBUS E VAN</label>
                                        <hr>
                                        <input type="checkbox" id="PAISAGISMO" value="PAISAGISMO"
                                               v-model="servicos">
                                        <label for="PAISAGISMO">PAISAGISMO</label>
                                        <hr>
                                        <input type="checkbox" id="PALESTRANTE" value="PALESTRANTE"
                                               v-model="servicos">
                                        <label for="PALESTRANTE">PALESTRANTE</label>
                                        <hr>
                                        <input type="checkbox" id="PAPELARIA PERSONALIZADA"
                                               value="PAPELARIA PERSONALIZADA"
                                               v-model="servicos">
                                        <label for="PAPELARIA PERSONALIZADA">PAPELARIA PERSONALIZADA</label>
                                        <hr>
                                        <input type="checkbox" id="PIPOCA" value="PIPOCA" v-model="servicos">
                                        <label for="PIPOCA">PIPOCA</label>
                                        <hr>
                                        <input type="checkbox" id="PISO EASYFLOOR" value="PISO EASYFLOOR"
                                               v-model="servicos">
                                        <label for="PISO EASYFLOOR">PISO EASYFLOOR</label>
                                        <hr>
                                        <input type="checkbox" id="PLANTA PROJETO" value="PLANTA PROJETO"
                                               v-model="servicos">
                                        <label for="PLANTA PROJETO">PLANTA PROJETO</label>
                                        <hr>
                                        <input type="checkbox" id="PLATAFORMAS DIGITAIS" value="PLATAFORMAS DIGITAIS"
                                               v-model="servicos">
                                        <label for="PLATAFORMAS DIGITAIS">PLATAFORMAS DIGITAIS</label>
                                        <hr>
                                        <input type="checkbox" id="PRODUTOR" value="PRODUTOR" v-model="servicos">
                                        <label for="PRODUTOR">PRODUTOR</label>
                                        <hr>
                                        <input type="checkbox" id="PROJEÇÃO" value="PROJEÇÃO" v-model="servicos">
                                        <label for="PROJEÇÃO">PROJEÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="PROJEÇÃO 3D" value="PROJEÇÃO 3D"
                                               v-model="servicos">
                                        <label for="PROJEÇÃO 3D">PROJEÇÃO 3D</label>
                                        <hr>
                                        <input type="checkbox" id="PROJEÇÃO LED" value="PROJEÇÃO LED"
                                               v-model="servicos">
                                        <label for="PROJEÇÃO LED">PROJEÇÃO LED</label>
                                        <hr>
                                        <input type="checkbox" id="PULSEIRA IDENTIFICAÇÃO"
                                               value="PULSEIRA IDENTIFICAÇÃO"
                                               v-model="servicos">
                                        <label for="PULSEIRA IDENTIFICAÇÃO">PULSEIRA IDENTIFICAÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="RÁDIO COMUNICAÇÃO" value="RÁDIO COMUNICAÇÃO"
                                               v-model="servicos">
                                        <label for="RÁDIO COMUNICAÇÃO">RÁDIO COMUNICAÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="RECEPCIONISTA" value="RECEPCIONISTA"
                                               v-model="servicos">
                                        <label for="RECEPCIONISTA">RECEPCIONISTA</label>
                                        <hr>
                                        <input type="checkbox" id="SEGURANÇA" value="SEGURANÇA"
                                               v-model="servicos">
                                        <label for="SEGURANÇA">SEGURANÇA</label>
                                        <hr>
                                        <input type="checkbox" id="SEGURO" value="SEGURO" v-model="servicos">
                                        <label for="SEGURO">SEGURO</label>
                                        <hr>
                                        <input type="checkbox" id="SERRALHERIA" value="SERRALHERIA"
                                               v-model="servicos">
                                        <label for="SERRALHERIA">SERRALHERIA</label>
                                        <hr>
                                        <input type="checkbox" id="SITE" value="SITE" v-model="servicos">
                                        <label for="SITE">SITE</label>
                                        <hr>
                                        <input type="checkbox" id="SONORIZAÇÃO" value="SONORIZAÇÃO"
                                               v-model="servicos">
                                        <label for="SONORIZAÇÃO">SONORIZAÇÃO</label>
                                        <hr>
                                        <input type="checkbox" id="STREAMING" value="STREAMING"
                                               v-model="servicos">
                                        <label for="STREAMING">STREAMING</label>
                                        <hr>
                                        <input type="checkbox" id="TAPEÇARIA" value="TAPEÇARIA"
                                               v-model="servicos">
                                        <label for="TAPEÇARIA">TAPEÇARIA</label>
                                        <hr>
                                        <input type="checkbox" id="TELEPROMPTER" value="TELEPROMPTER"
                                               v-model="servicos">
                                        <label for="TELEPROMPTER">TELEPROMPTER</label>
                                        <hr>
                                        <input type="checkbox" id="TENDA E COBERTURA" value="TENDA E COBERTURA"
                                               v-model="servicos">
                                        <label for="TENDA E COBERTURA">TENDA E COBERTURA</label>
                                        <hr>
                                        <input type="checkbox" id="TOTEM CARREGADOR" value="TOTEM CARREGADOR"
                                               v-model="servicos">
                                        <label for="TOTEM CARREGADOR">TOTEM CARREGADOR</label>
                                        <hr>
                                        <input type="checkbox" id="TOTEM INTERATIVO" value="TOTEM INTERATIVO"
                                               v-model="servicos">
                                        <label for="TOTEM INTERATIVO">TOTEM INTERATIVO</label>
                                        <hr>
                                        <input type="checkbox" id="TRADUTOR INTÉRPRETE" value="TRADUTOR INTÉRPRETE"
                                               v-model="servicos">
                                        <label for="TRADUTOR INTÉRPRETE">TRADUTOR INTÉRPRETE</label>
                                        <hr>
                                        <input type="checkbox" id="TROFÉU E PLACAS" value="TROFÉU E PLACAS"
                                               v-model="servicos">
                                        <label for="TROFÉU E PLACAS">TROFÉU E PLACAS</label>
                                        <hr>
                                        <input type="checkbox" id="UNIFILA" value="UNIFILA" v-model="servicos">
                                        <label for="UNIFILA">UNIFILA</label>
                                        <hr>
                                        <input type="checkbox" id="UNIFORME" value="UNIFORME" v-model="servicos">
                                        <label for="UNIFORME">UNIFORME</label>
                                        <hr>
                                        <input type="checkbox" id="VIDEO" value="VIDEO" v-model="servicos">
                                        <label for="VIDEO">VIDEO</label>
                                        <hr>
                                        <div class="input">
                                            <input type="checkbox" v-on:click="mostrarInput" id="outros">
                                            <label for="outros" id="idMostrarLabel" class="mostrar">OUTROS</label>
                                            <input type="checkbox" v-on:click="mostrarInput" id="outros1">
                                            <label for="outros1" id="idOcultoLabel" class="oculto"
                                                   style="width: 50% !important;">OUTROS: {{this.valor}}</label>
                                            <input type="text" id="ocultoMostar" class="oculto"/>
                                            <br>
                                            <br>
                                        </div>
                                        <br>
                                        <div class="input">
                                        <span id="ocultoMostar1" class="oculto"
                                              style="margin-left:5px; color: #E3E3E3; cursor:pointer; font-size: 1.5rem">Click novamente para adicionar na lista</span>
                                        </div>
                                        <hr>
                                        <br>
                                    </div>
                                    <div id="ocultarServico1"
                                         style="display: flex; justify-content: space-between; margin-top: 1rem; margin-bottom: 1rem">
                                        <h2 v-on:click.prevent="mostrarServico2"
                                            style="color: #E3E3EE; cursor:pointer; font-size: 2rem">Fechar Lista</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="principal4" id="ocultarServico6">
                            <div class="principal__box1" >
                                <h2 v-for="serv in fornecedor.servico" style="background-color: #fdf9da; margin-bottom: .2rem; margin-right: .2rem; border-radius: 1.6rem; padding: .5rem; display: inline-block">{{ serv }}</h2>
                            </div>
                            </div>
                            <div class="principal4" id="ocultarServico2">
                                <div class="principal__box1" v-if="servicos !== []">
                                    <h2 v-for="serv in servicos" style="background-color: #fdf9da; margin-bottom: .2rem; margin-right: .2rem; border-radius: 1.6rem; padding: .5rem; display: inline-block">{{ serv }}</h2>
                                </div>

                            </div>
                            <div id="ocultarServico"
                                 style="display: flex; justify-content: space-between; margin-top: 1rem; margin-bottom: 1rem">
                                <h2 v-on:click.prevent="mostrarServico"
                                    style="color: #E3E3EE; cursor:pointer; font-size: 2rem">Atualizar Lista</h2>
                            </div>
                        </div>
                    </div>

                    <!--                <div class="principal__box principal__box&#45;&#45;servico">-->
                    <!--                    <h3 :class="{invalido: $v.servicos.value.$error}">-->
                    <!--                        Especialidade:-->
                    <!--                    </h3>-->
                    <!--                    <h2 v-if="!editar">-->
                    <!--                        {{fornecedor.servico.name}}-->
                    <!--                    </h2>-->
                    <!--                    <div class="form__group" v-if="editar">-->
                    <!--                        <input id="servico"-->
                    <!--                               name="servico"-->
                    <!--                               type="text"-->
                    <!--                               v-model="fornecedorUpdated.servico.text"-->
                    <!--                                v-on:keyup="listarServicos"-->
                    <!--                               autocomplete="off"/>-->
                    <!--                        <div class="servicosPesquisa" id="servicosPesquisa">-->
                    <!--                            <ul>-->
                    <!--                                <li v-if="loading">-->
                    <!--                                    <button style="cursor:progress;" disabled>-->
                    <!--                                        Buscando serviços-->
                    <!--                                    </button>-->
                    <!--                                </li>-->
                    <!--                                <li v-for="servico in returnServicos" :key="servico.id">-->
                    <!--                                    <button v-on:click.prevent="preencherServico(servico)">-->
                    <!--                                        {{servico.name}}-->
                    <!--                                    </button>-->
                    <!--                                </li>-->
                    <!--                            </ul>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                </div>-->

                    <div class="principal__box">
                        <h3 :class="{invalido: $v.fornecedorUpdated.contato.$error}">Contato:</h3>
                        <h2 v-if="!editar">{{fornecedor.contato}}</h2>
                        <input type="text" v-model="fornecedorUpdated.contato" v-if="editar"/>
                    </div>

                    <div class="principal__box">
                        <h3 :class="{invalido: $v.fornecedorUpdated.cargo.$error}">Cargo:</h3>
                        <h2 v-if="!editar">{{fornecedor.cargo}}</h2>
                        <input type="text" v-model="fornecedorUpdated.cargo" v-if="editar"/>
                    </div>

                    <div class="principal__box principal__box--phone">
                        <h3 :class="{invalido: $v.fornecedorUpdated.telefone1.$error}">Telefone 1:</h3>
                        <h2 v-if="fornecedor.telefone1 && !editar">{{fornecedor.telefone1}}</h2>
                        <input type="text" v-model="fornecedorUpdated.telefone1" v-if="editar"
                               v-mask='["(##) ####-####", "(##) #####-####"]'/>

                        <h3 v-if="fornecedor.telefone2 || editar">Telefone 2:</h3>
                        <h2 v-if="fornecedor.telefone2 && !editar">{{fornecedor.telefone2}}</h2>
                        <input type="text" v-model="fornecedorUpdated.telefone2" v-if="editar"
                               v-mask='["(##) ####-####", "(##) #####-####"]'/>

                        <h3 v-if="fornecedor.telefone3 || editar">Telefone 3:</h3>
                        <h2 v-if="fornecedor.telefone3 && !editar">{{fornecedor.telefone3}}</h2>
                        <input type="text" v-model="fornecedorUpdated.telefone3" v-if="editar"
                               v-mask='["(##) ####-####", "(##) #####-####"]'/>
                    </div>

                    <div class="principal__box">
                        <h3 :class="{invalido: $v.fornecedorUpdated.email.$error}">E-mail:</h3>
                        <h2 v-if="!editar">{{fornecedor.email}}</h2>
                        <input type="text" v-model="fornecedorUpdated.email" v-if="editar"/>
                    </div>

                    <div class="principal__box" v-if="fornecedor.redes_sociais || editar">
                        <h3>Redes Sociais:</h3>
                        <h2 v-if="!editar">{{fornecedor.redes_sociais}}</h2>
                        <input type="text" v-model="fornecedorUpdated.redes_sociais" v-if="editar"/>
                    </div>

                    <div class="principal__box principal__box--address">
                        <h4>Endereço:</h4>

                        <h3 :class="{invalido: $v.fornecedorUpdated.rua.$error}">Rua:</h3>
                        <h2 v-if="fornecedor.rua && !editar">{{fornecedor.rua}}</h2>
                        <textarea v-model="fornecedorUpdated.rua" v-if="editar"></textarea>

                        <h3 :class="{invalido: $v.fornecedorUpdated.bairro.$error}">Bairro:</h3>
                        <h2 v-if="fornecedor.bairro && !editar">{{fornecedor.bairro}}</h2>
                        <input type="text" v-model="fornecedorUpdated.bairro" v-if="editar"/>

                        <h3 :class="{invalido: $v.fornecedorUpdated.cidade.$error}">Cidade:</h3>
                        <h2 v-if="fornecedor.cidade && !editar">{{fornecedor.cidade}}</h2>
                        <input type="text" v-model="fornecedorUpdated.cidade" v-if="editar"/>

                        <div class="principal__box principal__box--servico">
                            <h3>Estado:</h3>
                            <h2 v-if="fornecedor.estado && !editar">
                                {{fornecedor.estado.nome}}
                            </h2>
                            <div class="form__group" v-if="editar">
                                <input id="estado"
                                       name="estado"
                                       type="text"
                                       v-model="fornecedorUpdated.estado.text"
                                       v-on:keyup="listarEstados"
                                       autocomplete="off"/>
                                <div class="estadosPesquisa" id="estadosPesquisa">
                                    <ul>
                                        <li v-if="loading">
                                            <button style="cursor:progress;" disabled>
                                                Buscando estado
                                            </button>
                                        </li>
                                        <li v-for="estado in returnEstados" :key="estado.id">
                                            <button v-on:click.prevent="preencherEstado(estado)">
                                                {{estado.nome}}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--                    <h3 :class="{invalido: $v.fornecedorUpdated.estados.$error}">Estado:</h3>    -->
                            <!--                    <h2 v-if="fornecedor.estados && !editar">{{fornecedor.estados.nome}}</h2>   -->
                            <!--                    <input type="text" v-model="fornecedorUpdated.estados" v-if="editar"/>       -->
                        </div>
                    </div>

                    <div class="principal__box" v-if="fornecedor.inscricao_estadual || editar">
                        <h3>Inscrição Estadual:</h3>
                        <h2 v-if="!editar">{{fornecedor.inscricao_estadual}}</h2>
                        <input type="text" v-model="fornecedorUpdated.inscricao_estadual" v-if="editar"/>
                    </div>

                    <div class="principal__box" v-if="fornecedor.inscricao_municipal || editar">
                        <h3>Inscrição Municipal:</h3>
                        <h2 v-if="!editar">{{fornecedor.inscricao_municipal}}</h2>
                        <input type="text" v-model="fornecedorUpdated.inscricao_municipal" v-if="editar"/>
                    </div>

                    <div class="principal__box" v-if="(fornecedor.userupdate || editar) && adm === 1">
                        <h3>Ultima atualização:</h3>
                        <h2 v-if="!editar">{{ fornecedor.userupdate }}</h2>
                    </div>

<!--                    <div class="principal__box principal__box&#45;&#45;tags">-->
<!--                        <h3>Tags:</h3>-->
<!--                        <h2 v-if="!editar">{{fornecedor.tags}}</h2>-->
<!--                        <div class="form__tags" v-if="editar">-->
<!--                            <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"-->
<!--                                            :class="{invalidTags: $v.tags.$error}"/>-->
<!--                        </div>-->
<!--                    </div>-->

                    <div class="principal__box principal__box--obs" v-if="fornecedor.description || editar">
                        <h3>Observações:</h3>
                        <h2 v-if="!editar">{{fornecedor.description}}</h2>
                        <textarea v-model="fornecedorUpdated.description" v-if="editar"></textarea>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import {StarRating} from 'vue-rate-it';
    import {ImageRating} from 'vue-rate-it';
    import fornecedores from '@/services/fornecedores.js'
    import {RotateSquare5} from 'vue-loading-spinner'
    import {Circle6} from 'vue-loading-spinner'
    import {mask} from 'vue-the-mask';
    import servicos from '@/services/servicos.js'
    import estados from "../services/estados.js";
    import {required, minLength, between, email} from 'vuelidate/lib/validators'

    export default {
        name: 'Fornecedor',
        props: {
            borderLeft: {
                type: String,
                required: true,
            },
            chave: {
                type: String,
                required: true
            },
            fornecedor: {
                required: true
            },
            adm: {
                required: false
            },
            user: {
                required: false
            }
        },
        directives: {mask},
        components: {
            StarRating,
            ImageRating,
            RotateSquare5,
            VueTagsInput,
            Circle6,
        },

        data: function () {
            return {
                border: this.borderLeft,
                starEdit: false,
                estado: '',
                ratingServico: this.fornecedor.avalicao_servico,
                rateStarLoading: false,
                ratePrecoLoading: false,
                ratingPreco: this.fornecedor.avalicao_preco,
                editar: false,
                // tag: '',
                valor: '',
                // tags: [],
                servicos: [],
                estados: null,
                timeout: null,
                loading: false,
                updating: false,
                fornecedorUpdated: {
                    razao_social: this.fornecedor.razao_social,
                    nome_fantasia: this.fornecedor.nome_fantasia,
                    cnpj: this.fornecedor.cnpj,
                    inscricao_estadual: this.fornecedor.inscricao_estadual,
                    inscricao_municipal: this.fornecedor.inscricao_municipal,
                    servico: this.fornecedor.servico,
                    contato: this.fornecedor.contato,
                    cargo: this.fornecedor.cargo,
                    telefone1: this.fornecedor.telefone1,
                    telefone2: this.fornecedor.telefone2,
                    telefone3: this.fornecedor.telefone3,
                    email: this.fornecedor.email,
                    redes_sociais: this.fornecedor.redes_sociais,
                    rua: this.fornecedor.rua,
                    bairro: this.fornecedor.bairro,
                    cidade: this.fornecedor.cidade,
                    estado: {
                        text: this.fornecedor.estado.nome, value: this.fornecedor.estado.id
                    },
                    description: this.fornecedor.description,
                    userupdate: this.user,
                },
                editouStar: false,
                editou: false
            }

        },

        methods: {
            mostrarServico() {
                document.getElementById('servicos').style.display = "block";
                document.getElementById('ocultarServico').style.display = "none";
                document.getElementById('ocultarServico2').style.display = "none";
                document.getElementById('ocultarServico6').style.display = "none";
            },
            mostrarServico2() {
                document.getElementById('servicos').style.display = "none";
                document.getElementById('ocultarServico').style.display = "block";
                if (this.servicos.length !== 0) {
                    document.getElementById('ocultarServico2').style.display = "block";
                    document.getElementById('ocultarServico6').style.display = "none";
                    this.fornecedorUpdated.servico = this.servicos
                } else {
                    document.getElementById('ocultarServico6').style.display = "block";
                    document.getElementById('ocultarServico2').style.display = "none";
                }
            },
            mostrarInput() {
                let inputOculto = document.getElementById("ocultoMostar");
                let inputOculto1 = document.getElementById("ocultoMostar1");
                if (inputOculto.classList.contains('oculto')) {
                    inputOculto.classList.remove('oculto')
                    inputOculto.classList.add('mostrar')
                    inputOculto1.classList.remove('oculto')
                    inputOculto1.classList.add('mostrar')

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

                if (inputOculto.value !== "") {
                    this.servicos.push(inputOculto.value);
                    this.valor = inputOculto.value

                    idMostrarLabel.classList.remove("mostrar")
                    idMostrarLabel.classList.add('oculto')
                    idOcultoLabel.classList.remove('oculto')
                    idOcultoLabel.classList.add('mostrar')

                } else if (inputOculto.value === "" && this.valor !== 0) {
                    let index = this.servicos.indexOf(this.valor);
                    if (index > -1) {
                        this.servicos.splice(index, 1);
                        this.valor = ""
                    }
                    idOcultoLabel.classList.remove("mostrar")
                    idOcultoLabel.classList.add('oculto')
                    idMostrarLabel.classList.remove('oculto')
                    idMostrarLabel.classList.add('mostrar')
                }
            },
            mostrar() {
                let info = document.getElementById(`${this.chave}`);
                info.classList.add('div--show');
            },

            esconder() {
                if (this.editar && !this.editouStar && this.editou) {
                    let r = confirm("Deseja realmente sair sem salvar?")
                    if (r) {
                        this.fornecedorUpdated = {
                            razao_social: this.fornecedor.razao_social,
                            nome_fantasia: this.fornecedor.nome_fantasia,
                            cnpj: this.fornecedor.cnpj,
                            inscricao_estadual: this.fornecedor.inscricao_estadual,
                            inscricao_municipal: this.fornecedor.inscricao_municipal,
                            servico: this.fornecedor.servico,
                            contato: this.fornecedor.contato,
                            cargo: this.fornecedor.cargo,
                            telefone1: this.fornecedor.telefone1,
                            telefone2: this.fornecedor.telefone2,
                            telefone3: this.fornecedor.telefone3,
                            email: this.fornecedor.email,
                            redes_sociais: this.fornecedor.redes_sociais,
                            rua: this.fornecedor.rua,
                            bairro: this.fornecedor.bairro,
                            cidade: this.fornecedor.cidade,
                            estado: {
                                text: this.fornecedor.estado.nome, value: this.fornecedor.estado.id
                            },
                            description: this.fornecedor.description,
                            userupdate: this.user,
                        }
                        this.editar = false;
                        this.starEdit = false;
                        let info = document.getElementById(`${this.chave}`);
                        info.classList.remove('div--show');
                    }
                } else {
                    this.editouStar = false
                    this.editar = false
                    this.starEdit = false
                    this.editou = false
                    let info = document.getElementById(`${this.chave}`);
                    info.classList.remove('div--show');
                }

            },

            atualizaRatingServico(rating) {
                this.rateStarLoading = true;
                this.ratingServico = rating
                fornecedores.atualizarRating(this.fornecedor.id, this.ratingServico).then((resposta) => {
                    this.rateStarLoading = false;
                    this.editouStar = true
                })
            },

            atualizaRatingPreco(rating) {
                this.ratePrecoLoading = true;
                this.ratingPreco = rating
                fornecedores.atualizarRatingPreco(this.fornecedor.id, this.ratingPreco).then((resposta) => {
                    this.ratePrecoLoading = false;
                    this.editouStar = true
                })
            },

            listarServicos() {
                clearTimeout(this.timeout);
                var vm = this;
                var divServicos = document.getElementById('servicosPesquisa')
                this.timeout = setTimeout(function () {
                    vm.fornecedorUpdated.servico.value = null;
                    vm.loading = true;
                    let res = servicos.listar(vm.fornecedorUpdated.servico.text).then(res => {
                        vm.loading = false;
                        vm.servicos = res.data;
                    })

                    if (!divServicos.classList.contains('servicosPesquisa--show')) {
                        divServicos.classList.add('servicosPesquisa--show')
                    }
                }, 800)


            },

            listarEstados() {
                clearTimeout(this.timeout);
                var vm = this;
                var divEstados = document.getElementById('estadosPesquisa')
                this.timeout = setTimeout(function () {
                    vm.fornecedorUpdated.estado.value = null;
                    vm.loading = true;
                    let res = estados.listar(vm.fornecedorUpdated.estado.text).then(res => {
                        vm.loading = false;
                        vm.estados = res.data;
                    })

                    if (!divEstados.classList.contains('estadosPesquisa--show')) {
                        divEstados.classList.add('estadosPesquisa--show')
                    }
                }, 800)


            },

            preencherServico(servico) {
                var servicoInput = document.getElementById('servico')
                var divServicos = document.getElementById('servicosPesquisa')
                this.fornecedorUpdated.servico.text = servico.name
                this.fornecedorUpdated.servico.value = servico.id
                divServicos.classList.remove('servicosPesquisa--show')
            },

            preencherEstado(estado) {
                var estadoInput = document.getElementById('estado')
                var divEstados = document.getElementById('estadosPesquisa')
                this.fornecedorUpdated.estado.text = estado.nome
                this.fornecedorUpdated.estado.value = estado.id
                divEstados.classList.remove('estadosPesquisa--show')
            },

            edit() {
                this.editar = true;
                this.starEdit = true;
                // let tags = this.fornecedorUpdated.tagsString.replace(/\s+/g, '')
                // tags = tags.split(",")
                // tags.forEach((element, index) => {
                //     this.tags[index] = {
                //         text: element,
                //         tiClasses: ["ti-valid"]
                //     }
                // });
            },

            save() {
                this.updating = true;
                let vm = this
                fornecedores.atualizarFornecedor(this.fornecedor.id, this.fornecedorUpdated).then((resposta) => {
                    setTimeout(() => {
                        vm.editar = false;
                        vm.updating = false;
                        vm.$router.go()
                    }, 2500)
                })
            },

            verificar() {
                // this.fornecedorUpdated.tagsString = ''
                // this.tags.forEach((element, index, array) => {
                //     if (index != array.length - 1) {
                //         this.fornecedorUpdated.tagsString += element.text + ', '
                //     } else {
                //         this.fornecedorUpdated.tagsString += element.text
                //     }
                // })

                this.$v.fornecedorUpdated.$touch();
                this.$v.tags.$touch();
                if (this.$v.fornecedorUpdated.$error) return

                this.save()
            },

            excluir() {
                let r = confirm("Esse é um processo irreversível de exclusão desse fornecedor. Você deseja realmente excluir?")
                if (r) {
                    let vm = this
                    this.updating = true;
                    fornecedores.removeFornecedor(this.fornecedor.id).then(resposta => {
                        setTimeout(() => {
                            vm.editar = false;
                            vm.updating = false;
                            if (!resposta.data.error) {
                                vm.$router.go()
                            }
                        }, 2500)
                    })
                }
            }
        },

        computed: {
            ratingPrecoReturn() {
                return this.ratingPreco;
            },
            returnServicos() {
                return this.servicos
            },
            returnEstados() {
                return this.estados
            }

        },

        validations: {
            fornecedorUpdated: {
                razao_social: {required},
                nome_fantasia: {required},
                cnpj: {required, minLength: minLength(14)},
                contato: {required},
                cargo: {required},
                telefone1: {required},
                email: {required},
                rua: {required},
                bairro: {required},
                cidade: {required},

            },
            tags: {required},
        },

        watch: {
            'fornecedorUpdated': {
                handler: function (val, oldVal) {
                    if (this.editou == false) {
                        this.editou = true
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables.scss';

    .div {
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
        height: 0;
        overflow: hidden;
        transition: opacity .5s ease-out;
        width: 40%;

        @media(max-width: $max-xs) {
            width: 93%;
        }

        @media(max-width: $max-sm) and (min-width: $min-sm) {
            width: 60%;
        }

        &--show {
            opacity: 1;
            height: 100%;
        }
    }

    .container-fornecedor {
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        align-items: center;
        border: 1px solid #E3E3EB;
        border-radius: .5rem;
        height: 5rem;
        margin-bottom: 1.6rem;

        .star {
            @media(max-width: $max-xs) {
                display: none !important;
            }
        }

        h1 {
            font-size: 1.2rem;
            font-weight: bold;
            line-height: 1.5rem;
            color: #35364D;
            width: 15%;
            @media(max-width: $max-xs) {
                width: 55%;
                font-size: 1.5rem;
            }
        }

        h2 {
            font-size: 1.2rem;
            line-height: 1.7rem;
            font-weight: 400;
            width: 12%;
            color: #35364D;
            @media(max-width: $max-xs) {
                text-align: right;
                width: initial;
            }
        }

        #inscricao {
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        .telefone {
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        button {
            background: transparent;
            font-size: 1.2rem;
            text-decoration: underline;
            color: #35364D;
            border: 0;
            cursor: pointer;
        }

        #maisInfo {
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        #maisInfoCel {
            display: none;

            @media(max-width: $max-xs) {
                display: block;
                text-decoration: none;
                font-size: 1.8rem;
            }
        }
    }

    .container-informacoes {
        position: relative;
        box-shadow: -6px -5px 7px rgba(0, 0, 0, .2);
        margin-left: 6%;
        background-color: white;
        height: inherit;
        padding: 1rem 2rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        @media(max-width: $max-xs) {
            box-shadow: -1px -5px 7px rgba(0, 0, 0, .2);
            width: 100%;
            margin-left: 2%;
        }

        .img {
            width: 100%;
            padding-top: 1rem;
            padding-left: 3rem;

            button {
                border: 0;
                background: transparent;
                cursor: pointer;

                img {
                    @media(max-width: $max-xs) {
                        width: 2rem;
                        padding-top: 1rem;
                        padding-left: -4rem;
                    }
                }
            }
        }

        .principal {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 70%;
            overflow-y: scroll;
            overflow-x: hidden;

            @media(max-width: $max-xs) {
                width: 75%;
            }

            &__header {
                margin-top: 4.5rem;
                margin-bottom: 3.8rem;
                width: 100%;
                display: flex;
                justify-content: space-between;

                h1 {
                    font-size: 2.8rem;
                    color: #253044;
                    @media(max-width: $max-xs) {
                        font-size: 2rem;
                    }
                }

                button {
                    border: 1px solid gray;
                    background-color: transparent;
                    text-decoration: none;
                    font-size: 1.2rem;
                    color: #35364D;
                    cursor: pointer;
                    padding: .5rem 1rem;
                    height: 3rem;
                }

                .excluir {
                    border: 1px solid #FF514D;
                    color: #FF514D;
                    margin-left: 3rem;
                }
            }

            &__box {
                width: 100%;
                border-bottom: 1px solid #F5F5F5;
                padding-bottom: 1.4rem;
                margin-bottom: 2.2rem;

                h3 {
                    font-size: 1.5rem;
                    color: #35364D;
                    margin-bottom: .5rem;
                }

                h2 {
                    font-size: 1.8rem;
                    color: #35364D;
                    font-weight: bold;
                    line-height: 2.4rem;
                }

                input, textarea {
                    border: 0;
                    font-size: 1.7rem;
                    color: #35364D;
                    font-weight: bold;
                    line-height: 2.4rem;
                    margin-top: 1rem;
                    margin-bottom: .5rem;
                    width: 100%;
                    word-break: break-word;
                    resize: none;
                }

                input::first-line, textarea::first-line {
                    background-color: #FFFFDA;
                }

                &--phone {
                    h2 {
                        margin-bottom: 1.5rem;
                    }
                }

                &--address {
                    h4 {
                        font-size: 1.5rem;
                        color: #35364D;
                        font-weight: bold;
                        margin-bottom: 1.4rem;
                    }

                    h2 {
                        margin-bottom: 1.5rem;
                    }
                }

                &--rating {
                    h3 {
                        margin-bottom: .6rem;
                    }
                }

                &--obs {
                    padding-bottom: 5rem;

                    h2 {
                        line-break: auto;
                    }
                }

                &--tags {
                    .form__tags {
                        margin-top: 2rem;
                        margin-bottom: 3rem;

                        .vue-tags-input {
                            margin-bottom: 1.9rem;
                            margin-top: 1.1rem;

                            .ti-input {
                                border: 0;
                                width: 40rem;
                                border-radius: .5rem;

                                input::first-line {
                                    background-color: white;
                                }

                                input {
                                    color: #35364D;
                                }

                                input::placeholder {
                                    opacity: 0;
                                }

                                .ti-tag {
                                    background-color: #F5F5F5;
                                    border-radius: 2rem;
                                    font-size: 1.5rem;
                                    color: #35364D;
                                }
                            }
                        }

                        .vue-tags-input.invalidTags {
                            .ti-input {
                                border: 1px solid #FF514D;
                            }
                        }
                    }
                }

                &--servico {
                    .principal3 {
                        &__box1 {
                            border-radius: 9px;


                            h2 {

                                display: inline-block;
                                flex-grow: 3;
                                margin-right: .75rem;
                                padding: 1rem;
                                margin-top: 0.75rem;
                                background-color: #fdf9da;
                                border-radius: 1.6rem;
                                font-size: 1.4rem;
                                font-weight: bold;
                            }

                        }
                    }

                    .form {

                        #servicos {
                            .principal4 {
                                &__box1 {
                                    border: 0;
                                    border-radius: .5rem;
                                    width: 100%;

                                    h2 {
                                        display: inline-block;
                                        flex-grow: 3;
                                        margin-right: .75rem;
                                        padding: 1rem;
                                        margin-top: 0.75rem;
                                        background-color: #FFFFDA;
                                        border-radius: 1.6rem;
                                        font-size: 1.5rem;
                                        color: #35364D;
                                    }

                                }
                            }

                            .lista_servico {
                                padding: 0;
                                width: 100%;

                                hr {
                                    border: 0.5px solid #E3E3EB;
                                }

                                input[type='checkbox'] {
                                    position: fixed;
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

                                .input {


                                    input {
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

                                    .oculto {
                                        display: none;
                                    }
                                }
                            }
                        }
                    }

                    .estadosPesquisa {
                        display: none;
                        background-color: white;
                        padding: 0rem;

                        li {
                            width: 100%;
                            height: 3rem;

                            button {
                                display: flex;
                                justify-content: flex-start;
                                width: inherit;
                                font-size: 1.5rem;
                                background: transparent;
                                border: 0;
                                cursor: pointer;
                                color: #35364D;
                            }
                        }

                        &--show {
                            display: block;
                        }
                    }
                }
            }

            .invalido {
                color: #FF514D;
            }
        }
    }

    .principal::-webkit-scrollbar {
        width: 0px;
    }
</style>
