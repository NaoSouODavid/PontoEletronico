# 📋 PontoFace — Sistema de Ponto Eletrônico com Reconhecimento Facial

## Arquivos do Projeto

| Arquivo | Descrição |
|---|---|
| `cadastro.html` | Cadastro de usuários com foto biométrica |
| `ponto.html` | Registro de ponto com autenticação facial por IA |

---

## 🗄️ Estrutura do Banco de Dados (simulada via localStorage)

### Tabela `__usuarios`
| Campo | Tipo | Descrição |
|---|---|---|
| `__id` | number | ID único gerado automaticamente |
| `nome` | string | Nome completo do colaborador |
| `foto_referencia_url` | base64/string | Foto biométrica de referência |
| `latitude_permitida` | float | Latitude do local de trabalho |
| `longitude_permitida` | float | Longitude do local de trabalho |
| `raio_permitido_metros` | int | Raio máximo permitido para bater ponto |
| `data_cadastro` | datetime | Data/hora do cadastro |

### Tabela `__registros_ponto`
| Campo | Tipo | Descrição |
|---|---|---|
| `__id` | number | ID único do registro |
| `idusuario_id` | number | FK para `__usuarios.__id` |
| `data_hora` | datetime | Data e hora do ponto |
| `latitude_batida` | float | Latitude no momento do ponto |
| `longitude_batida` | float | Longitude no momento do ponto |
| `foto_autenticacao_url` | base64/string | Foto capturada no momento |
| `distancia_calculada` | int | Distância em metros do local permitido |
| `autenticado_ia` | boolean | Resultado do reconhecimento facial |
| `ia_confianca` | int | Score de confiança da IA (0-100) |

---

## 🤖 API de Reconhecimento Facial

Utiliza **Claude claude-sonnet-4-20250514** via `POST https://api.anthropic.com/v1/messages`

### Como funciona:
1. Captura a foto atual via webcam
2. Envia foto de referência + foto atual para o modelo
3. Modelo compara características faciais
4. Retorna JSON: `{ autenticado, confianca, motivo }`

### Fluxo de autenticação:
```
Selecionar usuário
     ↓
Capturar localização GPS
     ↓
Iniciar câmera
     ↓
Bater ponto (captura frame)
     ↓
Verificar distância (Haversine)
     ↓
Chamada IA (reconhecimento facial)
     ↓
Autenticado? → Salvar registro + Mostrar tela de sucesso
Não autenticado? → Mostrar tela de erro
```

---

## 🚀 Como usar

### Pré-requisitos
- Navegador moderno (Chrome/Firefox/Edge)
- Câmera/webcam
- GPS habilitado
- Conexão à internet (para a API)

### Passo a passo:
1. Abra `cadastro.html`
2. Clique **Iniciar Câmera** → posicione o rosto → **Capturar Foto**
3. Preencha nome e obtenha a localização
4. Clique **Cadastrar Usuário**
5. Abra `ponto.html`
6. Selecione seu perfil
7. Inicie a câmera e clique **Bater Ponto**
8. Aguarde o reconhecimento facial pela IA
9. Tela de confirmação exibe nome + horário

---

## ⚙️ Para produção

Para deploy real, substitua:
- `localStorage` → banco de dados real (PostgreSQL, MySQL, etc.)
- Chamadas diretas à API → backend com chave segura
- Fotos base64 → armazenamento em nuvem (S3, GCS, etc.)
