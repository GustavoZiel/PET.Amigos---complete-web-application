# Projeto-Desenvolvimento-Web

Este repositório é dedicado ao desenvolvimento e versionamento do projeto da disciplina de Engenharia de Software 2024 (SSC130). No diretório 'docs/', há o controle da documentação do projeto (plano de projeto, protótipos, etc); no diretório 'code/', há o código do site em desenvolvimento, que consiste em uma plataforma de adoção de animais. 

## Links úteis

- [Pasta no Drive](https://drive.google.com/drive/folders/1oEhYCcNuu0_TfsNUXb35vzY4aYvZH-lx?usp=drive_link)
- [Quadro no Trello](https://trello.com/b/Jy282Tri/projeto-desenvolvimento-web)
- [Protótipo do Site - Figma](https://www.figma.com/file/kVPAEixF5v37GqPGSb2AkW/Projeto-Site?type=design&node-id=0-1&mode=design&t=ip824XabKOCrZ9v7-0)
- [Plano de Projeto - O que devemos fazer](https://docs.google.com/document/d/1FNTAa6zle-AbHsPCnJMcvanx6jBjKAR6/edit)
- [Plano de Projeto - O que já fizemos](https://docs.google.com/document/d/1gk2ELwdB_5cwH3E8PvqyU_ZSbZPXcxQg/edit?rtpof=true)
- [Planejamento da Disciplina EngSof - versão atualizada](https://docs.google.com/spreadsheets/d/14gF6XqsYz6a20eCrm2Es33_6zG26AHoD4vR-v8Dz8GE/edit#gid=1036714948)
- [Atividades do Projeto de EngSof](https://docs.google.com/spreadsheets/d/1dRVxodQT8VO-5FTN785RePfneY-A9nYlamd3xnK9eUA/edit#gid=1975033013)

## Current POST Request body parameters for Sequelize models

### Pet

```js
{
  "name": "Burp",
  "birth": "2022-03-11",
  "city": "São Carlos",
  "state": "mg",
  "type": "cachorro",
  "breed": "poodle",
  "sex": "macho",
  "size": "small",
  "comment": "Muito querido",
  "vacinated": true,
  "adopted": false
}
```

### Ong

```js
{
    "accountName": "johnDoe123",
    "password": "superSecurePassword!",
    "ongName": "Animal Rescue Organization",
    "creationYear": "2022-01-15",
    "city": "São Paulo",
    "state": "sp",
    "address": "1234 Charity Lane",
    "CNPJ": "12.345.678/0001-90",
    "pets": "dogs, cats, birds",
    "about": "We are dedicated to rescuing animals in need and finding them loving homes.",
    "photo": "http://example.com/photo.jpg",
    "phoneNumber": "+55 11 91234-5678",
    "website": "http://www.animalrescue.org",
    "instagram": "http://instagram.com/animalrescue",
    "facebook": "http://facebook.com/animalrescue",
    "twitter": "http://twitter.com/animalrescue",
    "whatsapp": "+55 11 91234-5678" 
}
```

### Users

```js
{
    "accountName": "gustavo_gabriel",
    "password": "securepassword123",
    "userName": "Gustavo",
    "birthDate": "2004-02-12",
    "city": "Araxá",
    "state": "mg",
    "address": "123 Main St, Apt 4B",
    "preferences": "Dogs, Cats",
    "about": "Avid traveler and book lover.",
    "photo": "http://example.com/photo.jpg",
    "phoneNumber": "123-456-7890",
    "website": "http://johndoe.com",
    "instagram": "@aaaa",
    "facebook": "facebook.com/aaa",
    "twitter": "@aaa",
    "whatsapp": "123-456-7890"
}
```
