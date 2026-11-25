# Diagramas de caso de uso - EducaFito

Os diagramas estão em PlantUML:

- [Visitantes e estudantes](./usuarios.puml): navegação pública, estudos, quizzes, perfil e certificados.
- [Administração](./administracao.puml): gerenciamento de conteúdo e auditoria.

Abra os arquivos em uma extensão PlantUML ou renderizador compatível para visualizar os diagramas.

## Escopo e observações

- O estudante autenticado herda os casos de uso públicos do visitante.
- O acesso à administração é restrito a usuários autenticados com perfil de administrador.
- O Supabase aparece como serviço externo de autenticação e persistência de dados.
- A opção “Excluir conta” exibida no perfil atualmente encerra a sessão, mas não exclui a conta; por isso, não está representada como exclusão efetiva.
