class Company {
  constructor ({ id, title, address, qtd, createdAt, updatedAt, version }) {
    this.id = id
    this.titulo = title
    this.endereco = address
    this.quantidadeDeFuncionarios = qtd
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.version = version
  }

  validate () {
    if (typeof this.titulo !== 'string' && this.titulo.length === 0) {
      throw new Error('Campo titulo inválido')
    }
    if (typeof this.endereco !== 'string' && this.endereco.length === 0) {
      throw new Error('Campo endereco inválido')
    }
    if (
      typeof this.quantidadeDeFuncionarios !== 'number') {
      throw new Error('Campo quantidadeDeFuncionarios inválido')
    }
  }
}

module.exports = Company
