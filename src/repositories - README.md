repositories no ddd

 é um local de armazenamento considerado seguro ou de preservação dos items armazenados nele. Quando vocÊ armazen algo em um repositorio e depois recupera, você espera que ele **esteja no mesmo estado que estava quando você colocou lá**. Em algum momento você pode oprtar por remover esse item de lá! É um local onde vamos armazenar e pegar, da mesma forma que estava quando colocamos lá...

 Quando trabalhamos com repositories, normalmente trabalhamos com agregados para persistir no banco de dados, e quando estamos trabalhando com a gregados, não estamos trabalhando com tabelas ou banco de dados OBRIGATORIAMENTE,temops um objeto e queeremos que ele seja persistido, mas um agregado não necessariamente tem apenas uma entidade, ele pode ter varias entidades e vários objetos de valor, ele não tem nada a ver  e NEM deve representar uma tabela no banco de dados. Inclusive existem outros padrões que servem melhor se você precisar de trabalhar diretamente com tabelas, como o ACCESS OBJECT ou DAO...

 Nesse contexto, não é necessariamente sobre inserir os dwados, o repositorio tem que manter o estado do agregado no mesmo estado de quando você inseriu, o agregado tem que estar consistente a todo o momento, no ddd.

 repositories são semelhantes a coleções sobre persistencia,todo o agregado persistente terá um repositório.

 De modo geral, existe uma relação 1->1 de um tipo de agregado e um repositorio....

 > É comumn a galera ter um repositŕoio para cada entidade, mas na realidade raramente teremos uma situação assim, normalmente teremos um agregado por repositório.

Podemos ter order de serviço e item, não vamos criar um unico repositorio, teremos um UNICO  REPOSITORY, exemplo, order repository e já está implicito que o item vai estar nesse repositorie, por o item estará ai dentro do agregado e conseguenemten do mesmo repository (viajei na escrita)


REpositories tentam representar coleções - agregados



=======

quem vai determinar como dados serão persistidos, quais coleçẽos vamos precisar  é o proprio dominio.

 o dominio não precisa de conhecer a implementação do repository, para não gerar acoplamento.

 queremos que o dominio tenha controle do repository, mas sem precisar conhecer os detalhes de banco etc.

 COMO FAZER ISSO????
 