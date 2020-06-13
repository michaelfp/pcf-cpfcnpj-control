# Coponente para validação de CPF e CNPJ para Dynamics 365
Componente de PowerApps Framework de CPF & CNPJ para Dynamics 365. Realiza a validação e informa se está correto ou errado o valor informado do documento.

![atl-text](https://github.com/michaelfp/pcf-cpfcnpj-control/blob/master/example/pcf-cpfcnpj-control.gif)


# Instalação

Para a instalação, basta baixar o projeto e rodar o seguinte comando na pasta deployment:

```sh 
msbuild
```
Será gerado o pacote com zip para importação. Importar no Dyanmics 365.

# Configuração

Para configurar o controle, você deverá abrir o formulário que deseja adicionar  e selecionar o campo, do tipo texto, e ir até a aba "Controle".


Localizar pelo control "Controle para informar CPF ou CNPJ". 

Configurar da seguinte forma:
* Tipo do Campo a ser utilizado: Informar o valor 'CPF' ou 'CNPJ'
* Formatacao: '1' para caso deseja obter o valor formatado e '0' para não formatar

![atl-text](https://github.com/michaelfp/pcf-cpfcnpj-control/blob/master/example/pcf-cpfcnpj-cofig.jpg)

Após isso clique em salva e depois publicar.
