const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Tarefas 🚀 Use /tarefas para listar as tarefas.");
});

const tarefasRouter = express.Router();

tarefasRouter.get("/", (req, res) => res.json(tarefas));
tarefasRouter.post("/", (req, res) => {
  const { nome, concluida } = req.body;
  if (!nome) return res.status(400).json({ erro: "O campo 'nome' é obrigatório" });
  const novaTarefa = { id: tarefas.length + 1, nome, concluida: concluida || false };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});
tarefasRouter.get("/:tarefaId", (req, res, next) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  res.json(tarefa);
});
tarefasRouter.put("/:tarefaId", (req, res, next) => {
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  const { nome, concluida } = req.body;
  if (nome !== undefined) tarefa.nome = nome;
  if (concluida !== undefined) tarefa.concluida = concluida;
  res.json(tarefa);
});
tarefasRouter.delete("/:tarefaId", (req, res, next) => {
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.tarefaId));
  if (index === -1) return next(new Error("Tarefa não localizada"));
  tarefas.splice(index, 1);
  res.status(204).send();
});

app.use("/tarefas", tarefasRouter);

app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));

module.exports = app;
