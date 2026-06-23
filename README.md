# 🎬 React-Native Filmes — Comunidade & Catálogo Mobile

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---

## 📌 Sobre o Projeto
O **React-Native Filmes** é um aplicativo mobile desenvolvido para proporcionar uma experiência completa de exploração cinematográfica aliada à interação entre usuários. A aplicação permite navegar por um catálogo dinâmico de filmes, visualizar detalhes das produções e participar de uma comunidade através de autenticação e comentários.

O projeto foi originalmente transcrito e desenvolvido da versão web do mesmo utilizando **React Native com Expo** e **TypeScript**, consumindo duas APIs distintas para criar um ecossistema completo.

---

## 🎯 Objetivos
* Aplicar desenvolvimento mobile moderno com React Native;
* Consumir APIs REST externas (TMDB) e internas (Render);
* Implementar autenticação e persistência de sessão;
* Trabalhar com gerenciamento de estado global;
* Desenvolver interfaces responsivas e intuitivas;
* Garantir segurança e manutenção com TypeScript;
* Colaboração em equipe utilizando Git/GitHub.

---

## 🛠️ Tecnologias e Ferramentas

<table align="center">
<tr>

<td align="center">
<h4>💻 Framework e Linguagem</h4>
<img src="https://skillicons.dev/icons?i=react,ts" /><br><br>
<strong>React Native TypeScript</strong>
</td>

<td width="40"></td>

<td align="center">
<h4>🧰 Ferramentas</h4>
<img src="https://skillicons.dev/icons?i=vscode,androidstudio,idea,eclipse" /><br><br>
<strong>VS Code, Android Studio, IntelliJ e Eclipse</strong>
</td>

</tr>
</table>

---
# 🧱 Estrutura do Projeto

```
src/
├── @types/            
├── components/            
│   ├── Header/           
│   ├── MovieGrid/    
│   ├── Post/      
│   └── Search/ 
├── contexts/ 
├── data/   
├── domains/            
│   └── entities/
├── routes/ 
├── screens/            
│   ├── About/          
│   ├── ContactUs/
│   ├── Feed/
│   ├── Home/
│   └── Login/
├── App.tsx/        
├── index.ts/           
└── README.md           
```

---


### 🔗 Integração de APIs

O aplicativo consome duas fontes de dados simultâneas:
1. **TMDB API:** Utilizada para buscar informações de filmes, cartazes, sinopses e detalhes em tempo real.
2. **API Interna (Render):** API RESTful desenvolvida para gerenciar o fluxo de autenticação (login/registro) e persistência de comentários dos usuários na comunidade.


### 🌎 API Externa — TMDB

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/movie/popular` | Lista filmes populares |
| GET | `/movie/{id}` | Detalhes do filme |
| GET | `/search/movie` | Busca personalizada |

### ☁️ API Interna — Render

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/login` | Autenticação do usuário |
| GET | `/comentarios` | Lista comentários da comunidade |
| POST | `/comentarios` | Cria um novo comentário |
| DELETE | `/comentarios/{id}` | Remove comentário |

---

## 🚀 Como Executar o Projeto em Maquina

1. **Clonar o Repositório:**
```bash
git clone https://github.com/raylaferreira-coder/React-Filmes-mobile
```


2. **Entrar na pasta:**
```bash
cd React-Filmes-mobile
```


3. **Instalar Dependências:**
```bash
npm install # ou yarn install
```


4. **Configurar Variáveis de Ambiente:**
Crie um arquivo `.env` na raiz com:
```env
EXPO_PUBLIC_TMDB_API_KEY= SUA_CHAVE_TMDB
EXPO_PUBLIC_API_URL= https://api-mobile-egw1.onrender.com
```


5. **Executar:**
```bash
npx expo start # ou npm start
```

6. **Login:**

```
email: teste@teste.com
senha: 123456
```
**Também, é possivel criar novos usuarios e senhas usando o método *Post* dentro do Postman ou similares**

```
endpoint: https://api-mobile-egw1.onrender.com/auth/register

json: 

{
    "email":"ESCOLHA_UM_NOME@DOMINIO.com",
    "senha":"ESCOLHA_UMA_SENHA"   
}
```
---

# 👥 Integrantes do Projeto

<table align="center">
<tr>
<td align="center">
<a href="https://github.com/kevinsgoncalves">
<img src="https://avatars.githubusercontent.com/kevinsgoncalves" width="100px;" alt="Kevin"/><br>
<sub><b>Kevin Gonçalves</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/patrickviniciusfs">
<img src="https://avatars.githubusercontent.com/patrickviniciusfs" width="100px;" alt="Patrick"/><br>
<sub><b>Patrick Vinícius</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/th1agOx">
<img src="https://avatars.githubusercontent.com/th1agOx" width="100px;" alt="Thiago"/><br>
<sub><b>Thiago Rocha</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/raylaferreira-coder">
<img src="https://avatars.githubusercontent.com/raylaferreira-coder" width="100px;" alt="Rayla"/><br>
<sub><b>Rayla Ferreira</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/SimoneBromer">
<img src="https://avatars.githubusercontent.com/SimoneBromer" width="100px;" alt="Simone"/><br>
<sub><b>Simone Bromer</b></sub>
</a>
</td>

</tr>
</table>

---

## 📌 Status do Projeto

✅ **Concluído:** Arquitetura mobile finalizada com sucesso.

🚀 **Integrado:** API em nuvem (Render) e TMDB funcionando em tempo real.

📱 **Mobile:** Aplicação multiplataforma testada via Expo Go.

🛠 **Manutenção:** Código modularizado seguindo padrões de *Clean Code*.
