const express = require('express')
const router = express.Router()
const cors = require('cors')

const conectaBancoDeDados = require('./bancoDeDados.js')
conectaBancoDeDados()

const Livro = require('./livroModel.js')

const app = express()
app.use(express.json())
app.use(cors())
const porta = 3334
console.log('Servidor criado e rodando na porta', porta)

// GET
async function mostraLivros(request, response) {
  try {
    const livrosDoBancoDeDados = await Livro.find()
    response.json(livrosDoBancoDeDados)
  } catch (erro) {
    console.log(erro)
    
  }
}

// POST
async function criaLivro(request, response) {
  const novoLivro = new Livro({

    titulo: request.body.titulo,
    autor: request.body.autor,
    categoria: request.body.categoria,
  });

  try {
    const livroCriado = await novoLivro.save()
    response.status(201).json(livroCriado)
  } catch (erro) {
    console.log(erro)
  
  }
}

// PATCH
async function corrigeLivro(request, response) {
  try {
    const livroEncontrado = await Livro.findById(request.params.id);
    if (request.body.titulo) {
      livroEncontrado.titulo = request.body.titulo;
    }

    if (request.body.autor) {
      livroEncontrado.autor = request.body.autor;
    }

    if (request.body.categoria) {
      livroEncontrado.categoria = request.body.categoria;
    }

    const livroAtualizadoNoBancoDeDados = await livroEncontrado.save();
    response.json(livroAtualizadoNoBancoDeDados)
  } catch (erro) {
    console.log(erro)
    
  }
}

// DELETE
async function deletaLivro(request, response) {
  try {
    await Livro.findByIdAndDelete(request.params.id)
    response.json({ mensagem: 'Livro deletado com sucesso!' })
  } catch (erro) {
    console.log(erro)
   
  }
}

app.use(router.get('/livros', mostraLivros))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros/:id', deletaLivro))



//porta
function mostraPorta () {

}

app.listen(porta, mostraPorta) // servidor ouvindo a porta