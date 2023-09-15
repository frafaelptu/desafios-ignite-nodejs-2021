# Cadastro de carro

**RF**
[X] Deve ser possível cadastrar um novo carro.

**RN**
[X] Não deve ser possível cadastrar um carro com uma placa já existente.
[X] O carro deve estar disponível ao ser cadastrado.
[X] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
[X] Deve ser possível listar todos os carros disponíveis.
[X] Deve ser possível listar todos os carros disponíveis pelo nome do carro.
[X] Deve ser possível listar todos os carros disponíveis pela marca do carro.
[X] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.

**RN**
[X] O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
[X] Deve ser possível cadastrar uma especificação para um carro.

**RN**
[X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[X] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[X] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
[X] Deve ser possível cadastrar a imagem do carro.

**RNF**
[X] Utilizar o multer para upload dos arquivos.

**RN**
[X] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[X] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
[X] Deve ser possível cadastrar um aluguel.

**RN**
[X] O aluguel deve ter duração mínima de 24 horas.
[X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
[X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
[X] O Usuário deve estar logado na aplicação
[] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**RF**
[X] Deve ser possível realizar a devolução de um carro

**RN**
[X] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
[X] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
[X] Ao realizar a devolução, o usuário deverá ser liberado para ouro aluguel.
[X] Ao realizar a devolução, deverá ser calculado o total do aluguel.
[X] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
[X] Caso haja multa, deverá ser somado ao total do aluguel.
[X] O Usuário deve estar logado na aplicação

# Listagem de Aluguéis para usuário

**RF**
[X] Deve ser possível realizar a busca de todos os aluguéis para o usuário
**RN**
[X] O usuário deve estar logado na aplicação

# Recuperar Senha

**RF**
[] Deve ser possível o usuário recuperar a senha informando o e-mail
[] O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
[] O usuário deve conseguir inserir uma nova senha

**RN**
[] O usuário precisa informar uma nova senha
[] O link enviado para a recuperação deve expirar em 3 horas
