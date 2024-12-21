# api-gestao-tetemodainfantil

### **Produtos (Products)**

A **gestão de produtos** envolve ações relacionadas ao cadastro, atualização, listagem e filtragem de vestidos, com foco na estrutura de vendas no varejo e atacado. Cada produto tem informações essenciais como nome, coleção, cor, tamanho, preço, foto e quantidade em estoque.

#### 1. **Cadastro de Produtos**
   - **Objetivo**: Permitir o cadastro de novos vestidos na loja.
   - **Campos**:
     - **Name**: Nome do vestido.
     - **Collection**: Coleção à qual o vestido pertence.
     - **Color**: Cor do vestido.
     - **Size**: Tamanho do vestido (ex: P, M, G).
     - **Price**: Preço do vestido.
     - **PhotoUrl**: URL da foto do vestido.
     - **Stock**: Quantidade disponível em estoque.
   - **Método**: `POST /products`
   - **Descrição**: O sistema recebe os dados e cria um novo produto no banco de dados.

#### 2. **Listagem de Produtos**
   - **Objetivo**: Exibir todos os produtos cadastrados na loja.
   - **Método**: `GET /products`
   - **Descrição**: Retorna uma lista de todos os produtos cadastrados na loja, com todas as informações de cada vestido (nome, coleção, cor, etc.).

#### 3. **Filtragem de Produtos**
   - **Objetivo**: Permitir a filtragem de produtos por atributos como coleção, cor, tamanho, etc.
   - **Método**: `GET /products/filter`
   - **Descrição**: Permite realizar buscas com parâmetros como `collection`, `color`, `size`, etc. Exemplo de query:
     - `/products/filter?collection=Verão2024&color=Rosa`
   - **Campos**:
     - **Collection**: Filtra produtos por coleção.
     - **Color**: Filtra produtos por cor.
     - **Size**: Filtra produtos por tamanho.
     - **PriceRange**: Filtra produtos por faixa de preço.

#### 4. **Atualização de Estoque**
   - **Objetivo**: Permitir a atualização da quantidade em estoque de um vestido.
   - **Método**: `PUT /products/:id/stock`
   - **Descrição**: Atualiza a quantidade de estoque de um produto específico. O ID do produto é fornecido na URL.
   - **Campos**:
     - **Stock**: Novo valor de estoque.

#### 5. **Exclusão de Produto**
   - **Objetivo**: Permitir a remoção de um vestido do estoque.
   - **Método**: `DELETE /products/:id`
   - **Descrição**: Remove um produto do banco de dados, identificando-o pelo seu `id`.

#### 6. **Visualização Detalhada de Produto**
   - **Objetivo**: Permitir a visualização detalhada de um produto específico.
   - **Método**: `GET /products/:id`
   - **Descrição**: Retorna os detalhes completos de um vestido específico, identificando-o pelo `id`.

---

### **Vendas (Sales)**

A **gestão de vendas** envolve o registro das compras realizadas pelos clientes, seja no modelo de varejo ou atacado. Cada venda contém informações sobre os produtos comprados, o pagamento, e os dados do cliente.

#### 1. **Registro de Venda**
   - **Objetivo**: Registrar uma nova venda na loja, com os produtos comprados e dados do cliente.
   - **Campos**:
     - **BuyerName**: Nome do comprador.
     - **BuyerPhone**: Número de telefone do comprador (para envio de mensagem no WhatsApp).
     - **SaleType**: Tipo de venda (ex: varejo ou atacado).
     - **PaymentType**: Tipo de pagamento (ex: dinheiro, cartão, pix).
     - **Installments**: Número de parcelas (se for pagamento parcelado).
     - **Products**: Lista de produtos comprados, incluindo nome, preço e quantidade.
     - **TotalAmount**: Valor total da venda.
     - **SaleDate**: Data da venda.
   - **Método**: `POST /sales`
   - **Descrição**: Cria uma nova venda, incluindo a atualização do estoque (diminuindo a quantidade de produtos) e o envio de mensagem de agradecimento via WhatsApp.

#### 2. **Confirmação de Pagamento**
   - **Objetivo**: Confirmar o pagamento de uma venda.
   - **Método**: `PUT /sales/:id/confirm-payment`
   - **Descrição**: Marca o pagamento de uma venda como confirmado. Isso pode ser feito manualmente após o cliente efetuar o pagamento.
   - **Campos**:
     - **PaymentConfirmed**: Booleano para indicar se o pagamento foi confirmado.

#### 3. **Listagem de Vendas**
   - **Objetivo**: Exibir todas as vendas realizadas na loja.
   - **Método**: `GET /sales`
   - **Descrição**: Retorna uma lista de todas as vendas realizadas, com informações sobre os produtos vendidos, dados do cliente e status de pagamento.

#### 4. **Filtragem de Vendas**
   - **Objetivo**: Permitir a filtragem de vendas por parâmetros como tipo de venda, tipo de pagamento e data.
   - **Método**: `GET /sales/filter`
   - **Descrição**: Filtra as vendas por parâmetros como `saleType`, `paymentType`, `saleDate`, etc.
     - Exemplo de query:
       - `/sales/filter?saleType=varejo&paymentType=cartao`

#### 5. **Detalhes de Venda**
   - **Objetivo**: Permitir a visualização detalhada de uma venda específica.
   - **Método**: `GET /sales/:id`
   - **Descrição**: Exibe detalhes completos de uma venda, incluindo produtos comprados, informações do cliente e status do pagamento.

#### 6. **Envio de Agradecimento via WhatsApp**
   - **Objetivo**: Enviar uma mensagem personalizada de agradecimento ao cliente após a compra.
   - **Método**: Enviado automaticamente após a criação da venda.
   - **Descrição**: Envia uma mensagem de agradecimento para o cliente, com base nas informações fornecidas, como nome do comprador e total da compra.
   - **Exemplo de mensagem**:
     - `Olá João Silva, agradecemos pela sua compra de 2 vestidos no valor total de R$300.00. Esperamos que você adore suas novas peças!`

---

### Fluxo Completo de Venda e Gestão de Produtos

1. **Cadastro de Produto**:
   - O administrador cadastra novos vestidos, definindo todos os detalhes (nome, coleção, cor, preço, estoque, etc.).

2. **Realização de Venda**:
   - O cliente realiza a compra de vestidos, podendo escolher entre **varejo** ou **atacado**.
   - O sistema atualiza o estoque automaticamente, diminuindo a quantidade disponível para cada vestido comprado.

3. **Pagamento e Confirmação**:
   - O pagamento é realizado via **dinheiro**, **cartão** ou **pix**, e o administrador pode confirmar manualmente se o pagamento foi realizado com sucesso.

4. **Envio de Mensagem via WhatsApp**:
   - Após a compra, o sistema envia uma mensagem de agradecimento via WhatsApp ao cliente, utilizando a API do WhatsApp configurada.

5. **Monitoramento de Vendas**:
   - O administrador pode listar, filtrar e visualizar detalhes das vendas realizadas, acompanhar o status do pagamento e ver quais produtos estão mais vendidos.