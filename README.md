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

# Body das requisições POST

## Pet

{
  "name": "aaaa",
  "birth": "2020-12-12",
  "city": "Araraquara",
  "state": "sp",
  "type": "cachorro",
  "breed": "Pug",
  "sex": "macho",
  "size": "small",
  "photos": null,
  "comment": "Pug adorável",
  "vacinated": true,
  "adopted": false,
  "ONGAccountName": null
}

## Ong

{
  "accountName": "ong1@gmail.com",
  "password": "$2a$10$gflE2sOD0ut2Sv/YGVN3RurQ3AZtz7.cBE2SMcBmDlm2wVS.vvNJK",
  "ongName": "petamigos",
  "creationYear": "2024-06-11T03:00:00.000Z",
  "city": "pindamonhangaba",
  "state": "sp",
  "address": "lalala",
  "CNPJ": "",
  "pets": "canguru",
  "about": "uma ong bem legal",
  "photo": "foto aqui",
  "phoneNumber": "111",
  "website": "pudim.com.br",
  "instagram": "",
  "facebook": "",
  "twitter": "",
  "whatsapp": "",
  "role": "ONG"
}

## User

{
  "id": 111,
  "accountName": "teste3@gmail.com",
  "password": "$2a$10$jnIfL78kJ4LNECUDzUa1IeD4o7FSoJCbo9ZaKIinapkANPVQefZaK",
  "userName": "catarina2",
  "birthDate": "1997-06-14T03:00:00.000Z",
  "city": "araraquara",
  "state": "sp",
  "address": "trab s carlensen",
  "preferences": "sei la",
  "about": "",
  "photo": "",
  "phoneNumber": "aa",
  "website": "",
  "instagram": "",
  "facebook": "",
  "twitter": "",
  "whatsapp": "",
  "role": "USER"
}