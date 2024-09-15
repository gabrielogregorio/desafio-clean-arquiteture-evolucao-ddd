clean arquiteture é uma variação de arquitetura hexagonal(ports e adapters?).

Ambas visam a mesma coisa, trabalham da mesma forma.

mas a clean arquiteuture tem mais detalhes

ambas querem proteger o coração da aplicação

clean arquiteture é evolução de hexagonal

proteger dominios

baixo acoplamento entre camadas

clean arquiteture é orientado a caso de uso. significa intenção, em inglês é intent


Arquitetura é sobre conseguir dividir componentes

Vocẽ tem que ter limites, não existe meio andar, mas existem escadas que conectam eles.


arquitetura tem que favorecer deploy, manutenção e tudo mais e não apenas o desenvolvimento. DEVEMOS DEIXAR AS PORTAS ABERTA. SEM TOMAR DECISOES PRECIPITADAS


O objetivo principal é dar o suporte ao desenvolvimento principal do software. Minimzar o custo de vida util do projeto

mantenha opcoes abertas, evite detalhes


detalhe nao pode impactar em detalhe, um problema nop rabgit mql, nao me importa,. são detalhes que podem, ser plugados

clean arquiteture é orientado a casos de usos, são intencoes

da para entender a intenção, temos clareza do que o softweatre faz. os detalhes não devem estar aqui, postergue decisões de hbanco de dados ETC... NAO FOQUE, DEMORE PARA ESCOLHER BANCO, ETC 



USE CASE - SRP.
temos a tendencia de reaproveitar usees cases por serem muito pareceidos. A final de contas, dry, alterar inserir DEVEM ser casos de usos diferntes, NAO PODEMOS REAPROVEITAR, MESMO SENDO PARECIDO. quandfo vc alterar o código por razões diferentes.
=> Se alterar o registro, enviar email indicando que alterou
=> Se criar o registro, enviar email indicando que criou conta

a gente altera o código por MOTIVOS DIFERENTES, POR ISSO NAO PODE SER ERAPROEVITADO, TEM INTENCOES DIFERENETS PARA ALTERAR.

RESISTA A VONTADE DE REAPROVEITAR CODIGO

DUPLICACAO REAL VS ACIDENTAL....

DRY É VALIDO.

DUPLICACAO QUE NAO VALE A PENA: duplicação de validação


-------------


O USE CASE CONTAM HISTORIAS, E AUTOMATIZAM:
Primary Course: (emprestimo)
1. accept and validate name
2. validate adress, birtdate,CPF,
3. Get credit score
4. if credit is <= 500 activate denied.
5. else create customer and activate loan Estimation

Isso é um fluxo de aplicação. Na regra de negócios teremos essa svalidações. lá eu tenho os dados isolados.
aqui eu faço multiplos passos para representar uma intenção, um fluxo.

o o rquestrador do fluxo é nosso caso de uso.

USE CASE vai acessar o banco? Não, ele vai chamnar uma abstrasção, um repository por exempl

use casse é o processo de automação, é quem gera o fluxo logico

essa seria uma camada de aplicação



----------

limite arquitetural 

tudo que nao impacta diretamente na regra de negocio  deve estar em um limite arquitetural diferente. Exemplo não será o frontend ou o backend que vão impactar nas regras. A regra de negocios não vai mudar se o front for preto branco se for sql, mongo ,etc. 

Todo o componente que não impoacta na regra de negocio deve estar em um limite arquitetural diferente

as regras de nbegocios chamam uma abstração, e alguém implemneta a inteface, temos uma inversao de controle. DB não pode impactar na regra. 



----------------------


DTO - ajuda a trafegar os dados entre os limites estruturais, pego esse objeto e ajudo a enviar corretamente da web para o use case POR EXEMPLO, ele é anemico, sem comportamento, sem regras. normalmente a gente manda os DADOS DE INPUT, exemplo para o USE CASE, e as vezes para o output também. Ele só passa dados de um lado para o outro.

Muitas intençõe tem um DTO proprio, e não use o mesmo dto para criar e alterar por exemplop, cada use case normalemnte tem um dto de input e de output

EX: Controller cria um dto com os dadso recebidos e manda para o use case.... o use case cria um dto, coloca os dados de output e retorna ao dto


---------

PRESENTERS:

São objetos de transformação, recebem dados, adequa o DTO de input  no formato correto para entregar o resultaod.

 Um sistema pode entregar os dados como JSON, XML, Graphql, CLI, etc... e podemos mandar um accept-object-xml... O DTO é o cara que transforma no padrão certo.... as regras são os mesmos, mas a entrega é diferente. Quem transforma isso é o presenter.


 exemplo

input = new CategoryInputDto("name")
output = createCategoryUseCase(input) // output é um DTO retornoado pelo use case.
jsonResult = CategoryPresenter(output).toJson()
xmlResult = CategoryPresenter(output).toXml()


----------------



ENTITIES:

ENTITIES DA CLEAN ARQUITETURE <DIFERENTE>  ENTITTES DDD


ENTITIES DA CLEAN ARQUITETURE São uma camada, é um conceito de camada. Camada de negócio. camada não muda, ela não muda, tem o coração da aplicação, é solida.  
ENTITIES DO DDD é a representação de algo unico nma aplicação, fazem parte de um agregado. NA CLEAN ARQUITETURRE nem existe agregado.


use 