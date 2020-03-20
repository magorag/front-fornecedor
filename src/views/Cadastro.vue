<template>
    <div class="form-cadastro" :class="{'form-cadastro--loading' : mostrar, 'form-cadastro--hide' : repetida}">

        <div class="form-cadastro__help" style="display: none;">
            <img src="@/assets/help.svg">
        </div>

        <div class="carregando" v-if="!this.mostrar && !this.repetida">
            <h1>Ficha de Cadastro de Novo Fornecedor</h1>
            <letter-cube></letter-cube>
            <h3>Validando sua chave de acesso</h3>
        </div>

        <div class="div-hash-repetida" v-if="this.repetida">
            <div class="div-hash-repetida__content">
                <img src="@/assets/icon-expirou.svg" alt=""/>
                <h2>Este link expirou.</h2>
                <h3>Entre em contato com a <strong>Dinâmica Produções</strong> para obter um novo link.</h3>
            </div>
        </div>

        <form method="post" v-if="this.mostrar && !this.repetida">
            <h1>Ficha de Cadastro de Novo Fornecedor</h1>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.nome_fantasia.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="nome_fantasia"
                       type="text"
                       id="nome_fantasia"
                       v-model="fornecedor.nome_fantasia"
                       :class="{invalid: $v.fornecedor.nome_fantasia.$error}"/>
                <label for="nome_fantasia">
                    Nome fantasia:
                </label>
            </div>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.razao_social.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="razao_social"
                       type="text"
                       id="razao_social"
                       v-model="fornecedor.razao_social"
                       :class="{invalid: $v.fornecedor.razao_social.$error}"/>
                <label for="razao_social">
                    Razão Social:
                </label>
            </div>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.cnpj.$error">
                    * Esse campo é obrigatório e precisa ter 11 ou 14 números!
                </div>
                <input name="cnpj"
                       type="text"
                       v-mask='["###.###.###-##", "##.###.###/####-##"]'
                       id="cnpj"
                       v-model="fornecedor.cnpj"
                       :class="{invalid: $v.fornecedor.cnpj.$error}"/>
                <label for="cnpj">
                    CNPJ ou CPF:
                </label>
            </div>

            <div class="form__group">
                <input name="inscricao_estadual"
                       type="text"
                       id="inscricao_estadual"
                       v-model="fornecedor.inscricao_estadual"/>
                <label for="inscricao_estadual">
                    Inscrição Estadual:
                </label>
            </div>

            <div class="form__group">
                <input name="inscricao_municipal"
                       type="text"
                       id="inscricao_municipal"
                       v-model="fornecedor.inscricao_municipal"/>
                <label for="inscricao_municipal">Inscrição Municipal:</label>
            </div>

            <!--            <div class="form__s">-->
            <!--                <label>-->
            <!--                    Tags (separe as tags com enter)-->
            <!--                </label>-->
            <!--                <vue-tags-input-->
            <!--                        v-model="tag"-->
            <!--                        :tags="tags"-->
            <!--                        @tags-changed="newTags => tags = newTags" :class="{invalidTags: $v.tags.$error}"/>-->
            <!--                <div class="error" v-if="$v.tags.$error">* Esse campo é obrigatório</div>-->
            <!--            </div>-->
            <div class="form__group">
                <div id="servicos" style="display: none">
                    <div class="principal">
                        <div class="principal__box">
                            <h2 v-for="serv in fornecedor.servico">{{ serv }}</h2>
                        </div>
                    </div>
                    <br>
                    <div class="lista_servico">
                        <hr>
                        <input type="checkbox" id="AGÊNCIA DE VIAGENS E TURISMO" value="AGÊNCIA DE VIAGENS E TURISMO"
                               v-model="fornecedor.servico">
                        <label for="AGÊNCIA DE VIAGENS E TURISMO">AGÊNCIA DE VIAGENS E TURISMO</label>
                        <hr>
                        <input type="checkbox" id="ÁGUA PERSONALIZADA" value="ÁGUA PERSONALIZADA"
                               v-model="fornecedor.servico">
                        <label for="ÁGUA PERSONALIZADA">ÁGUA PERSONALIZADA</label>
                        <hr>
                        <input type="checkbox" id="AMBULÂNCIA E UTI" value="AMBULÂNCIA E UTI"
                               v-model="fornecedor.servico">
                        <label for="AMBULÂNCIA E UTI">AMBULÂNCIA E UTI</label>
                        <hr>
                        <input type="checkbox" id="AR CONDICIONADO" value="AR CONDICIONADO"
                               v-model="fornecedor.servico">
                        <label for="AR CONDICIONADO">AR CONDICIONADO</label>
                        <hr>
                        <input type="checkbox" id="ARRANJO FLORAL" value="ARRANJO FLORAL" v-model="fornecedor.servico">
                        <label for="ARRANJO FLORAL">ARRANJO FLORAL</label>
                        <hr>
                        <input type="checkbox" id="ARTIGOS ESPORTIVOS" value="ARTIGOS ESPORTIVOS"
                               v-model="fornecedor.servico">
                        <label for="ARTIGOS ESPORTIVOS">ARTIGOS ESPORTIVOS</label>
                        <hr>
                        <input type="checkbox" id="ATIVAÇÃO" value="ATIVAÇÃO" v-model="fornecedor.servico">
                        <label for="ATIVAÇÃO">ATIVAÇÃO</label>
                        <hr>
                        <input type="checkbox" id="ATRAÇÃO MUSICAL" value="ATRAÇÃO MUSICAL"
                               v-model="fornecedor.servico">
                        <label for="ATRAÇÃO MUSICAL">ATRAÇÃO MUSICAL</label>
                        <hr>
                        <input type="checkbox" id="BALÕES/BEXIGAS" value="BALÕES/BEXIGAS" v-model="fornecedor.servico">
                        <label for="BALÕES/BEXIGAS">BALÕES/BEXIGAS</label>
                        <hr>
                        <input type="checkbox" id="BANDA" value="BANDA" v-model="fornecedor.servico">
                        <label for="BANDA">BANDA</label>
                        <hr>
                        <input type="checkbox" id="BAR SERVIÇO" value="BAR SERVIÇO" v-model="fornecedor.servico">
                        <label for="BAR SERVIÇO">BAR SERVIÇO</label>
                        <hr>
                        <input type="checkbox" id="BARMAN" value="BARMAN" v-model="fornecedor.servico">
                        <label for="BARMAN">BARMAN</label>
                        <hr>
                        <input type="checkbox" id="BIJUTERIAS E PEÇAS" value="BIJUTERIAS E PEÇAS"
                               v-model="fornecedor.servico">
                        <label for="BIJUTERIAS E PEÇAS">BIJUTERIAS E PEÇAS</label>
                        <hr>
                        <input type="checkbox" id="BIKE FOOD" value="BIKE FOOD" v-model="fornecedor.servico">
                        <label for="BIKE FOOD">BIKE FOOD</label>
                        <hr>
                        <input type="checkbox" id="BLIMP" value="BLIMP" v-model="fornecedor.servico">
                        <label for="BLIMP">BLIMP</label>
                        <hr>
                        <input type="checkbox" id="BOLSA, SACOLA E MALA" value="BOLSA, SACOLA E MALA"
                               v-model="fornecedor.servico">
                        <label for="BOLSA, SACOLA E MALA">BOLSA, SACOLA E MALA</label>
                        <hr>
                        <input type="checkbox" id="BOMBEIRO E EQUIPAMENTOS" value="BOMBEIRO E EQUIPAMENTOS"
                               v-model="fornecedor.servico">
                        <label for="BOMBEIRO E EQUIPAMENTOS">BOMBEIRO E EQUIPAMENTOS</label>
                        <hr>
                        <input type="checkbox" id="BOTTON" value="BOTTON" v-model="fornecedor.servico">
                        <label for="BOTTON">BOTTON</label>
                        <hr>
                        <input type="checkbox" id="BRIGADEIRO" value="BRIGADEIRO" v-model="fornecedor.servico">
                        <label for="BRIGADEIRO">BRIGADEIRO</label>
                        <hr>
                        <input type="checkbox" id="BRINDE" value="BRINDE" v-model="fornecedor.servico">
                        <label for="BRINDE">BRINDE</label>
                        <hr>
                        <input type="checkbox" id="BRINDE SUSTENTÁVEL" value="BRINDE SUSTENTÁVEL"
                               v-model="fornecedor.servico">
                        <label for="BRINDE SUSTENTÁVEL">BRINDE SUSTENTÁVEL</label>
                        <hr>
                        <input type="checkbox" id="BUFFET" value="BUFFET" v-model="fornecedor.servico">
                        <label for="BUFFET">BUFFET</label>
                        <hr>
                        <input type="checkbox" id="BUFFET MATERIAIS" value="BUFFET MATERIAIS"
                               v-model="fornecedor.servico">
                        <label for="BUFFET MATERIAIS">BUFFET MATERIAIS</label>
                        <hr>
                        <input type="checkbox" id="BUREAU DE EVENTOS" value="BUREAU DE EVENTOS"
                               v-model="fornecedor.servico">
                        <label for="BUREAU DE EVENTOS">BUREAU DE EVENTOS</label>
                        <hr>
                        <input type="checkbox" id="CABINE E TOTEM DE FOTOS" value="CABINE E TOTEM DE FOTOS"
                               v-model="fornecedor.servico">
                        <label for="CABINE E TOTEM DE FOTOS">CABINE E TOTEM DE FOTOS</label>
                        <hr>
                        <input type="checkbox" id="CADERNO E MOLESQUINE" value="CADERNO E MOLESQUINE"
                               v-model="fornecedor.servico">
                        <label for="CADERNO E MOLESQUINE">CADERNO E MOLESQUINE</label>
                        <hr>
                        <input type="checkbox" id="CAMISETA" value="CAMISETA" v-model="fornecedor.servico">
                        <label for="CAMISETA">CAMISETA</label>
                        <hr>
                        <input type="checkbox" id="CANECA PERSONALIZADA" value="CANECA PERSONALIZADA"
                               v-model="fornecedor.servico">
                        <label for="CANECA PERSONALIZADA">CANECA PERSONALIZADA</label>
                        <hr>
                        <input type="checkbox" id="CANETA" value="CANETA" v-model="fornecedor.servico">
                        <label for="CANETA">CANETA</label>
                        <hr>
                        <input type="checkbox" id="CARGA TRANSPORTE" value="CARGA TRANSPORTE"
                               v-model="fornecedor.servico">
                        <label for="CARGA TRANSPORTE">CARGA TRANSPORTE</label>
                        <hr>
                        <input type="checkbox" id="CARICATURA" value="CARICATURA" v-model="fornecedor.servico">
                        <label for="CARICATURA">CARICATURA</label>
                        <hr>
                        <input type="checkbox" id="CARICATURA DIGITAL" value="CARICATURA DIGITAL"
                               v-model="fornecedor.servico">
                        <label for="CARICATURA DIGITAL">CARICATURA DIGITAL</label>
                        <hr>
                        <input type="checkbox" id="CARREGADOR" value="CARREGADOR" v-model="fornecedor.servico">
                        <label for="CARREGADOR">CARREGADOR</label>
                        <hr>
                        <input type="checkbox" id="CARRINHO FOOD" value="CARRINHO FOOD" v-model="fornecedor.servico">
                        <label for="CARRINHO FOOD">CARRINHO FOOD</label>
                        <hr>
                        <input type="checkbox" id="CENOGRAFIA" value="CENOGRAFIA" v-model="fornecedor.servico">
                        <label for="CENOGRAFIA">CENOGRAFIA</label>
                        <hr>
                        <input type="checkbox" id="CHAVEIRO" value="CHAVEIRO" v-model="fornecedor.servico">
                        <label for="CHAVEIRO">CHAVEIRO</label>
                        <hr>
                        <input type="checkbox" id="CHOCOLATE" value="CHOCOLATE" v-model="fornecedor.servico">
                        <label for="CHOCOLATE">CHOCOLATE</label>
                        <hr>
                        <input type="checkbox" id="CHURRASCARIA" value="CHURRASCARIA" v-model="fornecedor.servico">
                        <label for="CHURRASCARIA">CHURRASCARIA</label>
                        <hr>
                        <input type="checkbox" id="CLIMATIZAÇÃO" value="CLIMATIZAÇÃO" v-model="fornecedor.servico">
                        <label for="CLIMATIZAÇÃO">CLIMATIZAÇÃO</label>
                        <hr>
                        <input type="checkbox" id="COMUNICAÇÃO VISUAL" value="COMUNICAÇÃO VISUAL"
                               v-model="fornecedor.servico">
                        <label for="COMUNICAÇÃO VISUAL">COMUNICAÇÃO VISUAL</label>
                        <hr>
                        <input type="checkbox" id="CONFEITARIA" value="CONFEITARIA" v-model="fornecedor.servico">
                        <label for="CONFEITARIA">CONFEITARIA</label>
                        <hr>
                        <input type="checkbox" id="CONSULTORIA ESTRATÉGIA" value="CONSULTORIA ESTRATÉGIA"
                               v-model="fornecedor.servico">
                        <label for="CONSULTORIA ESTRATÉGIA">CONSULTORIA ESTRATÉGIA</label>
                        <hr>
                        <input type="checkbox" id="COPIADORA" value="COPIADORA" v-model="fornecedor.servico">
                        <label for="COPIADORA">COPIADORA</label>
                        <hr>
                        <input type="checkbox" id="CORDÃO DE CRACHÁ" value="CORDÃO DE CRACHÁ"
                               v-model="fornecedor.servico">
                        <label for="CORDÃO DE CRACHÁ">CORDÃO DE CRACHÁ</label>
                        <hr>
                        <input type="checkbox" id="COREOGRAFIA" value="COREOGRAFIA" v-model="fornecedor.servico">
                        <label for="COREOGRAFIA">COREOGRAFIA</label>
                        <hr>
                        <input type="checkbox" id="COZINHA INCLUSIVA" value="COZINHA INCLUSIVA"
                               v-model="fornecedor.servico">
                        <label for="COZINHA INCLUSIVA">COZINHA INCLUSIVA</label>
                        <hr>
                        <input type="checkbox" id="CREDENCIAL" value="CREDENCIAL" v-model="fornecedor.servico">
                        <label for="CREDENCIAL">CREDENCIAL</label>
                        <hr>
                        <input type="checkbox" id="CURSOS" value="CURSOS" v-model="fornecedor.servico">
                        <label for="CURSOS">CURSOS</label>
                        <hr>
                        <input type="checkbox" id="DEGUSTAÇÃO CERVEJA" value="DEGUSTAÇÃO CERVEJA"
                               v-model="fornecedor.servico">
                        <label for="DEGUSTAÇÃO CERVEJA">DEGUSTAÇÃO CERVEJA</label>
                        <hr>
                        <input type="checkbox" id="DEPARTAMENTO DE PROMOÇÃO" value="DEPARTAMENTO DE PROMOÇÃO"
                               v-model="fornecedor.servico">
                        <label for="DEPARTAMENTO DE PROMOÇÃO">DEPARTAMENTO DE PROMOÇÃO</label>
                        <hr>
                        <input type="checkbox" id="DINÂMICA CORPORATIVA" value="DINÂMICA CORPORATIVA"
                               v-model="fornecedor.servico">
                        <label for="DINÂMICA CORPORATIVA">DINÂMICA CORPORATIVA</label>
                        <hr>
                        <input type="checkbox" id="DIRETOR TÉCNICO" value="DIRETOR TÉCNICO"
                               v-model="fornecedor.servico">
                        <label for="DIRETOR TÉCNICO">DIRETOR TÉCNICO</label>
                        <hr>
                        <input type="checkbox" id="DISTRIBUIDORA BEBIDAS" value="DISTRIBUIDORA BEBIDAS"
                               v-model="fornecedor.servico">
                        <label for="DISTRIBUIDORA BEBIDAS">DISTRIBUIDORA BEBIDAS</label>
                        <hr>
                        <input type="checkbox" id="DJ" value="DJ" v-model="fornecedor.servico">
                        <label for="DJ">DJ</label>
                        <hr>
                        <input type="checkbox" id="DOCE" value="DOCE" v-model="fornecedor.servico">
                        <label for="DOCE">DOCE</label>
                        <hr>
                        <input type="checkbox" id="EMBALAGEM" value="EMBALAGEM" v-model="fornecedor.servico">
                        <label for="EMBALAGEM">EMBALAGEM</label>
                        <hr>
                        <input type="checkbox" id="EQUIPAMENTO CREDENCIAMENTO" value="EQUIPAMENTO CREDENCIAMENTO"
                               v-model="fornecedor.servico">
                        <label for="EQUIPAMENTO CREDENCIAMENTO">EQUIPAMENTO CREDENCIAMENTO</label>
                        <hr>
                        <input type="checkbox" id="EQUIPAMENTO INFORMÁTICA" value="EQUIPAMENTO INFORMÁTICA"
                               v-model="fornecedor.servico">
                        <label for="EQUIPAMENTO INFORMÁTICA">EQUIPAMENTO INFORMÁTICA</label>
                        <hr>
                        <input type="checkbox" id="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA"
                               value="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA" v-model="fornecedor.servico">
                        <label for="EQUIPAMENTO TRADUÇÃO SIMULTÂNEA">EQUIPAMENTO TRADUÇÃO SIMULTÂNEA</label>
                        <hr>
                        <input type="checkbox" id="ESPAÇO DE EVENTO" value="ESPAÇO DE EVENTO"
                               v-model="fornecedor.servico">
                        <label for="ESPAÇO DE EVENTO">ESPAÇO DE EVENTO</label>
                        <hr>
                        <input type="checkbox" id="ESTACIONAMENTO" value="ESTACIONAMENTO" v-model="fornecedor.servico">
                        <label for="ESTACIONAMENTO">ESTACIONAMENTO</label>
                        <hr>
                        <input type="checkbox" id="ETIQUETA PARA UNIFORMES" value="ETIQUETA PARA UNIFORMES"
                               v-model="fornecedor.servico">
                        <label for="ETIQUETA PARA UNIFORMES">ETIQUETA PARA UNIFORMES</label>
                        <hr>
                        <input type="checkbox" id="FOTOGRAFO" value="FOTOGRAFO" v-model="fornecedor.servico">
                        <label for="FOTOGRAFO">FOTOGRAFO</label>
                        <hr>
                        <input type="checkbox" id="GAMES" value="GAMES" v-model="fornecedor.servico">
                        <label for="GAMES">GAMES</label>
                        <hr>
                        <input type="checkbox" id="GERADOR" value="GERADOR" v-model="fornecedor.servico">
                        <label for="GERADOR">GERADOR</label>
                        <hr>
                        <input type="checkbox" id="GRAFICA DIGITAL" value="GRAFICA DIGITAL"
                               v-model="fornecedor.servico">
                        <label for="GRAFICA DIGITAL">GRAFICA DIGITAL</label>
                        <hr>
                        <input type="checkbox" id="GRÁFICA OFFSET" value="GRÁFICA OFFSET" v-model="fornecedor.servico">
                        <label for="GRÁFICA OFFSET">GRÁFICA OFFSET</label>
                        <hr>
                        <input type="checkbox" id="HOTEL" value="HOTEL" v-model="fornecedor.servico">
                        <label for="HOTEL">HOTEL</label>
                        <hr>
                        <input type="checkbox" id="ILUMINAÇÃO" value="ILUMINAÇÃO" v-model="fornecedor.servico">
                        <label for="ILUMINAÇÃO">ILUMINAÇÃO</label>
                        <hr>
                        <input type="checkbox" id="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV"
                               value="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV" v-model="fornecedor.servico">
                        <label for="IMPRESSÃO COMUNICAÇÃO VISUAL E PDV">IMPRESSÃO COMUNICAÇÃO VISUAL E PDV</label>
                        <hr>
                        <input type="checkbox" id="INFRAESTRUTURA ELÉTRICA" value="INFRAESTRUTURA ELÉTRICA"
                               v-model="fornecedor.servico">
                        <label for="INFRAESTRUTURA ELÉTRICA">INFRAESTRUTURA ELÉTRICA</label>
                        <hr>
                        <input type="checkbox" id="INFRAESTRUTURA HIDRÁULICA" value="INFRAESTRUTURA HIDRÁULICA"
                               v-model="fornecedor.servico">
                        <label for="INFRAESTRUTURA HIDRÁULICA">INFRAESTRUTURA HIDRÁULICA</label>
                        <hr>
                        <input type="checkbox" id="INTERNET WI-FI" value="INTERNET WI-FI" v-model="fornecedor.servico">
                        <label for="INTERNET WI-FI">INTERNET WI-FI</label>
                        <hr>
                        <input type="checkbox" id="LIMPEZA" value="LIMPEZA" v-model="fornecedor.servico">
                        <label for="LIMPEZA">LIMPEZA</label>
                        <hr>
                        <input type="checkbox" id="LOCAÇÃO DE TABLET" value="LOCAÇÃO DE TABLET"
                               v-model="fornecedor.servico">
                        <label for="LOCAÇÃO DE TABLET">LOCAÇÃO DE TABLET</label>
                        <hr>
                        <input type="checkbox" id="LOCADORA CARRO" value="LOCADORA CARRO" v-model="fornecedor.servico">
                        <label for="LOCADORA CARRO">LOCADORA CARRO</label>
                        <hr>
                        <input type="checkbox" id="MÁGICO" value="MÁGICO" v-model="fornecedor.servico">
                        <label for="MÁGICO">MÁGICO</label>
                        <hr>
                        <input type="checkbox" id="MÃO DE OBRA" value="MÃO DE OBRA" v-model="fornecedor.servico">
                        <label for="MÃO DE OBRA">MÃO DE OBRA</label>
                        <hr>
                        <input type="checkbox" id="MARCENARIA" value="MARCENARIA" v-model="fornecedor.servico">
                        <label for="MARCENARIA">MARCENARIA</label>
                        <hr>
                        <input type="checkbox" id="MASSAGEM" value="MASSAGEM" v-model="fornecedor.servico">
                        <label for="MASSAGEM">MASSAGEM</label>
                        <hr>
                        <input type="checkbox" id="MESTRE DE CERIMÔNIAS" value="MESTRE DE CERIMÔNIAS"
                               v-model="fornecedor.servico">
                        <label for="MESTRE DE CERIMÔNIAS">MESTRE DE CERIMÔNIAS</label>
                        <hr>
                        <input type="checkbox" id="MOBILIÁRIO" value="MOBILIÁRIO" v-model="fornecedor.servico">
                        <label for="MOBILIÁRIO">MOBILIÁRIO</label>
                        <hr>
                        <input type="checkbox" id="MOBILIÁRIO LED" value="MOBILIÁRIO LED" v-model="fornecedor.servico">
                        <label for="MOBILIÁRIO LED">MOBILIÁRIO LED</label>
                        <hr>
                        <input type="checkbox" id="OBJETOS DE CASA" value="OBJETOS DE CASA"
                               v-model="fornecedor.servico">
                        <label for="OBJETOS DE CASA">OBJETOS DE CASA</label>
                        <hr>
                        <input type="checkbox" id="ÔNIBUS E VAN" value="ÔNIBUS E VAN" v-model="fornecedor.servico">
                        <label for="ÔNIBUS E VAN">ÔNIBUS E VAN</label>
                        <hr>
                        <input type="checkbox" id="PAISAGISMO" value="PAISAGISMO" v-model="fornecedor.servico">
                        <label for="PAISAGISMO">PAISAGISMO</label>
                        <hr>
                        <input type="checkbox" id="PALESTRANTE" value="PALESTRANTE" v-model="fornecedor.servico">
                        <label for="PALESTRANTE">PALESTRANTE</label>
                        <hr>
                        <input type="checkbox" id="PAPELARIA PERSONALIZADA" value="PAPELARIA PERSONALIZADA"
                               v-model="fornecedor.servico">
                        <label for="PAPELARIA PERSONALIZADA">PAPELARIA PERSONALIZADA</label>
                        <hr>
                        <input type="checkbox" id="PIPOCA" value="PIPOCA" v-model="fornecedor.servico">
                        <label for="PIPOCA">PIPOCA</label>
                        <hr>
                        <input type="checkbox" id="PISO EASYFLOOR" value="PISO EASYFLOOR" v-model="fornecedor.servico">
                        <label for="PISO EASYFLOOR">PISO EASYFLOOR</label>
                        <hr>
                        <input type="checkbox" id="PLANTA PROJETO" value="PLANTA PROJETO" v-model="fornecedor.servico">
                        <label for="PLANTA PROJETO">PLANTA PROJETO</label>
                        <hr>
                        <input type="checkbox" id="PLATAFORMAS DIGITAIS" value="PLATAFORMAS DIGITAIS"
                               v-model="fornecedor.servico">
                        <label for="PLATAFORMAS DIGITAIS">PLATAFORMAS DIGITAIS</label>
                        <hr>
                        <input type="checkbox" id="PRODUTOR" value="PRODUTOR" v-model="fornecedor.servico">
                        <label for="PRODUTOR">PRODUTOR</label>
                        <hr>
                        <input type="checkbox" id="PROJEÇÃO" value="PROJEÇÃO" v-model="fornecedor.servico">
                        <label for="PROJEÇÃO">PROJEÇÃO</label>
                        <hr>
                        <input type="checkbox" id="PROJEÇÃO 3D" value="PROJEÇÃO 3D" v-model="fornecedor.servico">
                        <label for="PROJEÇÃO 3D">PROJEÇÃO 3D</label>
                        <hr>
                        <input type="checkbox" id="PROJEÇÃO LED" value="PROJEÇÃO LED" v-model="fornecedor.servico">
                        <label for="PROJEÇÃO LED">PROJEÇÃO LED</label>
                        <hr>
                        <input type="checkbox" id="PULSEIRA IDENTIFICAÇÃO" value="PULSEIRA IDENTIFICAÇÃO"
                               v-model="fornecedor.servico">
                        <label for="PULSEIRA IDENTIFICAÇÃO">PULSEIRA IDENTIFICAÇÃO</label>
                        <hr>
                        <input type="checkbox" id="RÁDIO COMUNICAÇÃO" value="RÁDIO COMUNICAÇÃO"
                               v-model="fornecedor.servico">
                        <label for="RÁDIO COMUNICAÇÃO">RÁDIO COMUNICAÇÃO</label>
                        <hr>
                        <input type="checkbox" id="RECEPCIONISTA" value="RECEPCIONISTA" v-model="fornecedor.servico">
                        <label for="RECEPCIONISTA">RECEPCIONISTA</label>
                        <hr>
                        <input type="checkbox" id="SEGURANÇA" value="SEGURANÇA" v-model="fornecedor.servico">
                        <label for="SEGURANÇA">SEGURANÇA</label>
                        <hr>
                        <input type="checkbox" id="SEGURO" value="SEGURO" v-model="fornecedor.servico">
                        <label for="SEGURO">SEGURO</label>
                        <hr>
                        <input type="checkbox" id="SERRALHERIA" value="SERRALHERIA" v-model="fornecedor.servico">
                        <label for="SERRALHERIA">SERRALHERIA</label>
                        <hr>
                        <input type="checkbox" id="SITE" value="SITE" v-model="fornecedor.servico">
                        <label for="SITE">SITE</label>
                        <hr>
                        <input type="checkbox" id="SONORIZAÇÃO" value="SONORIZAÇÃO" v-model="fornecedor.servico">
                        <label for="SONORIZAÇÃO">SONORIZAÇÃO</label>
                        <hr>
                        <input type="checkbox" id="STREAMING" value="STREAMING" v-model="fornecedor.servico">
                        <label for="STREAMING">STREAMING</label>
                        <hr>
                        <input type="checkbox" id="TAPEÇARIA" value="TAPEÇARIA" v-model="fornecedor.servico">
                        <label for="TAPEÇARIA">TAPEÇARIA</label>
                        <hr>
                        <input type="checkbox" id="TELEPROMPTER" value="TELEPROMPTER" v-model="fornecedor.servico">
                        <label for="TELEPROMPTER">TELEPROMPTER</label>
                        <hr>
                        <input type="checkbox" id="TENDA E COBERTURA" value="TENDA E COBERTURA"
                               v-model="fornecedor.servico">
                        <label for="TENDA E COBERTURA">TENDA E COBERTURA</label>
                        <hr>
                        <input type="checkbox" id="TOTEM CARREGADOR" value="TOTEM CARREGADOR"
                               v-model="fornecedor.servico">
                        <label for="TOTEM CARREGADOR">TOTEM CARREGADOR</label>
                        <hr>
                        <input type="checkbox" id="TOTEM INTERATIVO" value="TOTEM INTERATIVO"
                               v-model="fornecedor.servico">
                        <label for="TOTEM INTERATIVO">TOTEM INTERATIVO</label>
                        <hr>
                        <input type="checkbox" id="TRADUTOR INTÉRPRETE" value="TRADUTOR INTÉRPRETE"
                               v-model="fornecedor.servico">
                        <label for="TRADUTOR INTÉRPRETE">TRADUTOR INTÉRPRETE</label>
                        <hr>
                        <input type="checkbox" id="TROFÉU E PLACAS" value="TROFÉU E PLACAS"
                               v-model="fornecedor.servico">
                        <label for="TROFÉU E PLACAS">TROFÉU E PLACAS</label>
                        <hr>
                        <input type="checkbox" id="UNIFILA" value="UNIFILA" v-model="fornecedor.servico">
                        <label for="UNIFILA">UNIFILA</label>
                        <hr>
                        <input type="checkbox" id="UNIFORME" value="UNIFORME" v-model="fornecedor.servico">
                        <label for="UNIFORME">UNIFORME</label>
                        <hr>
                        <input type="checkbox" id="VIDEO" value="VIDEO" v-model="fornecedor.servico">
                        <label for="VIDEO">VIDEO</label>
                        <hr>
                        <div class="input">
                            <input type="checkbox" v-on:click="mostrarInput" id="outros">
                            <label for="outros" id="idMostrarLabel" class="mostrar">OUTROS</label>
                            <input type="checkbox" v-on:click="mostrarInput" id="outros1">
                            <label for="outros1" id="idOcultoLabel" class="oculto" style="width: 50% !important;">OUTROS:
                                {{this.valor}}</label>
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
                        <div id="ocultarServico1"
                             style="display: flex; justify-content: space-between; margin-top: 1rem; margin-bottom: 1rem">
                            <h2 v-on:click.prevent="mostrarServico2"
                                style="color: #E3E3EE; cursor:pointer; font-size: 2rem">Fechar Lista</h2>
                        </div>
                    </div>
                </div>
                <div id="ocultarServico"
                     style="display: flex; justify-content: space-between; margin-top: 1rem; margin-bottom: 1rem">
                    <h2 v-on:click.prevent="mostrarServico" style="color: #E3E3EE; cursor:pointer; font-size: 2rem">
                        Abrir Lista</h2>
                </div>
                <div class="principal" id="ocultarServico2">
                    <div class="principal__box">
                        <h2 v-for="serv in fornecedor.servico">{{ serv }}</h2>
                    </div>
                </div>
                <label>
                    Especialidades:
                </label>
            </div>

            <!--            <div class="form__group">-->
            <!--                <div class="servicosPesquisa" id="servicosPesquisa">-->
            <!--                    <ul>-->
            <!--                        <li v-if="loading">-->
            <!--                            <button style="cursor:progress;" disabled>-->
            <!--                                Buscando Especialidade...-->
            <!--                            </button>-->
            <!--                        </li>-->
            <!--                        <li v-for="servico in returnServicos" :key="servico.id">-->
            <!--                            <button v-on:click.prevent="preencherServico(servico)">-->
            <!--                                {{servico.name}}-->
            <!--                            </button>-->
            <!--                        </li>-->
            <!--                    </ul>-->
            <!--                </div>-->
            <!--                <div class="error" v-if="$v.fornecedor.servico.$error">-->
            <!--                    * Esse campo é obrigatório-->
            <!--                </div>-->
            <!--                <input name="servico"-->
            <!--                       type="text"-->
            <!--                       id="servico"-->
            <!--                       v-model="fornecedor.servico.text" v-on:keyup="listarServicos"-->
            <!--                       :class="{invalid: $v.fornecedor.servico.$error}" autocomplete="off"/>-->
            <!--                <label for="servico">-->
            <!--                    Especialidade:-->
            <!--                </label>-->
            <!--            </div>-->

            <h3>Informações</h3>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.contato.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="contato"
                       type="text"
                       id="contato"
                       v-model="fornecedor.contato"
                       :class="{invalid: $v.fornecedor.contato.$error}"/>
                <label for="contato">
                    Contato:
                </label>
            </div>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.cargo.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="cargo"
                       type="text"
                       id="cargo"
                       v-model="fornecedor.cargo"
                       :class="{invalid: $v.fornecedor.cargo.$error}"/>
                <label for="cargo">Cargo:</label>
            </div>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.telefone1.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="telefone1"
                       type="text"
                       id="telefone1"
                       v-mask='["(##) ####-####", "(##) #####-####"]'
                       v-model="fornecedor.telefone1"
                       :class="{invalid: $v.fornecedor.telefone1.$error}"/>
                <label for="telefone1">
                    Telefone 1:
                </label>
            </div>

            <div class="form__group">
                <input name="telefone2"
                       type="text"
                       id="telefone2"
                       v-mask='["(##) ####-####", "(##) #####-####"]'
                       v-model="fornecedor.telefone2"/>
                <label for="telefone2">
                    Telefone 2:
                </label>
            </div>

            <div class="form__group">
                <input name="telefone3"
                       type="text"
                       id="telefone3"
                       v-mask='["(##) ####-####", "(##) #####-####"]'
                       v-model="fornecedor.telefone3"/>
                <label for="telefone3">
                    Telefone 3:
                </label>
            </div>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.email.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="email"
                       type="email"
                       id="email"
                       v-model="fornecedor.email"
                       :class="{invalid: $v.fornecedor.email.$error}"/>
                <label for="email">
                    E-mail:
                </label>
            </div>

            <div class="form__group">
                <input name="redes_sociais"
                       type="text"
                       id="redes_socias"
                       v-model="fornecedor.redes_sociais"/>
                <label for="redes_socias">
                    Redes Sociais:
                </label>
            </div>

            <h3>Endereço</h3>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.rua.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="rua"
                       type="text"
                       id="rua"
                       v-model="fornecedor.rua"
                       :class="{invalid: $v.fornecedor.rua.$error}"/>
                <label for="rua">
                    Rua:
                </label>
            </div>

            <div class="form__group">
                <div class="error" v-if="$v.fornecedor.bairro.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="bairro"
                       type="text"
                       id="bairro"
                       v-model="fornecedor.bairro"
                       :class="{invalid: $v.fornecedor.bairro.$error}"/>
                <label for="bairro">
                    Bairro:
                </label>
            </div>

            <div class="form__group">
                <div class="estadosPesquisa" id="estadosPesquisa">
                    <ul>
                        <li v-if="loading">
                            <button style="cursor:progress;" disabled>
                                Buscando Estados...
                            </button>
                        </li>
                        <li v-for="estado in returnEstados" :key="estado.id">
                            <button v-on:click.prevent="preencherEstado(estado)">
                                {{estado.nome}}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="error" v-if="$v.fornecedor.estado.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="estado"
                       type="text"
                       id="estado"
                       v-model="fornecedor.estado.text" v-on:keyup="listarEstados"
                       :class="{invalid: $v.fornecedor.estado.$error}" autocomplete="off"/>
                <label for="estado">Estado:</label>
            </div>

            <div class="form__group">
                <div class="form__group error" v-if="$v.fornecedor.cidade.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="cidade"
                       type="text"
                       id="cidade"
                       v-model="fornecedor.cidade"
                       :class="{invalid: $v.fornecedor.cidade.$error}"/>
                <label for="cidade">Cidade:</label>
            </div>

            <div class="form__group">
                <div class="textarea">
              <textarea name="description" id="description" v-model="fornecedor.description">
              </textarea>
                </div>
                <label for="description">
                    Observações:
                </label>
            </div>

            <button @click.prevent="verificar" id="btnCadastro">
                Pronto! Cadastrar
            </button>

        </form>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import {mask} from 'vue-the-mask';
    import fornecedores from '@/services/fornecedores.js'
    import hash from '@/services/hash.js'
    import estados from "../services/estados";
    import servicos from '@/services/servicos.js'
    import {LetterCube} from 'vue-loading-spinner';
    import Servicos from "../components/Servicos";
    import {required, minLength, between, email} from 'vuelidate/lib/validators'

    export default {
        components: {
            VueTagsInput,
            LetterCube,
            Servicos
        },
        created: function () {
            if (!this.$session.exists()) {
                this.$router.push('/')
            } else if (this.$route.params.hash) {
                hash.getHash(this.$route.params.hash).then((resposta) => {
                    if (resposta.data === 'Pagina não encontrada') {
                        this.$router.push('/404')
                    } else if (resposta.data[0].cadastrado === 0) {
                        this.mostrar = true;
                        this.hash = resposta.data[0]
                    } else if (resposta.data === 'Cadastro já realizado') {
                        this.repetida = true;
                    }
                })
            } else if (this.$session.exists()){
                this.mostrar = true;
            }
        },
        directives: {mask},
        data() {
            return {
                fornecedor: {
                    razao_social: '',
                    nome_fantasia: '',
                    cnpj: '',
                    inscricao_estadual: '',
                    inscricao_municipal: '',
                    servico: [],
                    tagsString: '',
                    contato: '',
                    cargo: '',
                    telefone1: '',
                    telefone2: '',
                    telefone3: '',
                    email: '',
                    redes_sociais: '',
                    rua: '',
                    bairro: '',
                    cidade: '',
                    estado: {
                        text: '', value: 0
                    },
                    description: ''
                },
                valor: "",
                // tags: [],
                // tag: '',
                servicos: null,
                estados: null,
                timeout: null,
                loading: false,
                mostrar: false,
                hash: null,
                repetida: false,
            }
        },

        methods: {
            mostrarServico() {
                document.getElementById('servicos').style.display = "block";
                document.getElementById('ocultarServico').style.display = "none";
                document.getElementById('ocultarServico2').style.display = "none";
            },
            mostrarServico2() {
                document.getElementById('servicos').style.display = "none";
                document.getElementById('ocultarServico').style.display = "block";
                document.getElementById('ocultarServico2').style.display = "block";
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
                    this.fornecedor.servico.push(inputOculto.value);
                    this.valor = inputOculto.value

                    idMostrarLabel.classList.remove("mostrar")
                    idMostrarLabel.classList.add('oculto')
                    idOcultoLabel.classList.remove('oculto')
                    idOcultoLabel.classList.add('mostrar')

                } else if (inputOculto.value === "" && this.valor !== 0) {
                    let index = this.fornecedor.servico.indexOf(this.valor);
                    if (index > -1) {
                        this.fornecedor.servico.splice(index, 1);
                        this.valor = ""
                    }
                    idOcultoLabel.classList.remove("mostrar")
                    idOcultoLabel.classList.add('oculto')
                    idMostrarLabel.classList.remove('oculto')
                    idMostrarLabel.classList.add('mostrar')
                }
            },

            cadastrar() {
                let btnCadastrar = document.getElementById('btnCadastro')
                btnCadastrar.innerHTML = 'Cadastrando...'
                btnCadastrar.disabled = true

                if (!this.$route.params.hash) {
                    let fornecedor = {
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
                        estado_id: this.fornecedor.estado.value,
                        description: this.fornecedor.description,
                        avalicao_preco: 0,
                        avalicao_servico: 0
                    }
                    let resposta = fornecedores.cadastrar(fornecedor).then(resposta => {
                        if (resposta.statusText === "Created") {
                            this.$router.push('/cadastro-sucesso')
                        }
                    })
                } else {
                    if (this.hash.cadastrado === 0) {
                        let fornecedor = {
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
                            estado_id: this.fornecedor.estado.value,
                            description: this.fornecedor.description,
                            avalicao_preco: 0,
                            avalicao_servico: 0
                        }
                        fornecedores.cadastrar(fornecedor).then(resposta => {
                            if (resposta.statusText === "Created") {
                                hash.atualizarHash(this.hash.id).then(resposta2 => {
                                    if (resposta2.data.id === this.hash.id) {
                                        this.$router.push('/$2y$12$fD.azHOEOBI6EMTRW92oxO30Bv8l2Ua4NzBRmtBSkWe8i/')
                                    }
                                })
                            }
                        })
                    }
                }
            },

            // listarServicos() {
            //     clearTimeout(this.timeout);
            //     var vm = this;
            //     var divServicos = document.getElementById('servicosPesquisa')
            //     this.timeout = setTimeout(function () {
            //         vm.loading = true;
            //         let res = servicos.listar(vm.fornecedor.servico.text).then(res => {
            //             vm.loading = false;
            //             vm.servicos = res.data;
            //         })
            //
            //         if (!divServicos.classList.contains('servicosPesquisa--show')) {
            //             divServicos.classList.add('servicosPesquisa--show')
            //         }
            //     }, 800)
            // },

            listarEstados() {
                clearTimeout(this.timeout);
                var vm = this;
                var divEstados = document.getElementById('estadosPesquisa')
                this.timeout = setTimeout(function () {
                    vm.loading = true;
                    let res = estados.listar(vm.fornecedor.estado.text).then(res => {
                        vm.loading = false;
                        vm.estados = res.data;
                    })

                    if (!divEstados.classList.contains('estadosPesquisa--show')) {
                        divEstados.classList.add('estadosPesquisa--show')
                    }
                }, 800)


            },

            // preencherServico(servico) {
            //     var servicoInput = document.getElementById('servico')
            //     var divServicos = document.getElementById('servicosPesquisa')
            //     this.fornecedor.servico.text = servico.name
            //     this.fornecedor.servico.value = servico.id
            //     divServicos.classList.remove('servicosPesquisa--show')
            // },

            preencherEstado(estado) {
                var servicoInput = document.getElementById('estado')
                var divEstados = document.getElementById('estadosPesquisa')
                this.fornecedor.estado.text = estado.nome
                this.fornecedor.estado.value = estado.id
                divEstados.classList.remove('estadosPesquisa--show')
            },

            verificar() {
                // this.tags.forEach((element, index, array) => {
                //     if (index != array.length - 1) {
                //         this.fornecedor.tagsString += element.text + ', '
                //     } else {
                //         this.fornecedor.tagsString += element.text
                //     }
                // })

                this.$v.fornecedor.$touch();

                if (this.$v.fornecedor.$error) return

                this.cadastrar()
            },
        },
        computed: {
            returnServicos() {
                return this.servicos
            },
            returnEstados() {
                return this.estados
            }
        },

        validations: {
            fornecedor: {
                razao_social: {required},
                nome_fantasia: {required},
                cnpj: {required, minLength: minLength(14)},
                // servico: {
                //     text: {required}, value: {required}
                // },
                contato: {required},
                cargo: {required},
                telefone1: {required},
                email: {required},
                rua: {required},
                bairro: {required},
                cidade: {required},
                estado: {
                    text: {required}, value: {required}
                },
            },
        }
    }
</script>


<style lang="scss">
    @import '../scss/variables.scss';

    .form-cadastro {
        position: relative;
        top: -35rem;
        width: 80rem;
        border-radius: .4rem;
        border-top: 1.1rem solid #6C00FF;
        z-index: 5;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: hidden;
        box-shadow: -0rem 0rem 5rem rgba(0, 0, 0, .1);

        @media(max-width: $max-xs) {
            top: -27rem;
            width: 90%;
        }

        &--hide {
            border: 0;
            background: transparent;

            .form-cadastro {
                &__help {
                    display: none;
                }
            }
        }

        &__help {
            display: flex;
            justify-content: flex-end;
            height: 4rem;
            width: 100%;
            margin-top: 2.6rem;

            img {
                height: inherit;
                width: 4rem;
                margin-right: 3rem;
            }
        }

        form {
            width: 77.3%;
            @media(max-width: $max-xs) {
                width: 90%;
            }

            .form__group {
                display: flex;
                flex-direction: column-reverse;
                margin-bottom: 3rem;


                #servicos {
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
                                background-color: #F5F5F5;
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

                        .input {
                            display: flex;

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
                            background-color: #F5F5F5;
                            border-radius: 1.6rem;
                            font-size: 1.5rem;
                            color: #35364D;
                        }

                    }
                }

                .estadosPesquisa,
                .servicosPesquisa {
                    display: none;
                    border-radius: .5rem;
                    border: 1px solid #E3E3EB;
                    width: 80%;
                    background-color: white;
                    padding: 0rem;

                    li {
                        width: 100%;
                        border-bottom: 1px solid #F5F5F5;
                        height: 5rem;

                        button {
                            display: flex;
                            justify-content: flex-start;
                            width: inherit;
                            font-size: 1.3rem;
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

            h1 {
                color: #253044;
                font-size: 3rem;
                line-height: 3.6rem;
                font-weight: 500;
                margin-top: 2.6rem;
                margin-bottom: 3.9rem;
                @media(max-width: $max-xs) {
                    font-size: 2.5rem;
                    text-align: center;
                }
            }

            label {
                font-size: 1.5rem;
                color: #35364D;
                margin-bottom: .5rem;
            }

            input {
                font-size: 1.5rem;
                border: 1px solid #E3E3EB;
                border-radius: .5rem;
                height: 2.8rem;
                padding: .5rem;
            }

            #estado,
            #servicos {
                margin-bottom: 1.1rem;
            }

            .form-cadastro-estado,
            .form-cadastro-servicos {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 4.3rem;

                span {
                    color: #CECECE;
                    font-size: 1.5rem;
                    margin-left: .75rem;
                }
            }

            h3 {
                font-size: 1.5rem;
                font-weight: bold;
                color: #35364D;
                margin-bottom: 1.4rem;
            }

            .textarea {
                border: 1px solid #E3E3EB;
                border-radius: .5rem;
                margin-bottom: 4rem;
                width: 93%;
                height: 13.3rem;
                padding: 2rem;

                textarea {
                    resize: none;
                    border: 0;
                    width: inherit;
                    height: inherit;
                    font-size: 1.5rem;
                    color: #35364D;
                }
            }

            button {
                border-radius: 10rem;
                background-color: #FF9630;
                color: white;
                font-size: 2rem;
                display: flex;
                justify-content: center;
                padding: 1.7rem .5rem;
                width: 25.5rem;
                margin-bottom: 6.4rem;
                border: 1px solid #FF9630;
                cursor: pointer;
                @media(max-width: $max-xs) {
                    margin: 0 auto;
                    margin-bottom: 7.4rem;
                }
            }

            .form__tags {
                margin-top: 2rem;
                margin-bottom: 3rem;

                .vue-tags-input {
                    margin-bottom: 1.9rem;
                    margin-top: 1.1rem;
                    width: 100%;

                    .ti-input {
                        border: 1px solid #E3E3EB;
                        width: 61.8rem;
                        border-radius: .5rem;

                        @media(max-width: $max-xs) {
                            width: 100%;
                        }

                        .ti-tag {
                            background-color: #F5F5F5;
                            border-radius: 10rem;
                            font-size: 1.5rem;
                            color: #35364D;
                            padding: 0 1rem .5rem 1rem;
                        }
                    }
                }

                .vue-tags-input.invalidTags {
                    margin-bottom: 0rem;
                    margin-top: 1.1rem;
                    width: 100%;

                    .ti-input {
                        border: 1px solid #FF514D;
                        width: 61.8rem;
                        border-radius: .5rem;
                        @media(max-width: $max-xs) {
                            width: 100%;
                        }

                        .ti-tag {
                            background-color: #F5F5F5;
                            border-radius: 10rem;
                            font-size: 1.5rem;
                            color: #35364D;
                            padding: 0 1rem .5rem 1rem;
                        }
                    }
                }
            }
        }
    }

    form::-webkit-scrollbar {
        width: 0px;
    }

    .ti-new-tag-input::placeholder {
        opacity: 0;
    }

    .invalid {
        border: 1px solid #FF514D !important;
    }

    .error {
        font-weight: 100;
        font-size: 1.2rem;
        color: #FF514D;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }

    .carregando {
        width: 77.3%;

        h1 {
            color: #253044;
            font-size: 3rem;
            line-height: 3.6rem;
            font-weight: 500;
            margin-top: 2.6rem;
            margin-bottom: 3.9rem;
            @media(max-width: $max-xs) {
                font-size: 2.5rem;
                text-align: center;
            }
        }

        h3 {
            text-align: center;
            font-weight: 100;
            margin-top: 1rem;
            font-size: 1.5rem;
            color: #35364D;
            margin-bottom: 4.5rem;
            @media(max-width: $max-xs) {
                margin-top: 2rem;
            }
        }

        .spinner {
            width: 100% !important;
            height: 10rem !important;
            @media(max-width: $max-xs) {
                height: 13rem !important;
            }

            .spinner-inner {
                transform: scale(.5) !important;
            }
        }
    }

    .div-hash-repetida {
        position: fixed;
        z-index: 20;
        top: 20rem;
        left: auto;
        overflow: hidden;
        width: 100.6rem;
        background-color: transparent;
        @media(max-width: $max-xs) {
            width: 80%;
        }

        &__content {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border-top: 1rem solid #FF514D;
            background-color: white;
            position: relative;
            box-shadow: -.3rem .7rem .7rem rgba(0, 0, 0, .2);
            margin-left: 1%;
            margin-bottom: 1%;

            img {
                margin-top: 9.1rem;
                @media(max-width: $max-xs) {
                    margin-top: 6rem;
                    width: 5rem;
                }
            }

            h2 {
                font-size: 3rem;
                color: #253044;
                font-weight: 900;
                margin-bottom: 2rem;
                margin-top: 1rem;
                @media(max-width: $max-xs) {
                    margin-top: 3rem;
                }
            }

            h3 {
                font-size: 1.8rem;
                color: #253044;
                font-weight: 400;
                margin-bottom: 9.1rem;
                @media(max-width: $max-xs) {
                    text-align: center;
                }

                strong {
                    font-weight: 700;
                }
            }
        }
    }
</style>
